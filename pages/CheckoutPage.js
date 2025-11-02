// Page Object לעמוד Checkout (כל השלבים)
// מטרה: הפרדה בין האלמנטים של הדף לבין לוגיקת הבדיקה

import { expect } from "@playwright/test";

export class CheckoutPage {
  constructor(page) {
    this.page = page;

    // Selectors - Step One (Your Information)
    this.pageTitle = page.locator(".title");
    this.firstNameInput = page.locator("#first-name");
    this.lastNameInput = page.locator("#last-name");
    this.postalCodeInput = page.locator("#postal-code");
    this.continueButton = page.locator("#continue");
    this.cancelButton = page.locator("#cancel");

    // Selectors - Step Two (Overview)
    this.finishButton = page.locator("#finish");
    this.cartItems = page.locator(".cart_item");

    // Selectors - Complete
    this.completeHeader = page.locator(".complete-header");
    this.completeText = page.locator(".complete-text");
    this.backHomeButton = page.locator("#back-to-products");
  }

  // פונקציה: אימות כותרת הדף
  async expectPageTitle(expectedTitle) {
    await expect(this.pageTitle).toHaveText(expectedTitle);
  }

  // פונקציה: מילוי פרטים אישיים (Step 1)
  async fillCheckoutInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  // פונקציה: לחיצה על Continue (Step 1 -> Step 2)
  async clickContinue() {
    await this.continueButton.click();
  }

  // פונקציה: לחיצה על Finish (Step 2 -> Complete)
  async clickFinish() {
    await this.finishButton.click();
  }

  // פונקציה: אימות כותרת ההשלמה
  async expectCompleteHeader(expectedText) {
    await expect(this.completeHeader).toHaveText(expectedText);
  }

  // פונקציה: אימות טקסט התודה
  async expectCompleteTextToContain(expectedText) {
    await expect(this.completeText).toContainText(expectedText);
  }

  // פונקציה: חזרה לדף הבית
  async backToHome() {
    await this.backHomeButton.click();
  }
}