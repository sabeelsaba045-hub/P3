// טסטים לבדיקת התחברות - גרסת Data-Driven Tests
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { InventoryPage } from "../pages/InventoryPage.js";
import { urls } from "../data/urls.js";
import { validUsers, invalidLoginScenarios } from "../data/UserCombos.js";

// קבוצת טסטים חיוביים - התחברות מוצלחת עם Data-Driven
test.describe("Login - Positive Tests (Data-Driven)", () => {
  // לולאה על כל המשתמשים התקינים
  validUsers.forEach(({ name, credentials }) => {
    test(`Login with ${name}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);

      await loginPage.goto(urls.baseUrl);
      await loginPage.login(credentials.username, credentials.password);

      // אימות URL
      await expect(page).toHaveURL(urls.inventoryUrl);

      // אימות כותרת הדף
      await inventoryPage.expectPageTitle("Products");
    });
  });
});

// קבוצת טסטים שליליים - התחברות כושלת עם Data-Driven
test.describe("Login - Negative Tests (Data-Driven)", () => {
  // לולאה על כל תרחישי הכישלון
  invalidLoginScenarios.forEach(
    ({ name, username, password, expectedError }) => {
      test(`Login with ${name}`, async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto(urls.baseUrl);
        await loginPage.login(username, password);

        // אימות שהודעת שגיאה מוצגת ומכילה את הטקסט הצפוי
        await loginPage.expectErrorToBeVisible();
        await loginPage.expectErrorToContainText(expectedError);
      });
    }
  );
});