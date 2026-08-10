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

### 6.5 Trỏ domain Hostinger về Vercel

Làm **sau khi** đã deploy thành công và site chạy được trên URL `*.vercel.app`.

#### Bước 1 — Khai báo domain trên Vercel

Vercel Dashboard → chọn project → **Settings → Domains → Add Domain** → nhập domain (ví dụ `wedding.hieutien.life`).

Hoặc bằng CLI:

```bash
vercel domains add wedding.hieutien.life
vercel domains inspect wedding.hieutien.life   # xem record cần khai + trạng thái
```

Sau khi thêm, Vercel hiển thị **chính xác record DNS cần tạo**. ⚠️ **Luôn dùng giá trị Vercel hiển thị trên màn hình đó**, đừng copy cứng từ tài liệu cũ — Vercel đã đổi IP đích vài lần và giá trị có thể khác nhau tuỳ project/region. Các giá trị phổ biến để đối chiếu:

| Loại domain | Type | Name | Points to |
| --- | --- | --- | --- |
| Subdomain (`wedding.hieutien.life`) | `CNAME` | `wedding` | `cname.vercel-dns.com` |
| Apex / root (`hieutien.life`) | `A` | `@` | `76.76.21.21` |
| `www` | `CNAME` | `www` | `cname.vercel-dns.com` |

> Apex domain **không dùng được CNAME** (giới hạn của chuẩn DNS) — bắt buộc là record `A`.

#### Bước 2 — Tạo record trong Hostinger hPanel

hPanel → **Domains** → chọn domain → **DNS / Nameservers** → tab **DNS Records** (đường tắt: hPanel → *Advanced* → *DNS Zone Editor*).

1. **Xoá / sửa record cũ trùng tên trước.** Hostinger tạo sẵn record `A` cho `@` và `www` trỏ về hosting của họ. Nếu để nguyên, DNS sẽ xung đột và domain vẫn về trang cũ của Hostinger.
2. **Add record** với giá trị Vercel đã cho ở Bước 1:
   - **Type**: `CNAME` (subdomain) hoặc `A` (apex)
   - **Name**: chỉ phần subdomain, **không gõ full domain** — ví dụ `wedding`, không phải `wedding.hieutien.life`. Apex thì dùng `@`.
   - **Points to / Content**: giá trị Vercel hiển thị
   - **TTL**: để `300` (5 phút) trong lúc setup cho nhanh, xong rồi tăng lại `3600`
3. Lưu lại.

#### Cách khác — chuyển hẳn nameserver sang Vercel

Nếu muốn Vercel quản lý toàn bộ DNS: hPanel → **Domains → Nameservers → Change nameservers → Use custom nameservers**, điền:

```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

⚠️ Đổi nameserver là **giao toàn quyền DNS cho Vercel**: mọi record khác đang có ở Hostinger (đặc biệt là **MX cho email**, `TXT` cho SPF/DKIM, subdomain khác) sẽ ngừng hoạt động cho tới khi bạn khai lại thủ công bên Vercel. Nếu đang dùng email theo tên miền, hãy **chụp lại toàn bộ DNS zone của Hostinger trước** rồi mới đổi. Với dự án này chỉ cần một subdomain nên **cách thêm record ở Bước 2 an toàn hơn** — khuyến nghị dùng cách đó.

#### Bước 3 — Kiểm tra

```bash
dig +short wedding.hieutien.life            # phải ra đích của Vercel
dig +short wedding.hieutien.life CNAME
nslookup wedding.hieutien.life 8.8.8.8      # kiểm tra qua DNS công cộng
```

- Trên Vercel: **Settings → Domains** phải chuyển sang **Valid Configuration** (có dấu tích xanh).
- Vercel tự cấp SSL (Let's Encrypt) sau khi DNS đúng — thường vài phút, có thể tới ~30 phút.
- DNS propagate thường 5–30 phút, chậm nhất có thể tới 24–48h nếu TTL cũ để cao (Hostinger mặc định 14400s = 4 tiếng). Muốn nhanh: **hạ TTL của record cũ xuống 300 và chờ hết TTL cũ trước khi đổi**.

#### Bước 4 — Cập nhật `SITE_ORIGIN` (bắt buộc với repo này)

Domain mới sẽ **không** tự động phản ánh vào thẻ OG. Sửa `middleware.ts`:

```ts
const SITE_ORIGIN = "https://domain-moi-cua-ban";
```

rồi **redeploy**. Bỏ qua bước này thì link `/invite?to=...` share lên Zalo/Messenger vẫn hiện `og:url` trỏ về domain cũ.

#### Chọn domain chính & redirect

Trong **Settings → Domains**, khi có nhiều domain (apex + `www`), bấm **⋯ → Set as Primary** cho domain muốn làm chính; domain còn lại đặt **Redirect to** domain chính để tránh trùng lặp nội dung.

### 6.6 Checklist sau khi deploy

- [ ] Trang `/` load, ảnh và font `Mussica Swash` (trong `public/fonts/`) hiển thị đúng.
- [ ] `/invite?to=Nguyễn%20Văn%20A` hiện đúng tên khách.
- [ ] Share link `/invite?to=...` lên Zalo/Messenger → preview có tên khách (middleware hoạt động).
- [ ] Form RSVP gửi được lời chúc và ghi xuống Google Sheet.
- [ ] F5 trực tiếp tại `/invite` không ra 404 (SPA rewrite hoạt động).
- [ ] Domain riêng đã **Valid Configuration** trên Vercel, truy cập bằng `https://` không cảnh báo SSL.
- [ ] `SITE_ORIGIN` trong `middleware.ts` khớp với domain thật và đã redeploy.

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
| Vercel báo `Invalid Configuration` ở Domains | Record DNS sai giá trị, hoặc record cũ của Hostinger chưa xoá nên bị xung đột |
| Domain vẫn về trang mặc định của Hostinger | Record `A`/`CNAME` cũ trỏ về hosting Hostinger vẫn còn — xoá đi (xem mục 6.5 Bước 2) |
| Đổi DNS xong vẫn chưa ăn | Còn cache TTL cũ (Hostinger mặc định 4 tiếng) — chờ hết TTL, hoặc kiểm tra qua `nslookup <domain> 8.8.8.8` |
| Domain lên nhưng lỗi SSL | DNS vừa đúng, Vercel đang cấp cert — chờ vài phút; nếu quá lâu bấm **Refresh** trong Settings → Domains |
| Email theo tên miền chết sau khi đổi nameserver | MX record của Hostinger chưa được khai lại bên Vercel — xem cảnh báo ở mục 6.5 |
| Domain đúng nhưng preview Zalo/Facebook vẫn ra domain cũ | Chưa cập nhật `SITE_ORIGIN` trong `middleware.ts`, hoặc Facebook/Zalo còn cache — dùng Facebook Sharing Debugger để scrape lại |
