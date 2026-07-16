#!/usr/bin/env node
/**
 * 產生智慧比對用的向量索引 semantic-index.json（入口頁「試試智慧比對」功能的資料）。
 *
 * 用法：
 *   npm i @xenova/transformers@2.17.2   # 任何位置裝一次即可
 *   NODE_PATH=<node_modules所在路徑> node scripts/build-semantic-index.mjs
 *   （或直接在裝了依賴的目錄執行：node /path/to/scripts/build-semantic-index.mjs）
 *
 * 資料來源都從 index.html 解析：
 *   - 情境：SITUATIONS 的 key/label ＋ SIT_KW 同義詞表
 *   - 工具：每張 .card 的名稱、簡介、data-keywords
 * 模型：Xenova/bge-small-zh-v1.5（quantized，與前端 CDN 版本一致），輸出向量已 normalize，
 * 前端只需算內積。新增情境或工具後重跑本腳本並 commit semantic-index.json。
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

/* 動態載入 @xenova/transformers（允許從 NODE_PATH 或當前目錄解析） */
async function loadTransformers() {
  try { return await import("@xenova/transformers"); }
  catch (e) {
    const req = createRequire(path.join(process.cwd(), "noop.js"));
    return await import(req.resolve("@xenova/transformers"));
  }
}

/* --- 解析情境 --- */
const sitKwMatch = html.match(/const SIT_KW = (\{[\s\S]*?\n  \});/);
if (!sitKwMatch) { console.error("找不到 SIT_KW"); process.exit(1); }
const SIT_KW = vm.runInNewContext("(" + sitKwMatch[1] + ")");

const labels = {};
for (const m of html.matchAll(/key:'(\w+)', label:'([^']+)'/g)) labels[m[1]] = m[2];

const situations = Object.keys(SIT_KW).map(key => ({
  key,
  text: (labels[key] || key) + "。" + SIT_KW[key].join("、"),
}));
const missing = Object.keys(labels).filter(k => !SIT_KW[k]);
if (missing.length) console.warn("⚠️ 這些情境沒有 SIT_KW（不會進索引）：" + missing.join(", "));

/* --- 解析工具卡 --- */
const tools = [];
const cardRe = /<a class="card"[^>]*data-id="([^"]+)"[^>]*data-keywords="([^"]*)"[^>]*>[\s\S]*?<h2>([^<]+)<\/h2>[\s\S]*?<p>([^<]+)<\/p>/g;
for (const m of html.matchAll(cardRe)) {
  tools.push({ id: m[1], text: m[3].trim() + "。" + m[4].trim() + " " + m[2] });
}
console.log(`情境 ${situations.length} 個、工具 ${tools.length} 個`);
if (tools.length < 40) { console.error("工具解析數量異常，請檢查卡片格式"); process.exit(1); }

/* --- 嵌入 --- */
const { pipeline, env } = await loadTransformers();
env.allowLocalModels = false;
console.log("載入模型 Xenova/bge-small-zh-v1.5（首次會下載約 25MB）…");
const embed = await pipeline("feature-extraction", "Xenova/bge-small-zh-v1.5", { quantized: true });

async function vec(text) {
  const out = await embed(text, { pooling: "mean", normalize: true });
  return Array.from(out.data).map(x => +x.toFixed(4));
}

for (const s of situations) { s.v = await vec(s.text); delete s.text; }
for (const t of tools) { t.v = await vec(t.text); delete t.text; }

/* 門檻（2026-07 用 10 句實測校準）：
 * 情境 ≥ sit 直接點亮；或 ≥ sitLow 且領先第二名 gap 以上（雜訊底噪約 0.42~0.48，正確命中約 0.54+，
 * 但也有 0.545 的錯誤命中——差別在錯誤命中與第二名幾乎同分，故用邊際規則區分）。
 * 工具推薦 ≥ tool（0.42 會把「今天天氣很好」配到能量工具，提到 0.50 才乾淨）。 */
const index = {
  model: "Xenova/bge-small-zh-v1.5",
  dim: situations[0].v.length,
  built: new Date().toISOString().slice(0, 10),
  th: { sit: 0.55, sitLow: 0.50, gap: 0.04, tool: 0.50 },
  situations,
  tools,
};
const out = path.join(ROOT, "semantic-index.json");
fs.writeFileSync(out, JSON.stringify(index));
console.log(`已寫入 ${out}（${(fs.statSync(out).size / 1024).toFixed(0)} KB, dim=${index.dim}）`);
