/**
 * Demo Script - SauceDemo Playwright Framework
 * 
 * This script demonstrates the framework capabilities:
 * - Excel data reading
 * - Logging functionality
 * - Page object usage
 * - Test execution
 * 
 * Run this script to verify framework setup:
 * node demo.js
 */

import excelReader from './utils/excelReader.js';
import logger from './helpers/logger.js';

console.log('\n🚀 SauceDemo Playwright Framework - Demo Script\n');
console.log('='.repeat(60));

// 1. Demonstrate Logger
console.log('\n📝 1. LOGGING DEMONSTRATION');
console.log('-'.repeat(60));

logger.info('Framework initialization started');
logger.step('Loading configuration');
logger.pass('Configuration loaded successfully');
logger.warn('This is a warning message');
logger.info('Logger supports multiple levels: STEP, PASS, FAIL, INFO, WARN');

// 2. Demonstrate Excel Reader
console.log('\n📊 2. EXCEL DATA READING DEMONSTRATION');
console.log('-'.repeat(60));

try {
    logger.step('Reading test data from Excel file');

    // Get all credentials
    const allData = excelReader.getAllData();
    logger.pass(`Successfully loaded ${allData.length} credential sets from Excel`);

    console.log('\nAvailable Test Credentials:');
    console.log('─'.repeat(60));

    allData.forEach((cred, index) => {
        console.log(`\n${index}. ${cred.username}`);
        console.log(`   Password: ${'*'.repeat(cred.password.length)}`);
        console.log(`   Description: ${cred.description}`);
    });

    // Demonstrate getting specific credential
    console.log('\n' + '─'.repeat(60));
    logger.step('Getting specific credential (index 0)');
    const standardUser = excelReader.getLoginCredentials(0);
    logger.pass(`Retrieved credentials for: ${standardUser.username}`);

    console.log('\nCredential Details:');
    console.log(`  Username: ${standardUser.username}`);
    console.log(`  Password: ${'*'.repeat(standardUser.password.length)}`);
    console.log(`  Description: ${standardUser.description}`);

} catch (error) {
    logger.fail(`Excel reading failed: ${error.message}`);
    console.error('\n❌ Error:', error.message);
    console.error('\n💡 Tip: Run "node createTestData.js" to generate the Excel file');
}

// 3. Framework Structure
console.log('\n\n🏗️  3. FRAMEWORK STRUCTURE');
console.log('-'.repeat(60));

console.log(`
📁 Project Structure:
├── pages/
│   ├── BasePage.js         - Base class with common methods
│   ├── LoginPage.js        - Login page object
│   └── DashboardPage.js    - Dashboard page object
│
├── tests/
│   ├── login.spec.js       - Login test suite
│   └── fixtures/
│       └── authFixture.js  - Authentication fixtures
│
├── utils/
│   ├── excelReader.js      - Excel data reader
│   └── testData.xlsx       - Test credentials
│
├── helpers/
│   └── logger.js           - Logging utility
│
└── logs/                   - Generated log files
`);

// 4. Quick Start Commands
console.log('\n⚡ 4. QUICK START COMMANDS');
console.log('-'.repeat(60));

console.log(`
Run Tests:
  npm test                    # Run all tests
  npm run test:smoke          # Run smoke tests only
  npm run test:headed         # Run in headed mode (see browser)
  npm run test:debug          # Run in debug mode
  npm run test:ui             # Run in UI mode (interactive)

Generate Reports:
  npm run test:report         # Generate HTML report
  npm run show:report         # View HTML report

View Results:
  npx playwright show-report  # Open HTML report
  cat logs/test-log-*.log     # View log files
`);

// 5. Framework Features
console.log('\n✨ 5. FRAMEWORK FEATURES');
console.log('-'.repeat(60));

console.log(`
✅ Page Object Model (POM)
✅ Custom Fixtures (login, authenticatedPage)
✅ Excel-Driven Test Data
✅ Comprehensive Logging (Console + File)
✅ HTML Reports with Screenshots & Videos
✅ Multi-Browser Support (Chromium, Firefox, WebKit, Mobile)
✅ AAA Test Pattern (Arrange-Act-Assert)
✅ ES Modules (Modern JavaScript)
`);

// 6. Next Steps
console.log('\n🎯 6. NEXT STEPS');
console.log('-'.repeat(60));

console.log(`
1. Install dependencies:
   npm install
   npx playwright install

2. Run tests:
   npm test

3. View results:
   npm run show:report

4. Read documentation:
   - README.md         (Complete guide)
   - QUICKSTART.md     (Quick reference)
   - CONTRIBUTING.md   (How to contribute)

5. Explore the code:
   - Start with tests/login.spec.js
   - Check pages/ for Page Objects
   - Review fixtures in tests/fixtures/
`);

// 7. Summary
console.log('\n' + '='.repeat(60));
logger.pass('Demo script completed successfully!');
console.log('\n✅ Framework is ready to use!');
console.log('📚 Check README.md for detailed documentation');
console.log('🚀 Run "npm test" to execute the test suite\n');

// Show log file location
const logFile = logger.getLogFilePath();
console.log(`📝 Log file created at: ${logFile}\n`);
