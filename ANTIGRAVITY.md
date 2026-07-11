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

## 🧩 工具清單（入口頁 37 張卡）

| 目錄 | 名稱 | 印章 | 分類 | accent |
|------|------|:---:|------|--------|
| `energy-first/` | 能量儀表板 energy-first | 能 | 專注與能量 | green |
| `mind-offload/` | 腦袋清空站 mind-offload | 空 | 專注與能量 | red |
| `choice-loop/` | 選擇迴圈 choice-loop | 循 | 決策與思維 | amber |
| `premortem-thinking/` | 情境預演 premortem-thinking | 預 | 決策與思維 | blue |
| `decision-journal/` | 決策日誌 | 誌 | 決策與思維 | purple |
| `action-trigger/` | 行動觸發 | 觸 | 習慣與行動 | teal |
| `mental-models/` | 心智模型 | 模 | 決策與思維 | slate |
| `cognitive-load/` | 認知負荷管理 | 荷 | 專注與能量 | rust |
| `knowledge-distill/` | 知識蒸餾法 | 萃 | 知識與學習 | indigo |
| `info-diet/` | 資訊飲食管理 | 食 | 知識與學習 | plum |
| `energy-blocking/` | 能量區塊優化 | 律 | 專注與能量 | olive |
| `two-minute/` | 兩分鐘啟動法則 | 啟 | 習慣與行動 | rose |
| `habit-stacking/` | 微習慣堆疊法 | 疊 | 習慣與行動 | coffee |
| `pre-decision/` | 預先決策法 | 策 | 決策與思維 | cerulean |
| `mvp-progress/` | 最小可行進展法 | 進 | 習慣與行動 | violet |
| `time-blocking/` | 時間分塊法 | 塊 | 專注與能量 | pumpkin |
| `decision-tree/` | 決策樹思維 | 樹 | 決策與思維 | emerald |
| `knowledge-atom/` | 知識原子化 | 原 | 知識與學習 | magenta |
| `pareto-review/` | 80/20 檢視法 | 檢 | 習慣與行動 | cobalt |
| `compound-flywheel/` | 複利行動飛輪 | 輪 | 習慣與行動 | saffron |
| `decision-fatigue/` | 決策疲勞管理 | 疲 | 決策與思維 | inkstone |
| `task-switching-cost/` | 任務切換成本 | 換 | 專注與能量 | forest |
| `flow-triggers/` | 心流觸發條件 | 流 | 專注與能量 | lagoon |
| `visual-note-taking/` | 視覺筆記法 | 圖 | 知識與學習 | sepia |
| `task-batching/` | 任務批次化 | 批 | 專注與能量 | denim |
| `mvo/` | 最小可行輸出 | 出 | 習慣與行動 | wine |
| `constraint-reframing/` | 限制條件重構 | 限 | 決策與思維 | midnight |
| `strategic-optionality/` | 高階選擇權 | 選 | 決策與思維 | verdigris |
| `identity-driven/` | 身份驅動系統 | 身 | 習慣與行動 | mauve |
| `system-boundary/` | 系統邊界意識 | 界 | 決策與思維 | aubergine |
| `life-leverage/` | 人生槓桿設計 | 槓 | 決策與思維 | iris |
| `compounding-life/` | 複利人生系統 | 複 | 習慣與行動 | copper |
| `value-recovery/` | 價值回收機制 | 收 | 知識與學習 | sage |
| `knowledge-compression/` | 知識壓縮力 | 縮 | 知識與學習 | graphite |
| `low-dependency/` | 低依賴高彈性 | 彈 | 決策與思維 | bamboo |
| `energy-matrix/` | 能量管理矩陣 | 矩 | 專注與能量 | coral |
| `learning-pyramid/` | 學習金字塔重構 | 塔 | 知識與學習 | ochre |

> 入口 `index.html` 提供：搜尋（比對中文標題／英文副標／描述）、四分類篩選（決策與思維 `decide` / 知識與學習 `knowledge` / 專注與能量 `focus` / 習慣與行動 `action`）、釘選（★，localStorage）、格狀/清單檢視切換。「全部工具＋無搜尋」時顯示分類段落標題（`.cat-head`，卡片以 CSS `order` 依分類群組、釘選永遠最前）。新增工具＝在 index.html 加一組 accent CSS 變數＋一張 `.card`（含 `data-category`、`data-id`）。

## 🛠️ 技術備忘

- 每個工具骨架一致：`$()`/`toast()`/`uid()`/`esc()` helper、`applyTheme()`、`db` + `saveAll()`、四分頁 `switchTab()`。
- **id 產生器一律用 `uid() = Date.now().toString(36) + Math.random().toString(36).slice(2,7)`**，不要用純 `Date.now()`（同毫秒連續建立會碰撞，已於 2026-07-04 全面修正）。
- **全部 36 工具皆同一 origin `iamkeith001.github.io`**（GitHub Pages project page origin 只看 host、不看路徑），localStorage 整站共享，各工具靠 key 前綴避免打架。
- **2026-07-07 合併重構**：原本 4 個工具（energy-first/mind-offload/choice-loop/premortem-thinking）是各自獨立 repo＋各自 Pages 網址，已 vendored 進本 monorepo 成 `<slug>/index.html`＋`README.md`，入口卡片與工具頁尾「同系列」連結全改**相對路徑**（`./slug/`、`../slug/`）。原 Chinese 命名資料夾（能量管理.../認知卸載法.../探索選擇.../情境預演...）仍各帶 `.git` 留在磁碟當 legacy 原始碼、被 `.gitignore` 排除（連同 `.claude/`）。要改那 4 個工具請改 monorepo 內的 `<slug>/`，別再改 Chinese 資料夾。
- **入口頁「情境導引（從這裡開始）」（2026-07-07 加，草稿版）**：hero 下方面板，回答使用者「先用哪個／怎麼串接／下一步是什麼」。JS 內 `SITUATIONS` 陣列寫死 6 條情境路徑（事情堆爆／難決定／坐不住／學了忘／被切斷／拖延），每條 2–3 步印章路徑（`href` 相對 `./id/`、seal 用工具 accent）＋結尾一句具體行動。點情境展開路徑、點印章開工具並 `recordVisit()`（共用 `prod_portal_visits`）。**情境文字與路徑組合是草稿，待 Keith 調整**。加情境＝改 `SITUATIONS` 陣列即可。
- **入口頁「回訪提醒層」（2026-07-07 加，溫柔版）**：`index.html` 自己在點卡片時記錄進場時間，不讀子工具內部 localStorage、不改任何子工具（同 origin，含那 4 個工具卡片也能記到點擊）。key：`prod_portal_visits`＝`{toolId: epochMs}`、`prod_portal_streak`＝`{last:"YYYY-MM-DD", count}`。行為：hero 下方「憶」木牌顯示進場 streak ＋沉睡工具清單（門檻 `SLEEP_DAYS=3`，只提醒「用過又冷掉」的、不嘮叨沒開過的），沉睡卡片加 `.sleep-badge` 角標；無可提醒內容時整塊 `hidden` 保持乾淨。

## 🚀 部署與驗證流程（每次新增工具）

1. 建工具 `<tool>/index.html` ＋ `<tool>/README.md`；在 `index.html` 登錄卡片與 accent 變數；更新根 `README.md`。
2. **先跑 `node --check`** 驗證 inline script 語法（2026-07-05 曾因漏跑導致決策樹整頁 JS 失效）：
   ```bash
   awk '/<script>/{f=1;next} /<\/script>/{f=0} f' <tool>/index.html > /tmp/x.js && node --check /tmp/x.js
   ```
3. 本機預覽用 node 靜態伺服器（`python3 -m http.server` 在此 iCloud 目錄會因沙盒 `PermissionError` 起不來），用瀏覽器工具端到端測（iPhone 尺寸），確認 console 零錯誤後清掉測試 localStorage。
4. 敏感字掃描 → `git add -A` → commit（`feat: ...`）→ `git push`。
5. **主動觸發 Pages 重建**（Pages 偶發卡在 building/errored）：
   ```bash
   gh api -X POST repos/iamkeith001/productivity-systems/pages/builds
   ```
   等 `status=built` 後 `curl` 驗證線上 200 ＋ 功能特徵字串。
   若卡在 `building` 超過 10 分鐘且重觸發無效，**推一個空 commit 重踢管線**（2026-07-05 實證有效）：`git commit --allow-empty -m "chore: retrigger pages build" && git push`。

## 🔗 相關位置

- 第二大腦專案區：`secondbrain/projects/提升生產力系統/`
- 每日筆記：`secondbrain/每日筆記/`（工具製作紀錄散見 2026-07-02、2026-07-04、2026-07-05）
