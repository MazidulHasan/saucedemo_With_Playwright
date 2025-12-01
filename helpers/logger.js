import fs from 'fs-extra';
import path from 'path';

/**
 * Logger Utility for Test Automation Framework
 * Provides timestamped logging with both console and file output
 * Supports different log levels: STEP, PASS, FAIL, INFO
 */
class Logger {
    constructor() {
        this.logDir = 'logs';
        this.logFile = this.createLogFile();
        this.ensureLogDirectory();
    }

    /**
     * Ensure logs directory exists
     */
    ensureLogDirectory() {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }

    /**
     * Create log file with date-based naming
     * @returns {string} Log file path
     */
    createLogFile() {
        const date = new Date();
        const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
        const timeStr = date.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-MM-SS
        return path.join(this.logDir, `test-log-${dateStr}-${timeStr}.log`);
    }

    /**
     * Get current timestamp
     * @returns {string} Formatted timestamp
     */
    getTimestamp() {
        const now = new Date();
        return now.toISOString().replace('T', ' ').substring(0, 19);
    }

    /**
     * Write log to both console and file
     * @param {string} level - Log level
     * @param {string} message - Log message
     * @param {string} color - Console color code
     */
    writeLog(level, message, color = '\x1b[0m') {
        const timestamp = this.getTimestamp();
        const logMessage = `[${timestamp}] [${level}] ${message}`;

        // Console output with color
        console.log(`${color}${logMessage}\x1b[0m`);

        // File output
        try {
            fs.appendFileSync(this.logFile, logMessage + '\n');
        } catch (error) {
            console.error('Failed to write to log file:', error.message);
        }
    }

    /**
     * Log a test step
     * @param {string} message - Step description
     */
    step(message) {
        this.writeLog('STEP', message, '\x1b[36m'); // Cyan
    }

    /**
     * Log a passed assertion or action
     * @param {string} message - Success message
     */
    pass(message) {
        this.writeLog('PASS', message, '\x1b[32m'); // Green
    }

    /**
     * Log a failed assertion or action
     * @param {string} message - Failure message
     */
    fail(message) {
        this.writeLog('FAIL', message, '\x1b[31m'); // Red
    }

    /**
     * Log informational message
     * @param {string} message - Info message
     */
    info(message) {
        this.writeLog('INFO', message, '\x1b[37m'); // White
    }

    /**
     * Log a warning message
     * @param {string} message - Warning message
     */
    warn(message) {
        this.writeLog('WARN', message, '\x1b[33m'); // Yellow
    }

    /**
     * Get the current log file path
     * @returns {string} Log file path
     */
    getLogFilePath() {
        return this.logFile;
    }
}

// Export singleton instance
const logger = new Logger();
export default logger;
