// ─── ENTRY POINTS ────────────────────────────────────────────────────────────

/**
 * GET https://script.google.com/macros/s/<SCRIPT_ID>/exec
 * Trả về toàn bộ danh sách lời chúc dạng JSON array.
 */
function doGet() {
  try {
    var wishes = _getWishes();
    return _ok(wishes);
  } catch (e) {
    return _error(e.message);
  }
}

/**
 * POST https://script.google.com/macros/s/<SCRIPT_ID>/exec
 * Body JSON: { "name": "...", "message": "...", "attending": "yes" }
 * Tạo một hàng mới trong sheet và trả về wish vừa tạo.
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    _validate(data);
    var wish = _createWish(data);
    return _ok(wish);
  } catch (e) {
    return _error(e.message);
  }
}

// ─── LOGIC ───────────────────────────────────────────────────────────────────

function _getWishes() {
  var sheet = _getSheet();
  var lastRow = sheet.getLastRow();

  // Chỉ có header hoặc sheet rỗng
  if (lastRow <= 1) return [];

  var range = sheet.getRange(2, 1, lastRow - 1, COL.TOTAL);
  var rows   = range.getValues();

  return rows
    .filter(function (row) { return row[COL.ID - 1] !== ""; })
    .map(function (row) {
      return {
        id:        String(row[COL.ID        - 1]),
        name:      String(row[COL.NAME      - 1]),
        message:   String(row[COL.MESSAGE   - 1]),
        attending: String(row[COL.ATTENDING - 1]),
        timestamp: String(row[COL.TIMESTAMP - 1]),
      };
    });
}

function _createWish(data) {
  var sheet     = _getSheet();
  var id        = Date.now().toString();
  var timestamp = Utilities.formatDate(new Date(), TIMEZONE, DATE_FORMAT);
  var attending = data.attending || "yes";

  sheet.appendRow([id, data.name, data.message, attending, timestamp]);

  return {
    id:        id,
    name:      data.name,
    message:   data.message,
    attending: attending,
    timestamp: timestamp,
  };
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function _getSheet() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('Sheet "' + SHEET_NAME + '" không tồn tại.');
  return sheet;
}

function _validate(data) {
  if (!data.name    || data.name.trim()    === "") throw new Error("Thiếu trường name.");
  if (!data.message || data.message.trim() === "") throw new Error("Thiếu trường message.");
}

function _ok(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function _error(msg) {
  return ContentService
    .createTextOutput(JSON.stringify({ error: msg }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─── SETUP (chạy 1 lần thủ công từ Apps Script editor) ──────────────────────

/**
 * Tạo tab "Wishes" với header row.
 * Vào Apps Script editor → chọn hàm setupSheet → nhấn Run.
 */
function setupSheet() {
  var ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  // Chỉ ghi header nếu sheet còn trống
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADER_ROW);

    // Format header
    var headerRange = sheet.getRange(1, 1, 1, HEADER_ROW.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#4a7c59");
    headerRange.setFontColor("#ffffff");
    sheet.setFrozenRows(1);
  }

  Logger.log('Sheet "' + SHEET_NAME + '" đã sẵn sàng.');
}
