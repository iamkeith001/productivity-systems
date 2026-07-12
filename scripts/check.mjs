#!/usr/bin/env node
/**
 * 全站一致性檢查：node scripts/check.mjs
 * 部署前必跑（取代 ANTIGRAVITY.md 裡的手動 awk + node --check 清單）。
 * 檢項：
 *   1. 每個工具與入口頁的 inline JS 語法（vm.Script 解析，不執行）
 *   2. 工具必備 pattern：備份功能、safe-area、apple-mobile-web-app、uid 安全格式
 *   3. localStorage key 唯一性
 *   4. 入口頁備份清單（BK_EXACT / BK_PREFIX）覆蓋所有工具 key
 *   5. 入口卡片 ↔ 工具目錄雙向對應、accent 變數 light/dark 皆定義、data-keywords 齊全
 *   6. ANTIGRAVITY.md 與 README.md 收錄每個 slug
 *   7. 敏感字掃描
 *   8. sw.js precache 覆蓋入口＋所有工具（檔案存在時才查）
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
let failures = 0;
const fail = msg => { failures++; console.log("  ❌ " + msg); };
const ok = msg => console.log("  ✅ " + msg);

const toolDirs = fs.readdirSync(ROOT)
  .filter(d => /^[a-z0-9-]+$/.test(d) && d !== "scripts" && fs.existsSync(path.join(ROOT, d, "index.html")))
  .sort();
const read = p => fs.readFileSync(path.join(ROOT, p), "utf8");
const scriptsOf = html => [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);

console.log("工具目錄 " + toolDirs.length + " 個\n");

/* 1+2. 各工具語法與必備 pattern */
console.log("[1/8] 工具 inline JS 語法與必備 pattern");
const toolKeys = {};   // dir -> {exact:[...], prefix:null|"xx_"}
let synOK = 0, patOK = 0;
for (const d of toolDirs) {
  const html = read(d + "/index.html");
  const codes = scriptsOf(html);
  if (!codes.length) { fail(d + "：找不到 inline <script>"); continue; }
  let bad = false;
  for (const code of codes) {
    try { new vm.Script(code, { filename: d + "/index.html" }); }
    catch (e) { fail(d + "：JS 語法錯誤 — " + e.message); bad = true; }
  }
  if (!bad) synOK++;

  const missing = [];
  if (!/exportBtn|下載備份/.test(html)) missing.push("備份功能");
  if (!/safe-area-inset/.test(html)) missing.push("safe-area");
  if (!/apple-mobile-web-app/.test(html)) missing.push("apple-mobile-web-app meta");
  if (/\buid\s*=/.test(html) && !/Date\.now\(\)\.toString\(36\)/.test(html)) missing.push("uid 未用防碰撞格式");
  if (missing.length) fail(d + "：缺 " + missing.join("、")); else patOK++;

  const exact = [];
  let m;
  const reStore = /(?:STORE|storeKey|themeKey)\s*=\s*["']([^"']+)["']/g;
  while ((m = reStore.exec(html))) exact.push(m[1]);
  const pm = html.match(/localStorage\.[gs]etItem\(\s*["']([a-z]{2,4}_)["']\s*\+/);
  toolKeys[d] = { exact: [...new Set(exact)], prefix: pm ? pm[1] : null };
  if (!toolKeys[d].exact.length && !toolKeys[d].prefix) fail(d + "：抓不到 localStorage key（新模式？請更新 check.mjs 與備份清單）");
}
if (synOK === toolDirs.length) ok("全部 " + synOK + " 個工具 JS 語法通過");
if (patOK === toolDirs.length) ok("全部工具必備 pattern 齊全");

/* 3. key 唯一性 */
console.log("[2/8] localStorage key 唯一性");
{
  const seen = new Map();
  let dup = false;
  for (const [d, k] of Object.entries(toolKeys)) {
    for (const key of [...k.exact.filter(x => x !== "theme"), ...(k.prefix ? [k.prefix] : [])]) {
      if (seen.has(key)) { fail("key 重複：" + key + "（" + seen.get(key) + " 與 " + d + "）"); dup = true; }
      seen.set(key, d);
    }
  }
  if (!dup) ok("各工具 key 互不衝突");
}

/* 入口頁解析 */
const portal = read("index.html");
console.log("[3/8] 入口頁 inline JS 語法");
{
  let bad = false;
  for (const code of scriptsOf(portal)) {
    try { new vm.Script(code, { filename: "index.html" }); }
    catch (e) { fail("入口頁 JS 語法錯誤 — " + e.message); bad = true; }
  }
  if (!bad) ok("入口頁 JS 語法通過");
}

/* 4. 備份清單覆蓋 */
console.log("[4/8] 全站備份清單覆蓋");
{
  const exArr = portal.match(/BK_EXACT\s*=\s*\[([\s\S]*?)\]/);
  const pxArr = portal.match(/BK_PREFIX\s*=\s*\[([\s\S]*?)\]/);
  if (!exArr || !pxArr) fail("入口頁找不到 BK_EXACT / BK_PREFIX");
  else {
    const bkExact = new Set([...exArr[1].matchAll(/"([^"]+)"/g)].map(m => m[1]));
    const bkPrefix = [...pxArr[1].matchAll(/"([^"]+)"/g)].map(m => m[1]);
    let miss = false;
    for (const [d, k] of Object.entries(toolKeys)) {
      for (const key of k.exact) if (!bkExact.has(key)) { fail("備份清單漏了 " + d + " 的 key：" + key); miss = true; }
      if (k.prefix && !bkPrefix.includes(k.prefix)) { fail("備份清單漏了 " + d + " 的前綴：" + k.prefix); miss = true; }
    }
    if (!miss) ok("備份清單覆蓋全部工具 key");
  }
}

/* 5. 卡片對應 / accent / keywords */
console.log("[5/8] 入口卡片對應與 accent 變數");
{
  const cardIds = [...portal.matchAll(/data-id="([a-z0-9-]+)"/g)].map(m => m[1]);
  let bad = false;
  for (const d of toolDirs) if (!cardIds.includes(d)) { fail("工具 " + d + " 沒有入口卡片"); bad = true; }
  for (const id of cardIds) if (!toolDirs.includes(id)) { fail("卡片 " + id + " 沒有對應目錄"); bad = true; }
  if (!bad) ok("卡片與目錄雙向對應（" + cardIds.length + " 張）");

  bad = false;
  for (const m of portal.matchAll(/--c:var\(--([a-z0-9-]+)\)/g)) {
    const v = m[1];
    const defs = [...portal.matchAll(new RegExp("--" + v + "\\s*:", "g"))].length;
    if (defs < 2) { fail("accent --" + v + " 未在 light+dark 兩處定義（找到 " + defs + " 處）"); bad = true; }
  }
  if (!bad) ok("accent 變數 light/dark 皆定義");

  const noKw = cardIds.filter(id => !new RegExp('data-id="' + id + '" data-keywords="').test(portal));
  if (noKw.length) fail("卡片缺 data-keywords：" + noKw.join("、"));
  else ok("全部卡片有 data-keywords");
}

/* 6. 文件收錄 */
console.log("[6/8] ANTIGRAVITY.md / README.md 收錄");
{
  const ag = read("ANTIGRAVITY.md"), rm = read("README.md");
  const missAg = toolDirs.filter(d => !ag.includes(d + "/"));
  const missRm = toolDirs.filter(d => !rm.includes("/" + d + "/") && !rm.includes(d + "/"));
  if (missAg.length) fail("ANTIGRAVITY.md 漏收：" + missAg.join("、")); else ok("ANTIGRAVITY.md 收錄齊全");
  if (missRm.length) fail("README.md 漏收：" + missRm.join("、")); else ok("README.md 收錄齊全");
}

/* 7. 敏感字 */
console.log("[7/8] 敏感字掃描");
{
  const re = /\b(api[_-]?key|apikey|client[_-]?secret|password|access[_-]?token)\b/i;
  const hits = [];
  for (const f of ["index.html", ...toolDirs.map(d => d + "/index.html")]) {
    if (re.test(read(f))) hits.push(f);
  }
  if (hits.length) fail("疑似敏感字：" + hits.join("、")); else ok("無敏感字樣");
}

/* 8. sw.js precache */
console.log("[8/8] Service Worker precache 覆蓋");
if (fs.existsSync(path.join(ROOT, "sw.js"))) {
  const sw = read("sw.js");
  const missSw = toolDirs.filter(d => !sw.includes('"./' + d + '/"'));
  if (missSw.length) fail("sw.js precache 漏了：" + missSw.join("、"));
  else if (!sw.includes('"./"')) fail("sw.js precache 缺入口頁 './'");
  else ok("sw.js precache 覆蓋入口＋全部工具");
} else {
  console.log("  （尚無 sw.js，略過）");
}

console.log("\n" + (failures ? "❌ 共 " + failures + " 項未通過" : "✅ 全部通過"));
process.exit(failures ? 1 : 0);
