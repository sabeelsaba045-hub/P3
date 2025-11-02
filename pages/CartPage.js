// Page Object לעמוד העגלה (Cart)
// מטרה: הפרדה בין האלמנטים של הדף לבין לוגיקת הבדיקה

import { expect } from "@playwright/test";

export class CartPage {
  constructor(page) {
    this.page = page;

    // Selectors
    this.pageTitle = page.locator(".title");
    this.cartItems = page.locator(".cart_item");
    this.checkoutButton = page.locator("#checkout");
    this.continueShoppingButton = page.locator("#continue-shopping");
  }

  // פונקציה: אימות כותרת הדף
  async expectPageTitle(expectedTitle) {
    await expect(this.pageTitle).toHaveText(expectedTitle);
  }

  // פונקציה: קבלת מספר הפריטים בעגלה
  async getCartItemsCount() {
    return await this.cartItems.count();
  }

  // פונקציה: מעבר לדף Checkout
  async goToCheckout() {
    await this.checkoutButton.click();
  }

  // פונקציה: המשך קניות (חזרה למוצרים)
  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}