# 開啟環境

- 在 vscode 打開該資料夾 在左方選單選擇"延伸模組"查詢下載 live server 右下方點擊 go live 即可開啟

# 使用套件

- [tailwind](configs/tailwindcss.js)

# 03/20 修改部分

- 調整 C.16.3-外規上傳頁-法規解析-切版用 條號下拉選單
- 調整 css/\_card.css 和 css/\_input.css
- 新增 icon illustration_lighthouse.svg
- 新增 icon assets/icons/icon_arrow_right2.svg
- 新增頁面 D.1-法規查詢模組
- 新增共用功能 條號下拉選單 composable/input/article-navigation-select.js（使用範例在 D.1 查詢區塊的"法規類型"）
- 新增共用功能 composable/input/keyword-search-input.js （使用範例在 D.1 查詢區塊的"關鍵字"打"金融"時會彈出）
- 新增共用功能 一般下拉選單組件 composable/input/select-input.js

# 03/18 修改部分

- components/dialogs/上傳內規(多加一個"上傳試拆條")
- 新增頁面 C.18-內規列表-iKnow
- 新增頁面 C.18.1-內規列表-內規內容頁-iKnow 待分案
- 新增頁面 C.18.3-內規上傳頁-試拆法規
- 新增頁面 C.16.3-外規上傳頁-法規解析-切版用
- 頁面微調 C.13-內規列表-上傳內規
- css/\_card.css .toggle-card 區塊(收合卡片) 調整
- button-status-bubble css 微調
- css/\_variables.css (Text color modifiers) 權級調整

# 03/13 修改部分

- C.11 table 串接資料渲染範例(/components/tab-table.html)
- css 略為調整(\_searchbar.css,\_table.css)
- 新增 mock 假資料(mock/內規.json)
