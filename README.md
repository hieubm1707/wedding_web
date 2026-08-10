# Wedding Invitation Website

Website thiệp cưới cho **Minh Hiếu & Thảo Tiên**, build bằng React 18 + TypeScript + Vite 6 + Tailwind CSS v4, deploy trên Vercel.

Thiết kế gốc: [Figma – Wedding Invitation Website Design](https://www.figma.com/design/YV6CKydtCn8CgBJrW5OsAB/Wedding-Invitation-Website-Design)

---

## 1. Yêu cầu môi trường

| Thành phần | Phiên bản khuyến nghị |
| --- | --- |
| Node.js | >= 20 (Vite 6 yêu cầu Node 18+, Vercel mặc định Node 22) |
| npm | >= 10 |

---

## 2. Chạy ở môi trường dev

```bash
# 1. Cài dependencies
npm install

# 2. Tạo file biến môi trường cho máy local
cp .env.example .env.local   # rồi điền giá trị thật (xem mục 4)

# 3. Chạy dev server (Vite, mặc định http://localhost:5173)
npm run dev
```

Một số lưu ý:

- `vite.config.ts` bật `server.allowedHosts: true`, nên có thể expose dev server qua ngrok/cloudflared để test trên điện thoại.
- Alias `@/` trỏ tới `src/`.
- Dev server **không** chạy `middleware.ts` (đây là Vercel Edge Middleware, chỉ hoạt động khi deploy hoặc khi chạy `vercel dev`).

### Routes

| Route | Nội dung |
| --- | --- |
| `/` | Trang thiệp cưới chính |
| `/invite?to=<Tên khách>` | Trang thiệp cá nhân hoá theo tên khách mời |

### Test Edge Middleware ở local

Middleware inject thẻ OG/`<title>` theo tên khách khi share link `/invite?to=...`. Muốn kiểm tra ở local:

```bash
npm i -g vercel
vercel dev        # chạy đúng runtime của Vercel, có middleware
```

---

## 3. Build production

```bash
npm run build              # output vào thư mục dist/
npx vite preview           # xem thử bản build tại http://localhost:4173
```

- `npm run build` chạy `vite build`, không có bước type-check riêng.
- **Quan trọng**: Vite nhúng (inline) giá trị `import.meta.env.VITE_*` **vào bundle tại thời điểm build**. Đổi biến môi trường thì phải build lại / redeploy, không thể đổi runtime.
- Vì vậy: **không đặt secret trong biến `VITE_*`** — mọi giá trị đó đều public trong file JS gửi xuống trình duyệt. Các URL Google Apps Script ở đây được thiết kế là public endpoint.

Scripts hiện có trong `package.json`: chỉ `dev` và `build`. Các lệnh khác dùng qua `npx` (`npx vite preview`, `npx tsc --noEmit`).

---

## 4. Biến môi trường

### 4.1 Danh sách biến

Tất cả biến dùng ở client **bắt buộc có tiền tố `VITE_`** thì Vite mới expose ra `import.meta.env`.

| Biến | Bắt buộc | Mặc định | Mô tả | Dùng tại |
| --- | --- | --- | --- | --- |
| `VITE_ENABLE_GOOGLE_SHEET` | Không | `false` | `"true"` → dùng Google Sheet làm backend lời chúc; khác `"true"` → gọi REST API ở `VITE_API_BASE_URL` | `src/app/services/apiWrapper.ts` |
| `VITE_API_BASE_URL` | Khi không dùng Sheet | `https://api.wedding.com` | Base URL của REST API (code sẽ gọi `<base>/api`) | `src/app/services/wishApi.ts` |
| `VITE_GOOGLE_SHEET_SCRIPT_URL` | Khi dùng Sheet | `""` | URL Web App của Google Apps Script (đọc/ghi lời chúc) | `src/app/services/googleSheetApi.ts` |
| `VITE_GOOGLE_SHEET_LOG_URL` | Không | fallback về `VITE_GOOGLE_SHEET_SCRIPT_URL` | Apps Script riêng để log lượt mở thiệp `/invite` | `src/app/services/googleSheetApi.ts` |

> So sánh chuỗi là **strict**: `VITE_ENABLE_GOOGLE_SHEET` phải đúng chữ `true` (viết thường), `TRUE`/`1` sẽ không bật.

### 4.2 File `.env` và thứ tự ưu tiên

Vite load env theo thứ tự (file sau ghi đè file trước):

```
.env                    # dùng chung mọi mode — đã gitignore trong repo này
.env.local              # ghi đè riêng cho máy local — gitignore
.env.production         # chỉ áp dụng khi build production
.env.production.local   # ghi đè production trên máy local — gitignore
```

Trong repo này `.gitignore` đã loại trừ cả `.env` lẫn `.env.local`, nên **không có giá trị thật nào bị commit**. Khi setup máy mới, tự tạo file từ template dưới đây.

### 4.3 Template `.env.example`

```dotenv
# Backend REST API (chỉ dùng khi VITE_ENABLE_GOOGLE_SHEET != "true")
VITE_API_BASE_URL=https://api.example.com

# Google Sheets integration
VITE_ENABLE_GOOGLE_SHEET=true
VITE_GOOGLE_SHEET_SCRIPT_URL=https://script.google.com/macros/s/XXXXXXXX/exec

# Tuỳ chọn: Apps Script riêng để log lượt mở thiệp.
# Bỏ trống thì fallback về VITE_GOOGLE_SHEET_SCRIPT_URL.
VITE_GOOGLE_SHEET_LOG_URL=https://script.google.com/macros/s/YYYYYYYY/exec
```

### 4.4 Ghi đè nhanh khi chạy lệnh

```bash
# Tắt Google Sheet cho một lần chạy dev
VITE_ENABLE_GOOGLE_SHEET=false npm run dev

# Build với endpoint staging
VITE_GOOGLE_SHEET_SCRIPT_URL=https://script.google.com/macros/s/STAGING/exec npm run build
```

### 4.5 Thêm biến mới

1. Đặt tên có tiền tố `VITE_`.
2. Thêm vào `.env.local` (dev) và vào Vercel Environment Variables (deploy).
3. Đọc qua `import.meta.env.VITE_TEN_BIEN` — luôn có fallback vì giá trị có thể `undefined`.
4. Cập nhật bảng ở mục 4.1 và template ở 4.3.

---

## 5. Backend Google Sheets (tuỳ chọn)

Code Apps Script nằm trong `scripts/google-apps-script/`:

- `Config.gs` — điền `SPREADSHEET_ID`, `SHEET_NAME`, timezone, mapping cột.
- `Code.gs` — `doGet` (đọc lời chúc) / `doPost` (ghi lời chúc, log lượt mở).

Các bước:

1. Tạo Google Sheet, copy `SPREADSHEET_ID` từ URL.
2. Mở **Extensions → Apps Script**, dán nội dung 2 file `.gs`, điền `SPREADSHEET_ID` trong `Config.gs`.
3. Chạy hàm `setupSheet()` một lần để tạo header row.
4. **Deploy → New deployment → Web app**: Execute as *Me*, Who has access: **Anyone**.
5. Copy URL `/exec` → gán vào `VITE_GOOGLE_SHEET_SCRIPT_URL`.
6. Set `VITE_ENABLE_GOOGLE_SHEET=true`.

Mỗi lần sửa code `.gs` phải **Deploy lại** (tạo version mới) thì URL `/exec` mới nhận thay đổi.

---

## 6. Deploy lên Vercel

### 6.1 Cấu hình project

Vercel tự nhận diện Vite. Nếu cần khai báo tay:

| Setting | Giá trị |
| --- | --- |
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Node.js Version | 20.x hoặc 22.x |

`vercel.json` đã có sẵn SPA rewrite để mọi route (`/invite`, …) đều trả về `index.html`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### 6.2 Edge Middleware

`middleware.ts` ở root chạy trên Vercel Edge, `matcher: "/invite"`. Nhiệm vụ: fetch `index.html` rồi thay thẻ `<title>`, `og:title`, `og:url`, `twitter:*` theo query `?to=<tên khách>`, để khi share link qua Zalo/Messenger/Facebook thì preview hiện đúng tên người được mời.

`SITE_ORIGIN` đang **hard-code** trong `middleware.ts`:

```ts
const SITE_ORIGIN = "https://wedding.hieutien.life";
```

Đổi domain thì sửa hằng số này (hoặc chuyển sang đọc từ `process.env.SITE_ORIGIN` — middleware chạy server-side nên **không** cần tiền tố `VITE_`).

### 6.3 Khai báo biến môi trường trên Vercel

**Qua Dashboard**: Project → **Settings → Environment Variables** → thêm từng biến, chọn scope `Production` / `Preview` / `Development`.

**Qua CLI**:

```bash
vercel login
vercel link                                        # gắn thư mục với project trên Vercel

vercel env add VITE_ENABLE_GOOGLE_SHEET production
vercel env add VITE_GOOGLE_SHEET_SCRIPT_URL production
vercel env add VITE_GOOGLE_SHEET_LOG_URL production
vercel env add VITE_API_BASE_URL production

vercel env ls                                      # xem danh sách biến
vercel env pull .env.local                         # kéo biến từ Vercel về máy local
```

Lưu ý:

- Biến `VITE_*` được inline lúc build → sau khi thêm/sửa biến phải **Redeploy** (và **bỏ chọn** "Use existing Build Cache") thì mới có hiệu lực.
- Scope `Preview` áp dụng cho mọi branch deploy; scope `Development` chỉ dùng cho `vercel dev` / `vercel env pull`.

### 6.4 Deploy

```bash
vercel          # deploy preview (URL tạm)
vercel --prod   # deploy production
```

Hoặc push lên GitHub — Vercel tự build: push vào `main` → Production, push branch khác / mở PR → Preview deployment.

### 6.5 Checklist sau khi deploy

- [ ] Trang `/` load, ảnh và font `Mussica Swash` (trong `public/fonts/`) hiển thị đúng.
- [ ] `/invite?to=Nguyễn%20Văn%20A` hiện đúng tên khách.
- [ ] Share link `/invite?to=...` lên Zalo/Messenger → preview có tên khách (middleware hoạt động).
- [ ] Form RSVP gửi được lời chúc và ghi xuống Google Sheet.
- [ ] F5 trực tiếp tại `/invite` không ra 404 (SPA rewrite hoạt động).

---

## 7. Cấu trúc thư mục

```
├── index.html                    # HTML entry, chứa các thẻ meta OG mà middleware sẽ ghi đè
├── middleware.ts                 # Vercel Edge Middleware cho /invite
├── vercel.json                   # SPA rewrite
├── vite.config.ts                # Plugin React + Tailwind, alias @/
├── public/                       # Ảnh, fonts, nhạc (copy nguyên trạng vào dist/)
├── scripts/google-apps-script/   # Backend Google Sheets (Code.gs, Config.gs)
├── guidelines/Guidelines.md      # Style guide — đọc trước khi thêm component
└── src/
    ├── main.tsx                  # BrowserRouter + render App
    ├── app/
    │   ├── App.tsx               # Routes + layout trang
    │   ├── components/           # Các section của trang cưới
    │   ├── contexts/AppContext.tsx  # Theme (5 palette) + i18n (EN/VI)
    │   ├── pages/InvitePage.tsx
    │   └── services/             # apiWrapper / wishApi / googleSheetApi
    └── styles/                   # theme.css, fonts.css, index.css
```

Chi tiết kiến trúc, quy ước theming/i18n: xem `CLAUDE.md` và `guidelines/Guidelines.md`.

---

## 8. Troubleshooting

| Triệu chứng | Nguyên nhân thường gặp |
| --- | --- |
| Console log `VITE_GOOGLE_SHEET_SCRIPT_URL is not set` | Thiếu biến, hoặc quên redeploy sau khi thêm biến trên Vercel |
| Lời chúc không lưu | Apps Script chưa deploy quyền "Anyone", hoặc chưa deploy version mới sau khi sửa `.gs` |
| Preview link không hiện tên khách | Middleware không chạy — kiểm tra `middleware.ts` ở **root** repo và `matcher` khớp path |
| `/invite` bị 404 khi F5 | Thiếu rewrite trong `vercel.json` |
| Sửa `.env` mà không thấy thay đổi | Vite chỉ đọc env lúc khởi động — restart `npm run dev`; trên Vercel phải redeploy không dùng build cache |
| Biến trả về `undefined` | Thiếu tiền tố `VITE_`, hoặc sai chính tả tên biến |
