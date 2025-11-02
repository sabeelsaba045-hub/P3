// Page Object לעמוד ההתחברות
// מטרה: הפרדה בין האלמנטים של הדף לבין לוגיקת הבדיקה

import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;

    // Selectors - מזהים של אלמנטים בדף
    this.usernameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // פונקציה: ניווט לדף ההתחברות
  async goto(url) {
    await this.page.goto(url);
  }

  // פונקציה: התחברות למערכת
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // פונקציה: קבלת טקסט הודעת השגיאה
  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  // פונקציה: אימות שהודעת שגיאה מוצגת
  async expectErrorToBeVisible() {
    await expect(this.errorMessage).toBeVisible();
  }

  // פונקציה: אימות תוכן הודעת השגיאה
  async expectErrorToContainText(expectedText) {
    await expect(this.errorMessage).toContainText(expectedText);
  }
}
