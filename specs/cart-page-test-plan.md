# Cart Page Basic Operations Test Plan

## Application Overview

Cart page test plan for basic operations on the Sauce Demo cart page (https://www.saucedemo.com/cart.html).

Assumptions: fresh browser session; tester can log in as a standard user if required; tests may add items as part of steps so each scenario is independent.

Goals: verify cart UI, add/remove item behavior, cart count accuracy, navigation to checkout, and persistence across reload/logout.

## Test Scenarios

### 1. Cart Page - Basic Operations

**Seed:** `tests/MCP/seed.spec.js`

#### 1.1. Load Cart Page - UI Elements

**File:** `tests/cart_load.spec.js`

**Steps:**
  1. Open the application base URL (https://www.saucedemo.com) in a fresh session.
  2. If not already authenticated, log in with valid credentials (standard_user).
  3. Navigate to /cart.html (click shopping cart icon or go directly).
  4. Observe the cart page header and main elements (title, cart item list, cart badge, 'Continue Shopping' and 'Checkout' buttons).

**Expected Results:**
  - Page URL is https://www.saucedemo.com/cart.html and title contains 'Your Cart' or 'Swag Labs'.
  - Cart header 'Your Cart' is visible and readable.
  - 'Continue Shopping' and 'Checkout' buttons are visible and enabled (unless cart empty prevents checkout).
  - Cart item list displays rows for items if present, or displays an empty-cart state (no item rows).

#### 1.2. Add Item to Cart and Verify

**File:** `tests/cart_add_item.spec.js`

**Steps:**
  1. Start from a fresh session and log in as necessary.
  2. Navigate to the inventory page (/inventory.html).
  3. Locate a product (e.g., 'Sauce Labs Bolt T-Shirt') and click its 'Add to cart' button.
  4. Click the shopping cart icon to open the cart page.
  5. Verify product details inside the cart: name, description snippet, and price.

**Expected Results:**
  - Cart badge increments to '1' after adding the item.
  - Cart shows a single row containing 'Sauce Labs Bolt T-Shirt' with price $15.99 (price must match inventory).
  - 'Remove' button is present for the added item.

#### 1.3. Remove Item from Cart

**File:** `tests/cart_remove_item.spec.js`

**Steps:**
  1. Ensure the cart contains at least one item (add one if necessary).
  2. Go to the cart page.
  3. Click the 'Remove' button for the target item.
  4. Observe the cart UI and cart badge after removal.

**Expected Results:**
  - The removed item no longer appears in the cart item list.
  - Cart badge decrements accordingly (or disappears/reads '0').
  - If cart becomes empty, cart page shows empty state and checkout behavior updates accordingly.

#### 1.4. Cart Badge and Item Count Accuracy

**File:** `tests/cart_count_accuracy.spec.js`

**Steps:**
  1. From a fresh session, add two different products to the cart (using inventory page).
  2. Open the cart page and verify number of item rows and cart badge value.
  3. Remove one of the items and verify the badge and rows update correctly.

**Expected Results:**
  - After adding two distinct items, cart badge shows '2' and cart displays two item rows.
  - After removing one, cart badge shows '1' and only the remaining item row exists.
  - Item names and prices remain correct after add/remove operations.

#### 1.5. Proceed to Checkout From Cart

**File:** `tests/cart_checkout_flow.spec.js`

**Steps:**
  1. Add any product to the cart (if empty).
  2. Open the cart page and click the 'Checkout' button.
  3. Verify navigation to the checkout start page (usually /checkout-step-one.html).
  4. Verify checkout form fields (first name, last name, postal code) are present.

**Expected Results:**
  - Clicking 'Checkout' navigates to the checkout information page.
  - Checkout form fields are visible and ready for input.
  - No unexpected errors or blocked navigation occur.

#### 1.6. Persistence: Reload and Logout Behavior

**File:** `tests/cart_persistence.spec.js`

**Steps:**
  1. In a fresh authenticated session, add one product to the cart.
  2. Reload the cart page (browser refresh).
  3. Verify the cart still shows the added item.
  4. Log out from the application, then log back in as the same user and inspect the cart.

**Expected Results:**
  - Reload preserves the cart contents for the current session (item still present).
  - After logout and a fresh login, the cart resets according to application design (Sauce Demo typically clears cart on logout).
  - Any divergence (cart unexpectedly cleared on reload, or persisted across sessions when it shouldn't) should be flagged as a bug.
