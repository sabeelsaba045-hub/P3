// טסט Sanity - תרחיש רכישה מלא
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { CartPage } from "../pages/CartPage.js";
import { CheckoutPage } from "../pages/CheckoutPage.js";
import { urls } from "../data/urls.js";
import { users } from "../data/Users.js";

test.describe("Sanity Test - Full Purchase Flow", () => {
  test("Complete purchase from login to checkout", async ({ page }) => {
    // יצירת Page Objects
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // שלב 1: התחברות
    await loginPage.goto(urls.baseUrl);
    await loginPage.login(users.validUser.username, users.validUser.password);

    // שלב 2: אימות URL לאחר התחברות
    await expect(page).toHaveURL(urls.inventoryUrl);

    // שלב 3: אימות כותרת דף המוצרים
    await inventoryPage.expectPageTitle("Products");

    // שלב 4: הוספת 2 מוצרים לעגלה
    await inventoryPage.addProductToCart("backpack");
    await inventoryPage.addProductToCart("bike-light");

    // שלב 5: בדיקת מספר הפריטים בעגלה (badge)
    await inventoryPage.expectCartItemCount("2");

    // שלב 6: מעבר לעגלת הקניות
    await inventoryPage.goToCart();

    // שלב 7: אימות URL של העגלה
    await expect(page).toHaveURL(urls.cartUrl);

    // שלב 8: אימות כותרת העגלה
    await cartPage.expectPageTitle("Your Cart");

    // שלב 9: אימות מספר הפריטים בעגלה
    const itemsCount = await cartPage.getCartItemsCount();
    expect(itemsCount).toBe(2);

    // שלב 10: מעבר ל-Checkout Step 1
    await cartPage.goToCheckout();

    // שלב 11: אימות URL של Checkout Step 1
    await expect(page).toHaveURL(urls.checkoutStepOneUrl);

    // שלב 12: אימות כותרת Checkout Step 1
    await checkoutPage.expectPageTitle("Checkout: Your Information");

    // שלב 13: מילוי טופס ומעבר לשלב הבא
    await checkoutPage.fillCheckoutInfo("John", "Doe", "12345");
    await checkoutPage.clickContinue();

    // שלב 14: אימות URL של Checkout Step 2
    await expect(page).toHaveURL(urls.checkoutStepTwoUrl);

    // שלב 15: אימות כותרת Checkout Step 2
    await checkoutPage.expectPageTitle("Checkout: Overview");

    // שלב 16: סיום הרכישה
    await checkoutPage.clickFinish();

    // שלב 17: אימות URL של Checkout Complete
    await expect(page).toHaveURL(urls.checkoutCompleteUrl);

    // שלב 18: אימות כותרת Complete
    await checkoutPage.expectPageTitle("Checkout: Complete!");

    // שלב 19: אימות הודעת התודה
    await checkoutPage.expectCompleteHeader("Thank you for your order!");
    await checkoutPage.expectCompleteTextToContain(
      "Your order has been dispatched"
    );
  });
});
