# 探索選擇承諾迴圈 · Explore Choose Commit

把《探索—選擇—承諾迴圈》變成可以日常使用的決策工具。

單一 HTML 檔、零外部相依、離線可用、資料只存在你自己的裝置（瀏覽器 localStorage）。

**立即使用：https://iamkeith001.github.io/choice-loop/**

---

## 核心理念

> 好的決策不是一次做對，而是在探索、選擇與承諾之間，不斷迭代。

這個工具協助你完成一個決策迴圈：

```text
探索可能方向 → 對選項做階段性選擇 → 承諾一段執行期 → 回顧結果再迭代
```

## 四大分頁

| 分頁 | 對應階段 | 功能 |
|---|---|---|
| **探索** | Explore | 收集可能方向、資訊缺口、最小測試與投入成本。 |
| **選擇** | Choose | 以目標符合、風險可控、學習價值、資源符合四項評分，找出目前最值得投入的方向。 |
| **承諾** | Commit | 設定承諾期、成功指標、暫停分心選項，並記錄執行證據。 |
| **回顧** | Iterate | 決定繼續、調整或結束，複製迴圈摘要到筆記，並備份資料。 |

## 怎麼用

### 電腦

直接用瀏覽器打開 `index.html` 即可。

### 開發預覽（本機伺服器）

```bash
python3 -m http.server 4179
# 然後開 http://localhost:4179/index.html
```

### 裝到 iPhone 主畫面（像 App 一樣）

1. Mac 上跑本機伺服器。
2. iPhone 用 Safari 開同網路網址。
3. 從分享選單選「加入主畫面」。

## 備份與還原

- 所有資料存在使用者自己的瀏覽器，不會上傳任何地方。
- 清除瀏覽器資料 = 紀錄消失，請在「回顧 → 備份與還原」偶爾按「下載備份」。
- 換裝置時，用「讀取備份」還原。

## 檔案結構

```text
探索選擇承諾迴圈系統/
├── index.html
├── README.md
├── .claude/launch.json
└── 素材原稿/
    └── 探索—選擇—承諾迴圈.md
```

---

*理論來源：《探索—選擇—承諾迴圈 · Explore–Choose–Commit Loop》*
*系列入口：[提升生產力系統](https://iamkeith001.github.io/productivity-systems/)*
*同系列工具：[能量儀表板 · Energy First](https://iamkeith001.github.io/energy-first/) · [腦袋清空站 · Mind Offload](https://iamkeith001.github.io/mind-offload/) · [情境預演 · Premortem Thinking](https://iamkeith001.github.io/premortem-thinking/)*
