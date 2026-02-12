# Manual Test Cases for Saucedemo Login Functionality

**Application Under Test:** https://www.saucedemo.com/  
**Module:** Login  
**Created Date:** 2026-01-24  
**Test Environment:** Web Application  

---

## Test Data

### Valid Credentials
| Username | Password | User Type | Expected Behavior |
|----------|----------|-----------|-------------------|
| standard_user | secret_sauce | Standard User | Successful login, normal functionality |
| problem_user | secret_sauce | Problem User | Login successful, but images display incorrectly |
| performance_glitch_user | secret_sauce | Performance User | Login successful with 5-second delay |
| error_user | secret_sauce | Error User | Login successful, but may encounter errors |
| visual_user | secret_sauce | Visual User | Login successful, visual layout issues |

### Invalid Credentials
| Username | Password | User Type | Expected Behavior |
|----------|----------|-----------|-------------------|
| locked_out_user | secret_sauce | Locked User | Login fails with error message |

---

## Test Cases

### **TC_LOGIN_001: Verify successful login with valid credentials (Standard User)**

**Priority:** High  
**Type:** Positive  
**Preconditions:** User is on the login page

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to https://www.saucedemo.com/ | Login page is displayed with username and password fields |
| 2 | Enter "standard_user" in the username field (#user-name) | Username is entered correctly |
| 3 | Enter "secret_sauce" in the password field (#password) | Password is entered (masked) |
| 4 | Click the "Login" button (#login-button) | User is redirected to the inventory/products page |
| 5 | Verify the URL | URL should be https://www.saucedemo.com/inventory.html |
| 6 | Verify page content | 6 products are displayed on the page |

**Expected Result:** User successfully logs in and is redirected to the products page  
**Actual Result:** _[To be filled during testing]_  
**Status:** _[Pass/Fail]_  

---

### **TC_LOGIN_002: Verify login failure with locked out user**

**Priority:** High  
**Type:** Negative  
**Preconditions:** User is on the login page

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to https://www.saucedemo.com/ | Login page is displayed |
| 2 | Enter "locked_out_user" in the username field | Username is entered correctly |
| 3 | Enter "secret_sauce" in the password field | Password is entered (masked) |
| 4 | Click the "Login" button | Error message is displayed |
| 5 | Verify error message | Message should read: "Epic sadface: Sorry, this user has been locked out." |
| 6 | Verify user remains on login page | URL should still be https://www.saucedemo.com/ |

**Expected Result:** Login fails with appropriate error message  
**Actual Result:** _[To be filled during testing]_  
**Status:** _[Pass/Fail]_  

---

### **TC_LOGIN_003: Verify login failure with invalid username**

**Priority:** High  
**Type:** Negative  
**Preconditions:** User is on the login page

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to https://www.saucedemo.com/ | Login page is displayed |
| 2 | Enter "invalid_user" in the username field | Invalid username is entered |
| 3 | Enter "secret_sauce" in the password field | Password is entered (masked) |
| 4 | Click the "Login" button | Error message is displayed |
| 5 | Verify error message | Message should indicate username and password do not match |
| 6 | Verify user remains on login page | User is not redirected |

**Expected Result:** Login fails with appropriate error message  
**Actual Result:** _[To be filled during testing]_  
**Status:** _[Pass/Fail]_  

---

### **TC_LOGIN_004: Verify login failure with invalid password**

**Priority:** High  
**Type:** Negative  
**Preconditions:** User is on the login page

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to https://www.saucedemo.com/ | Login page is displayed |
| 2 | Enter "standard_user" in the username field | Valid username is entered |
| 3 | Enter "wrong_password" in the password field | Invalid password is entered |
| 4 | Click the "Login" button | Error message is displayed |
| 5 | Verify error message | Message should indicate username and password do not match |
| 6 | Verify user remains on login page | User is not redirected |

**Expected Result:** Login fails with appropriate error message  
**Actual Result:** _[To be filled during testing]_  
**Status:** _[Pass/Fail]_  

---

### **TC_LOGIN_005: Verify login with empty username field**

**Priority:** Medium  
**Type:** Negative  
**Preconditions:** User is on the login page

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to https://www.saucedemo.com/ | Login page is displayed |
| 2 | Leave the username field empty | Username field is blank |
| 3 | Enter "secret_sauce" in the password field | Password is entered |
| 4 | Click the "Login" button | Error message is displayed |
| 5 | Verify error message | Message should indicate "Username is required" |
| 6 | Verify user remains on login page | User is not redirected |

**Expected Result:** Login fails with validation error for empty username  
**Actual Result:** _[To be filled during testing]_  
**Status:** _[Pass/Fail]_  

---

### **TC_LOGIN_006: Verify login with empty password field**

**Priority:** Medium  
**Type:** Negative  
**Preconditions:** User is on the login page

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to https://www.saucedemo.com/ | Login page is displayed |
| 2 | Enter "standard_user" in the username field | Valid username is entered |
| 3 | Leave the password field empty | Password field is blank |
| 4 | Click the "Login" button | Error message is displayed |
| 5 | Verify error message | Message should indicate "Password is required" |
| 6 | Verify user remains on login page | User is not redirected |

**Expected Result:** Login fails with validation error for empty password  
**Actual Result:** _[To be filled during testing]_  
**Status:** _[Pass/Fail]_  

---

### **TC_LOGIN_007: Verify login with both fields empty**

**Priority:** Medium  
**Type:** Negative  
**Preconditions:** User is on the login page

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to https://www.saucedemo.com/ | Login page is displayed |
| 2 | Leave the username field empty | Username field is blank |
| 3 | Leave the password field empty | Password field is blank |
| 4 | Click the "Login" button | Error message is displayed |
| 5 | Verify error message | Message should indicate "Username is required" |
| 6 | Verify user remains on login page | User is not redirected |

**Expected Result:** Login fails with validation error  
**Actual Result:** _[To be filled during testing]_  
**Status:** _[Pass/Fail]_  

---

### **TC_LOGIN_008: Verify password field masking**

**Priority:** Medium  
**Type:** Functional  
**Preconditions:** User is on the login page

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to https://www.saucedemo.com/ | Login page is displayed |
| 2 | Click on the password field | Password field is focused |
| 3 | Enter "secret_sauce" in the password field | Characters are displayed as dots/asterisks |
| 4 | Verify password masking | Password should not be visible in plain text |

**Expected Result:** Password is masked for security  
**Actual Result:** _[To be filled during testing]_  
**Status:** _[Pass/Fail]_  

---

### **TC_LOGIN_009: Verify login with case-sensitive username**

**Priority:** Medium  
**Type:** Negative  
**Preconditions:** User is on the login page

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to https://www.saucedemo.com/ | Login page is displayed |
| 2 | Enter "STANDARD_USER" (uppercase) in username field | Username is entered in uppercase |
| 3 | Enter "secret_sauce" in the password field | Password is entered correctly |
| 4 | Click the "Login" button | Error message is displayed or login fails |
| 5 | Verify behavior | System should handle case sensitivity appropriately |

**Expected Result:** Login behavior is consistent with case sensitivity rules  
**Actual Result:** _[To be filled during testing]_  
**Status:** _[Pass/Fail]_  

---

### **TC_LOGIN_010: Verify login with special characters in username**

**Priority:** Low  
**Type:** Negative  
**Preconditions:** User is on the login page

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to https://www.saucedemo.com/ | Login page is displayed |
| 2 | Enter "user@#$%" in the username field | Special characters are entered |
| 3 | Enter "secret_sauce" in the password field | Password is entered |
| 4 | Click the "Login" button | Error message is displayed |
| 5 | Verify error message | Appropriate error message is shown |

**Expected Result:** Login fails with invalid username  
**Actual Result:** _[To be filled during testing]_  
**Status:** _[Pass/Fail]_  

---

### **TC_LOGIN_011: Verify login with SQL injection attempt**

**Priority:** High  
**Type:** Security  
**Preconditions:** User is on the login page

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to https://www.saucedemo.com/ | Login page is displayed |
| 2 | Enter "admin' OR '1'='1" in the username field | SQL injection string is entered |
| 3 | Enter "admin' OR '1'='1" in the password field | SQL injection string is entered |
| 4 | Click the "Login" button | Login should fail |
| 5 | Verify security | Application should not be vulnerable to SQL injection |

**Expected Result:** Login fails, no security breach  
**Actual Result:** _[To be filled during testing]_  
**Status:** _[Pass/Fail]_  

---

### **TC_LOGIN_012: Verify login with whitespace in credentials**

**Priority:** Medium  
**Type:** Negative  
**Preconditions:** User is on the login page

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to https://www.saucedemo.com/ | Login page is displayed |
| 2 | Enter " standard_user " (with leading/trailing spaces) | Username with spaces is entered |
| 3 | Enter " secret_sauce " (with leading/trailing spaces) | Password with spaces is entered |
| 4 | Click the "Login" button | Login should fail or spaces should be trimmed |
| 5 | Verify behavior | System handles whitespace appropriately |

**Expected Result:** System either trims whitespace or shows error  
**Actual Result:** _[To be filled during testing]_  
**Status:** _[Pass/Fail]_  

---

### **TC_LOGIN_013: Verify login with performance_glitch_user**

**Priority:** Medium  
**Type:** Performance  
**Preconditions:** User is on the login page

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to https://www.saucedemo.com/ | Login page is displayed |
| 2 | Enter "performance_glitch_user" in username field | Username is entered |
| 3 | Enter "secret_sauce" in the password field | Password is entered |
| 4 | Click the "Login" button | Loading indicator appears |
| 5 | Wait and observe | Login completes after approximately 5 seconds |
| 6 | Verify successful login | User is redirected to inventory page |

**Expected Result:** Login succeeds with noticeable delay (~5 seconds)  
**Actual Result:** _[To be filled during testing]_  
**Status:** _[Pass/Fail]_  

---

### **TC_LOGIN_014: Verify login with problem_user**

**Priority:** Medium  
**Type:** Functional  
**Preconditions:** User is on the login page

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to https://www.saucedemo.com/ | Login page is displayed |
| 2 | Enter "problem_user" in the username field | Username is entered |
| 3 | Enter "secret_sauce" in the password field | Password is entered |
| 4 | Click the "Login" button | User is redirected to inventory page |
| 5 | Verify product images | Images may display incorrectly |
| 6 | Document issues | Note any visual or functional problems |

**Expected Result:** Login succeeds but may have display issues  
**Actual Result:** _[To be filled during testing]_  
**Status:** _[Pass/Fail]_  

---

### **TC_LOGIN_015: Verify Enter key functionality on login form**

**Priority:** Medium  
**Type:** Functional  
**Preconditions:** User is on the login page

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to https://www.saucedemo.com/ | Login page is displayed |
| 2 | Enter "standard_user" in the username field | Username is entered |
| 3 | Enter "secret_sauce" in the password field | Password is entered |
| 4 | Press Enter key (instead of clicking Login button) | Login is submitted |
| 5 | Verify successful login | User is redirected to inventory page |

**Expected Result:** Enter key submits the login form successfully  
**Actual Result:** _[To be filled during testing]_  
**Status:** _[Pass/Fail]_  

---

### **TC_LOGIN_016: Verify Tab key navigation between fields**

**Priority:** Low  
**Type:** Usability  
**Preconditions:** User is on the login page

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to https://www.saucedemo.com/ | Login page is displayed |
| 2 | Click on the username field | Username field is focused |
| 3 | Press Tab key | Focus moves to password field |
| 4 | Press Tab key again | Focus moves to Login button |
| 5 | Verify tab order | Tab navigation follows logical order |

**Expected Result:** Tab key navigates through form elements correctly  
**Actual Result:** _[To be filled during testing]_  
**Status:** _[Pass/Fail]_  

---

### **TC_LOGIN_017: Verify error message dismissal**

**Priority:** Low  
**Type:** Functional  
**Preconditions:** User is on the login page

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to https://www.saucedemo.com/ | Login page is displayed |
| 2 | Enter invalid credentials | Invalid credentials entered |
| 3 | Click the "Login" button | Error message is displayed |
| 4 | Look for close/dismiss button on error | Error should have a close button (X) |
| 5 | Click the close button | Error message is dismissed |
| 6 | Verify error is removed | Error message is no longer visible |

**Expected Result:** Error message can be dismissed  
**Actual Result:** _[To be filled during testing]_  
**Status:** _[Pass/Fail]_  

---

### **TC_LOGIN_018: Verify login page UI elements**

**Priority:** Medium  
**Type:** UI/Visual  
**Preconditions:** User is on the login page

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to https://www.saucedemo.com/ | Login page is displayed |
| 2 | Verify page title | Title should be "Swag Labs" |
| 3 | Verify logo/branding | Swag Labs logo is visible |
| 4 | Verify username field | Field is visible with appropriate placeholder/label |
| 5 | Verify password field | Field is visible with appropriate placeholder/label |
| 6 | Verify Login button | Button is visible and properly styled |
| 7 | Verify accepted usernames list | List of valid usernames is displayed |

**Expected Result:** All UI elements are present and properly displayed  
**Actual Result:** _[To be filled during testing]_  
**Status:** _[Pass/Fail]_  

---

### **TC_LOGIN_019: Verify browser back button after successful login**

**Priority:** Medium  
**Type:** Functional  
**Preconditions:** User has successfully logged in

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Login with valid credentials (standard_user) | User is on inventory page |
| 2 | Verify successful login | Inventory page is displayed |
| 3 | Click browser back button | User should remain authenticated |
| 4 | Verify behavior | User should not be logged out |

**Expected Result:** Session is maintained after using back button  
**Actual Result:** _[To be filled during testing]_  
**Status:** _[Pass/Fail]_  

---

### **TC_LOGIN_020: Verify direct URL access without login**

**Priority:** High  
**Type:** Security  
**Preconditions:** User is not logged in

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open a new browser window/incognito mode | Browser is ready |
| 2 | Navigate directly to https://www.saucedemo.com/inventory.html | Attempt to access protected page |
| 3 | Verify redirection | User should be redirected to login page |
| 4 | Verify URL | URL should be https://www.saucedemo.com/ |

**Expected Result:** Unauthenticated users cannot access protected pages  
**Actual Result:** _[To be filled during testing]_  
**Status:** _[Pass/Fail]_  

---

### **TC_LOGIN_021: Verify successful logout**

**Priority:** High  
**Type:** Positive  
**Preconditions:** User is logged in and on the inventory page

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click the burger menu button (#react-burger-menu-btn) | Sidebar menu expands |
| 2 | Click the "Logout" link (#logout_sidebar_link) | User is logged out |
| 3 | Verify redirection | User is redirected to the login page (https://www.saucedemo.com/) |
| 4 | Verify access | Attempting to go back to inventory.html should redirect to login |

**Expected Result:** User successfully logs out and cannot access protected pages  
**Actual Result:** _[To be filled during testing]_  
**Status:** _[Pass/Fail]_  

---

## Test Execution Summary

| Total Test Cases | Passed | Failed | Blocked | Not Executed |
|------------------|--------|--------|---------|--------------|
| 20 | - | - | - | - |

**Test Execution Date:** _[To be filled]_  
**Tested By:** _[To be filled]_  
**Browser:** _[To be filled]_  
**OS:** _[To be filled]_  

---

## Notes

- All test cases should be executed on multiple browsers (Chrome, Firefox, Safari, Edge)
- Test on different screen resolutions for responsive design validation
- Document any defects found with screenshots and detailed steps to reproduce
- Verify accessibility compliance (WCAG guidelines)
- Test on mobile devices if applicable

---

## Defect Template

**Defect ID:** _[DEF-XXX]_  
**Test Case ID:** _[TC_LOGIN_XXX]_  
**Severity:** _[Critical/High/Medium/Low]_  
**Priority:** _[High/Medium/Low]_  
**Summary:** _[Brief description]_  
**Steps to Reproduce:**  
1. _[Step 1]_  
2. _[Step 2]_  

**Expected Result:** _[What should happen]_  
**Actual Result:** _[What actually happened]_  
**Screenshot:** _[Attach screenshot]_  
**Environment:** _[Browser, OS, etc.]_  
