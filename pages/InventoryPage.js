// Page Object לעמוד המוצרים (Inventory)
// מטרה: הפרדה בין האלמנטים של הדף לבין לוגיקת הבדיקה

import { expect } from "@playwright/test";

export class InventoryPage {
  constructor(page) {
    this.page = page;

    // Selectors
    this.pageTitle = page.locator(".title");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.cartLink = page.locator(".shopping_cart_link");

    // כפתורי הוספה לעגלה - נשתמש בהם לפי מוצר
    this.addToCartBackpack = page.locator("#add-to-cart-sauce-labs-backpack");
    this.addToCartBikeLight = page.locator("#add-to-cart-sauce-labs-bike-light");
    this.addToCartBoltTShirt = page.locator("#add-to-cart-sauce-labs-bolt-t-shirt");
    this.addToCartFleeceJacket = page.locator("#add-to-cart-sauce-labs-fleece-jacket");
    this.addToCartOnesie = page.locator("#add-to-cart-sauce-labs-onesie");
    this.addToCartRedTShirt = page.locator("#add-to-cart-test.allthethings()-t-shirt-(red)");
  }

  // פונקציה: אימות כותרת הדף
  async expectPageTitle(expectedTitle) {
    await expect(this.pageTitle).toHaveText(expectedTitle);
  }

  // פונקציה: הוספת מוצר לעגלה לפי שם
  async addProductToCart(productName) {
    switch (productName) {
      case "backpack":
        await this.addToCartBackpack.click();
        break;
      case "bike-light":
        await this.addToCartBikeLight.click();
        break;
      case "bolt-tshirt":
        await this.addToCartBoltTShirt.click();
        break;
      case "fleece-jacket":
        await this.addToCartFleeceJacket.click();
        break;
      case "onesie":
        await this.addToCartOnesie.click();
        break;
      case "red-tshirt":
        await this.addToCartRedTShirt.click();
        break;
      default:
        throw new Error(`Unknown product: ${productName}`);
    }
  }

  // פונקציה: אימות מספר הפריטים בעגלה (badge)
  async expectCartItemCount(expectedCount) {
    await expect(this.cartBadge).toHaveText(expectedCount);
  }

  // פונקציה: מעבר לעגלת הקניות
  async goToCart() {
    await this.cartLink.click();
  }
}