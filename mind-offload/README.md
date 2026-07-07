# 📥 腦袋清空站 · Mind Offload

把《認知卸載法（Cognitive Offloading）》這套理論，變成每天能實踐的工具。

**🔗 立即使用：https://iamkeith001.github.io/mind-offload/**

單一 HTML 檔、零外部相依、離線可用、資料只存在你自己的裝置（瀏覽器 localStorage）。

> **多人使用**：每個人在自己的手機/瀏覽器打開網址即可 —— 資料各自存在自己的裝置，**互相看不到、天生私密**，不需帳號、不需登入。

---

## 核心理念與定位

> 大腦適合思考，不適合記憶。把「記住」交給系統，把「思考」留給大腦。

**這個 App 是「漏斗＋教練」，不是保險箱。**

實踐五步驟的回饋迴路：

```
全部倒出(Dump) → 一件件分流(Sort) → 存進對的清單(Organize)
→ 有日期的交給日曆提醒(Trust) → 每天5分鐘/每週30分鐘保養(Review)
```

刻意的設計取捨（為什麼是漏斗不是保險箱）：

- **主動提醒交給手機日曆**：網頁 App 推播不可靠，而「信任」的前提是有日期的事會自己跳出來。所以分流時可一鍵產生 `.ics` 日曆檔加進手機日曆，提醒由作業系統負責。
- **長期保存交給你自己的筆記工具**：localStorage 有被瀏覽器清掉的風險。清單與回顧都有「一鍵複製」，鼓勵定期把成果搬進 Notion / 備忘錄 / 紙本。
- **21 天習慣養成**：認知卸載的難點是習慣不是功能。每天收件匣歸零就點亮一格，練滿 21 天流程長在身上，工具可以畢業。

## 四大分頁

| 分頁 | 對應步驟 | 功能 |
|---|---|---|
| **📥 倒出** | Dump | 大輸入框，想到什麼打什麼，一行一件、3 秒存入收件匣。不分類、不設限。 |
| **🗂️ 整理** | Sort + Organize | 收件匣項目一件一件跳出來，四鍵分流：要做的事 / 在等別人 / 靈感筆記 / 丟掉。行動可加截止日並下載 `.ics` 進手機日曆。 |
| **✓ 清單** | Trust | 行動（有日期排前、過期變紅）、等待、靈感三區。一鍵複製全部清單貼進自己的筆記。 |
| **🔄 回顧** | Review | 21 天習慣格 + 連續天數；每週保養檢查表（收件匣歸零、催等待、清完成、搬靈感、排過期）+ 反思，一鍵複製。 |

## 怎麼用

### 電腦
直接用瀏覽器打開 `index.html` 即可。

### 開發預覽（本機伺服器）
```bash
python3 -m http.server 4178
# 然後開 http://localhost:4178/index.html
```

### 裝到 iPhone 主畫面（像 App 一樣）
1. **同網路存取**：Mac 上跑 `python3 -m http.server 4178`，iPhone 開 `http://<Mac的IP>:4178/index.html`，再從 Safari 分享選單選「加入主畫面」。
2. **靜態託管（推薦，隨處可用）**：把 `index.html` 丟到 GitHub Pages / Netlify / Cloudflare Pages，用網址開啟後「加入主畫面」。已內建 App 圖示與全螢幕設定。

## 備份與還原

- 所有資料存在使用者自己的瀏覽器，**不會上傳任何地方**。
- 清除瀏覽器資料 = 紀錄消失，請在「回顧 → 備份與還原」偶爾按**下載備份**。
- 換裝置：用**讀取備份**還原。

## 檔案結構

```
認知卸載法系統/
├── index.html          # 主程式(整個 App 就這一個檔)
├── README.md           # 本說明
├── .claude/launch.json # 本機預覽伺服器設定
└── 素材原稿/           # 理論原始文件與配圖
    ├── 提升生產力系列.docx
    └── image (16).png
```

---

*理論來源：《認知卸載法 · Cognitive Offloading》· 提升生產力系列 Day 159*
*系列入口：[提升生產力系統](https://iamkeith001.github.io/productivity-systems/)*
*同系列工具：[能量儀表板 · Energy First](https://iamkeith001.github.io/energy-first/) · [選擇迴圈 · Choice Loop](https://iamkeith001.github.io/choice-loop/) · [情境預演 · Premortem Thinking](https://iamkeith001.github.io/premortem-thinking/)*
