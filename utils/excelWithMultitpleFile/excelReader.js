import xlsx from "xlsx";
import path from "path";

export function readExcel(filePath, sheetName) {
  const workbook = xlsx.readFile(path.resolve(filePath));
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(sheet);
}
