// utils/excelReader.js
import xlsx from 'xlsx';

export function readExcelData(filePath, sheetName = "Sheet1") {
  const workbook =  xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);
  
  return data;
}