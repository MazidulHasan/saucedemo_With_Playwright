# 🚀 Quick Start Guide - SauceDemo Playwright Framework

## ⚡ Installation (One-Time Setup)

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install
```

## 🎯 Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run smoke tests only
npm run test:smoke

# Run in headed mode (see browser)
npm run test:headed

# Run in debug mode
npm run test:debug

# Run in UI mode (interactive)
npm run test:ui
```

### Specific Browser & Tags

```bash
# Run on Chromium only
npx playwright test --project=chromium

# Run smoke tests only
npx playwright test --grep "@smoke"

# Run smoke tests on Chromium (Combined)
npx playwright test --project=chromium --grep "@smoke"

# Run sequentially (1 browser at a time)
npx playwright test --workers=1
```

### Generate Reports

```bash
# Generate and open HTML report
npm run test:report
npm run show:report

# Or directly
npx playwright test --reporter=html
npx playwright show-report
```

## 📊 View Results

### HTML Report
```bash
npx playwright show-report
```

### Logs
```bash
# View latest log file
cat logs/test-log-*.log

# Or open in editor
code logs/
```

### Screenshots & Videos
```bash
# Open test results folder
explorer test-results/
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `tests/login.spec.js` | Login test cases |
| `tests/fixtures/authFixture.js` | Authentication fixtures |
| `pages/LoginPage.js` | Login page object |
| `pages/DashboardPage.js` | Dashboard page object |
| `utils/testData.xlsx` | Test credentials |
| `helpers/logger.js` | Logging utility |
| `playwright.config.js` | Framework configuration |

## 🧪 Test Data (Excel)

Located at: `utils/testData.xlsx`

| Index | Username | Password | Description |
|-------|----------|----------|-------------|
| 0 | standard_user | secret_sauce | Valid user |
| 1 | locked_out_user | secret_sauce | Locked out |
| 2 | problem_user | secret_sauce | Problem user |
| 3 | performance_glitch_user | secret_sauce | Slow user |
| 4 | invalid_user | wrong_password | Invalid |

## 💡 Usage Examples

### Using Login Fixture

```javascript
test('my test', async ({ login, dashboardPage }) => {
  // Login with first credential (standard_user)
  await login(0);
  
  // Verify dashboard
  await dashboardPage.verifyDashboardVisible();
});
```

### Using Authenticated Page Fixture

```javascript
test('my test', async ({ authenticatedPage }) => {
  // Already logged in!
  const { dashboardPage } = authenticatedPage;
  
  // Do your test
  const products = await dashboardPage.getAllProductNames();
});
```

### Using Page Objects Directly

```javascript
test('my test', async ({ loginPage, dashboardPage }) => {
  await loginPage.navigateToLoginPage();
  await loginPage.doLogin('standard_user', 'secret_sauce');
  await dashboardPage.verifyDashboardVisible();
});
```

## 🐛 Troubleshooting

### Tests not running?
```bash
# Reinstall browsers
npx playwright install --with-deps
```

### Excel file not found?
```bash
# Regenerate test data
node createTestData.js
```

### Import errors?
- Ensure `"type": "module"` is in `package.json`

### Need more details?
- Check `README.md` for comprehensive documentation
- View logs in `logs/` directory
- Check HTML report: `npx playwright show-report`

## 📚 Next Steps

1. **Run the tests**: `npm test`
2. **View the report**: `npm run show:report`
3. **Check the logs**: `cat logs/test-log-*.log`
4. **Read the README**: `README.md`
5. **Explore the code**: Start with `tests/login.spec.js`

---

**Happy Testing! 🎉**
