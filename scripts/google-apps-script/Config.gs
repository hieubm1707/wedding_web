// ─── CẤU HÌNH ────────────────────────────────────────────────────────────────
// Dán Spreadsheet ID từ URL của Google Sheet:
//   https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/edit
var SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE";

// Tên tab chứa dữ liệu lời chúc (mặc định sheet đầu tiên)
var SHEET_NAME = "Wishes";

// Múi giờ hiển thị trong cột timestamp
var TIMEZONE = "Asia/Ho_Chi_Minh";

// Định dạng ngày trả về (ví dụ: "08 May 2026")
var DATE_FORMAT = "dd MMMM yyyy";

// Mapping cột trong sheet (bắt đầu từ 1)
var COL = {
  ID:        1,  // A
  NAME:      2,  // B
  MESSAGE:   3,  // C
  ATTENDING: 4,  // D
  TIMESTAMP: 5,  // E
  TOTAL:     5,
};

// Header row — chạy setupSheet() một lần để tạo header
var HEADER_ROW = ["id", "name", "message", "attending", "timestamp"];
