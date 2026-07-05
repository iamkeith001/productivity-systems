# 🛸 提升生產力系統 專案駕駛艙 (Cockpit)

> 本專案為 **「提升生產力系列」工具集入口網站**，此檔案作為專案的核心中控與 AI 助理的補充規則。
> 通用「開工 / 收工 / 初始化專案」SOP 由 `cockpit-sop` skill 定義，此處只記錄本專案特有資訊。

---

## 📦 專案概述

把「提升生產力系列」的每一套方法，做成一個獨立、離線可用的單檔網頁工具，並用一個入口網站（`index.html`）統整。

- **零後端**：每個工具都是純前端單一 `index.html`（HTML/CSS/Vanilla JS），可離線使用、可加到手機主畫面。
- **資料只存本機**：各工具用各自的 `localStorage` key 存資料，互不干擾；每個工具都提供 JSON 備份下載／還原。
- **上線**：Public repo `iamkeith001/productivity-systems`，GitHub Pages（main 根目錄）自動部署。
  - 入口：**https://iamkeith001.github.io/productivity-systems/**

## 🎨 設計語言（全系列共用）

「紙上文具」視覺系統，每個工具嚴格沿用：

- 色盤：桌面米 `#ECE9E2`／紙白 `#FBFAF6`／鋼筆墨 `#2B2823`，每個工具一個專屬 accent 色（見下表印章）。
- 字型：系統字為主，標題與數字用宋體（Songti TC / Noto Serif TC），離線友善不依賴 Google Fonts。
- 版面：方格紙 hero、印章式 SVG seal（單一漢字）、底部四分頁 tabbar、深淺色主題（`prefers-color-scheme` + 手動切換）。
- 無障礙：44px 觸控熱區、`focus-visible`、`prefers-reduced-motion`。

## 🧩 工具清單（入口頁 29 張卡）

| 目錄 | 名稱 | 印章 | 分類 | accent |
|------|------|:---:|------|--------|
| 外部 repo | 能量儀表板 energy-first | 能 | 精力與行動 | green |
| 外部 repo | 腦袋清空站 mind-offload | 空 | 精力與行動 | red |
| 外部 repo | 選擇迴圈 choice-loop | 循 | 思維與決策 | amber |
| 外部 repo | 情境預演 premortem-thinking | 預 | 思維與決策 | blue |
| `decision-journal/` | 決策日誌 | 誌 | 思維與決策 | purple |
| `action-trigger/` | 行動觸發 | 觸 | 精力與行動 | teal |
| `mental-models/` | 心智模型 | 模 | 思維與決策 | slate |
| `cognitive-load/` | 認知負荷管理 | 荷 | 精力與行動 | rust |
| `knowledge-distill/` | 知識蒸餾法 | 萃 | 思維與決策 | indigo |
| `info-diet/` | 資訊飲食管理 | 食 | 精力與行動 | plum |
| `energy-blocking/` | 能量區塊優化 | 律 | 精力與行動 | olive |
| `two-minute/` | 兩分鐘啟動法則 | 啟 | 精力與行動 | rose |
| `habit-stacking/` | 微習慣堆疊法 | 疊 | 精力與行動 | coffee |
| `pre-decision/` | 預先決策法 | 策 | 思維與決策 | cerulean |
| `mvp-progress/` | 最小可行進展法 | 進 | 精力與行動 | violet |
| `time-blocking/` | 時間分塊法 | 塊 | 精力與行動 | pumpkin |
| `decision-tree/` | 決策樹思維 | 樹 | 思維與決策 | emerald |
| `knowledge-atom/` | 知識原子化 | 原 | 思維與決策 | magenta |
| `pareto-review/` | 80/20 檢視法 | 檢 | 精力與行動 | cobalt |
| `compound-flywheel/` | 複利行動飛輪 | 輪 | 精力與行動 | saffron |
| `decision-fatigue/` | 決策疲勞管理 | 疲 | 精力與行動 | inkstone |
| `task-switching-cost/` | 任務切換成本 | 換 | 精力與行動 | forest |
| `flow-triggers/` | 心流觸發條件 | 流 | 精力與行動 | lagoon |
| `visual-note-taking/` | 視覺筆記法 | 圖 | 思維與決策 | sepia |
| `task-batching/` | 任務批次化 | 批 | 精力與行動 | denim |
| `mvo/` | 最小可行輸出 | 出 | 精力與行動 | wine |
| `constraint-reframing/` | 限制條件重構 | 限 | 思維與決策 | midnight |
| `strategic-optionality/` | 高階選擇權 | 選 | 思維與決策 | verdigris |
| `identity-driven/` | 身份驅動系統 | 身 | 精力與行動 | mauve |

> 入口 `index.html` 提供：搜尋（比對中文標題／英文副標／描述）、分類篩選（思維與決策 / 精力與行動）、釘選（★，localStorage）、格狀/清單檢視切換。新增工具＝在 index.html 加一組 accent CSS 變數＋一張 `.card`（含 `data-category`、`data-id`）。

## 🛠️ 技術備忘

- 每個工具骨架一致：`$()`/`toast()`/`uid()`/`esc()` helper、`applyTheme()`、`db` + `saveAll()`、四分頁 `switchTab()`。
- **id 產生器一律用 `uid() = Date.now().toString(36) + Math.random().toString(36).slice(2,7)`**，不要用純 `Date.now()`（同毫秒連續建立會碰撞，已於 2026-07-04 全面修正）。
- `.gitignore` 排除本機預覽設定 `.claude/` 與四個「外部獨立 repo」子資料夾（能量管理.../認知卸載法.../探索選擇.../情境預演...，各自有 git）。

## 🚀 部署與驗證流程（每次新增工具）

1. 建工具 `<tool>/index.html` ＋ `<tool>/README.md`；在 `index.html` 登錄卡片與 accent 變數；更新根 `README.md`。
2. **先跑 `node --check`** 驗證 inline script 語法（2026-07-05 曾因漏跑導致決策樹整頁 JS 失效）：
   ```bash
   awk '/<script>/{f=1;next} /<\/script>/{f=0} f' <tool>/index.html > /tmp/x.js && node --check /tmp/x.js
   ```
3. 本機預覽 `python3 -m http.server`，用瀏覽器工具端到端測（iPhone 尺寸），確認 console 零錯誤後清掉測試 localStorage。
4. 敏感字掃描 → `git add -A` → commit（`feat: ...`）→ `git push`。
5. **主動觸發 Pages 重建**（Pages 偶發卡在 building/errored）：
   ```bash
   gh api -X POST repos/iamkeith001/productivity-systems/pages/builds
   ```
   等 `status=built` 後 `curl` 驗證線上 200 ＋ 功能特徵字串。

## 🔗 相關位置

- 第二大腦專案區：`secondbrain/projects/提升生產力系統/`
- 每日筆記：`secondbrain/每日筆記/`（工具製作紀錄散見 2026-07-02、2026-07-04、2026-07-05）
