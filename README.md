# feiting2024 前端(Next.js)

## 目前進度

已完成:專案地基(設定檔)、API 串接層(`lib/api.ts`)、登入功能(`app/login`)
尚未完成:Dashboard、訂單管理、商品管理等頁面(後續會陸續補上)

## 部署方式(全程網頁操作,不需要本機安裝 Node.js)

### 第一次部署

1. 到 [github.com](https://github.com) 新增一個 repository(可以設定為 Private)
2. 進入這個新 repo,點「Add file」→「Upload files」,把這個資料夾**裡面的所有檔案和資料夾**拖進去上傳(注意是上傳資料夾內的內容,不是整個資料夾本身)
3. 到 [vercel.com](https://vercel.com) 用 GitHub 帳號登入
4. 點「Add New」→「Project」,選剛才建立的 repo,點「Import」
5. 在「Environment Variables」那一步,新增一筆:
   - Name:`NEXT_PUBLIC_API_URL`
   - Value:您的 Apps Script `/exec` 網址
6. 點「Deploy」,等待建置完成(通常 1-2 分鐘),就會拿到一個 `.vercel.app` 的網址

### 之後每次更新程式碼

1. 回到 GitHub 該 repo,把有異動的檔案用「Upload files」重新上傳覆蓋(GitHub 網頁版會提示「這個檔案已存在,要取代嗎」)
2. Vercel 偵測到 GitHub 有新的 commit,會**自動重新建置部署**,不用手動做任何事,通常 1-2 分鐘後新版本就上線

## 專案結構

```
app/
├── layout.tsx          根版面配置(套用 AuthProvider)
├── page.tsx            首頁(依登入狀態自動導向)
├── globals.css          全域樣式(Tailwind)
└── login/page.tsx        登入頁
lib/
├── api.ts               API 串接層,所有呼叫 Apps Script 的函式都在這裡
├── auth-context.tsx      登入狀態管理(React Context)
└── cookies.ts             Cookie 存取工具
types/
└── index.ts              TypeScript 型別定義(對應 Apps Script 的 FIELD_MAP)
```
