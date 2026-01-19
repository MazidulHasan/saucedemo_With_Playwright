import { readExcel } from "../utils/excelReader.js";

export function buildExcelProjects() {
  const data = readExcel("./testdata/loginData.xlsx", "Sheet1");

  return data.map(row => ({
    name: `ExcelRow-${row.caseNo}`,
    testMatch: /.*\.excel\.spec\.js/,
    use: {
      testData: row
    }
  }));
}
