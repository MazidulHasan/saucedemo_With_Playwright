import xlsx from 'xlsx';
import path from 'path';
import logger from '../helpers/logger.js';

/**
 * Excel Reader Utility
 * Reads test data from Excel files and provides methods to access the data
 * Supports multiple sheets for login credentials and product data
 */
class ExcelReader {
    constructor(filePath) {
        this.filePath = filePath;
        this.workbook = null;
        this.worksheet = null;
        this.data = [];
        this.productData = [];
    }

    /**
     * Load Excel file and parse data
     * @param {string} sheetName - Name of the sheet to read (default: first sheet)
     * @returns {Array} Parsed data as array of objects
     */
    loadData(sheetName = null) {
        try {
            logger.info(`Loading Excel file: ${this.filePath}`);

            // Read the workbook
            this.workbook = xlsx.readFile(this.filePath);

            // Get sheet name (use first sheet if not specified)
            const sheet = sheetName || this.workbook.SheetNames[0];
            logger.info(`Reading sheet: ${sheet}`);

            // Get worksheet
            this.worksheet = this.workbook.Sheets[sheet];

            // Convert to JSON (array of objects)
            this.data = xlsx.utils.sheet_to_json(this.worksheet);

            logger.pass(`Successfully loaded ${this.data.length} rows from Excel`);
            return this.data;

        } catch (error) {
            logger.fail(`Failed to load Excel file: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get all data from the Excel file
     * @returns {Array} All rows as array of objects
     */
    getAllData() {
        if (this.data.length === 0) {
            this.loadData();
        }
        return this.data;
    }

    /**
     * Get data by row index
     * @param {number} index - Row index (0-based)
     * @returns {Object} Row data as object
     */
    getDataByIndex(index) {
        if (this.data.length === 0) {
            this.loadData();
        }

        if (index >= 0 && index < this.data.length) {
            return this.data[index];
        } else {
            logger.warn(`Invalid index: ${index}. Total rows: ${this.data.length}`);
            return null;
        }
    }

    /**
     * Get data by column value match
     * @param {string} columnName - Column name to search
     * @param {string} value - Value to match
     * @returns {Object|null} First matching row or null
     */
    getDataByColumnValue(columnName, value) {
        if (this.data.length === 0) {
            this.loadData();
        }

        const result = this.data.find(row => row[columnName] === value);

        if (result) {
            logger.info(`Found data for ${columnName} = ${value}`);
            return result;
        } else {
            logger.warn(`No data found for ${columnName} = ${value}`);
            return null;
        }
    }

    /**
     * Get login credentials from Excel
     * Returns the first valid credential set
     * @param {number} index - Optional index to get specific credential (default: 0)
     * @returns {Object} Object with username and password
     */
    getLoginCredentials(index = 0) {
        if (this.data.length === 0) {
            this.loadData();
        }

        const credentials = this.getDataByIndex(index);

        if (credentials) {
            logger.info(`Retrieved credentials for: ${credentials.username || 'unknown user'}`);
            return {
                username: credentials.username || '',
                password: credentials.password || '',
                description: credentials.description || ''
            };
        } else {
            logger.fail('No credentials found in Excel file');
            throw new Error('No credentials available');
        }
    }

    /**
     * Get credentials by username
     * @param {string} username - Username to search for
     * @returns {Object} Object with username and password
     */
    getCredentialsByUsername(username) {
        const credentials = this.getDataByColumnValue('username', username);

        if (credentials) {
            return {
                username: credentials.username || '',
                password: credentials.password || '',
                description: credentials.description || ''
            };
        } else {
            throw new Error(`Credentials not found for username: ${username}`);
        }
    }

    /**
     * Load product data from Products sheet
     * @returns {Array} Product data
     */
    loadProductData() {
        try {
            logger.info('Loading product data from Excel');

            // Read the workbook if not already loaded
            if (!this.workbook) {
                this.workbook = xlsx.readFile(this.filePath);
            }

            // Get Products sheet
            const productSheet = 'Products';
            logger.info(`Reading sheet: ${productSheet}`);

            // Get worksheet
            const worksheet = this.workbook.Sheets[productSheet];

            if (!worksheet) {
                throw new Error(`Sheet "${productSheet}" not found in Excel file`);
            }

            // Convert to JSON
            this.productData = xlsx.utils.sheet_to_json(worksheet);

            logger.pass(`Successfully loaded ${this.productData.length} products from Excel`);
            return this.productData;

        } catch (error) {
            logger.fail(`Failed to load product data: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get all product data
     * @returns {Array} All products
     */
    getAllProducts() {
        if (this.productData.length === 0) {
            this.loadProductData();
        }
        return this.productData;
    }

    /**
     * Get product by index
     * @param {number} index - Product index (0-based)
     * @returns {Object} Product data
     */
    getProductByIndex(index) {
        if (this.productData.length === 0) {
            this.loadProductData();
        }

        if (index >= 0 && index < this.productData.length) {
            logger.info(`Retrieved product: ${this.productData[index].productName}`);
            return this.productData[index];
        } else {
            logger.warn(`Invalid product index: ${index}. Total products: ${this.productData.length}`);
            return null;
        }
    }

    /**
     * Get product by name
     * @param {string} productName - Product name to search for
     * @returns {Object|null} Product data or null
     */
    getProductByName(productName) {
        if (this.productData.length === 0) {
            this.loadProductData();
        }

        const product = this.productData.find(p => p.productName === productName);

        if (product) {
            logger.info(`Found product: ${productName}`);
            return product;
        } else {
            logger.warn(`Product not found: ${productName}`);
            return null;
        }
    }
}

// Create and export instance with default test data file
const excelFilePath = path.join(process.cwd(), 'utils', 'testData.xlsx');
const excelReader = new ExcelReader(excelFilePath);

export default excelReader;
