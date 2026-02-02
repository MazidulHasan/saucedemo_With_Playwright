import XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join( __dirname, '..', 'testData.xlsx');

export class ExcelToJson{
    constructor(){
        this.workbook = XLSX.readFile(filePath);
    }

    getLoginCredentials(){
        const loginSheet = this.workbook.Sheets['LoginCredentials'];
        const loginCredentials = XLSX.utils.sheet_to_json(loginSheet);
        return loginCredentials;
    }

    getProducts(){
        const productSheet = this.workbook.Sheets['Products'];
        const products = XLSX.utils.sheet_to_json(productSheet);
        return products;
    }
}








