// tests/sanity.spec.js
import { test, expect } from '@playwright/test';
import { urls } from '../data/urls.js';
import { user_standard } from '../data/users.js';

test.describe('Sanity - Full purchase flow', () => {
  test('standard_user purchases 2 items end-to-end', async ({ page }) => {
    // --- התחברות עם user_standard ---
    await page.goto(urls.base);

    // מילוי טופס לוגין ולחיצה על Login
    await page.getByPlaceholder(/username/i).fill(user_standard.username);
    await page.getByPlaceholder(/password/i).fill(user_standard.password);
    await page.getByRole('button', { name: /login/i }).click();

    // --- אימות: URL לאחר התחברות ---
    await expect(page).toHaveURL(urls.inventory);

    // --- אימות כותרת הדף (Products) ---
    await expect(page.locator('.title')).toHaveText('Products');

    // --- הוספת 2 מוצרים לעגלה ---
    const addButtons = page.getByRole('button', { name: /^add to cart$/i });
    await addButtons.nth(0).click();
    await addButtons.nth(1).click();

    // --- אימות מונה העגלה = 2 ---
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('2');

    // --- מעבר לעגלת הקניות ---
    await page.locator('.shopping_cart_link').click();

    // --- אימותים בעגלת הקניות ---
    await expect(page).toHaveURL(urls.cart);
    await expect(page.locator('.title')).toHaveText('Your Cart');
    await expect(page.locator('.cart_item')).toHaveCount(2);

    // --- מעבר ל- One Step Checkout ---
    await page.getByRole('button', { name: /^checkout$/i }).click();

    // --- אימותים: Step One ---
    await expect(page).toHaveURL(urls.checkoutStepOne);
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');

    // מילוי הטופס ומעבר הלאה
    await page.getByPlaceholder(/first name/i).fill('Test');
    await page.getByPlaceholder(/last name/i).fill('User');
    await page.getByPlaceholder(/zip|postal code/i).fill('12345');
    await page.getByRole('button', { name: /^continue$/i }).click();

    // --- אימותים: Step Two ---
    await expect(page).toHaveURL(urls.checkoutStepTwo);
    await expect(page.locator('.title')).toHaveText('Checkout: Overview');

    // סיום רכישה
    await page.getByRole('button', { name: /^finish$/i }).click();

    // --- אימותים: עמוד הסיום ---
    await expect(page).toHaveURL(urls.checkoutComplete);
    await expect(page.locator('.title')).toHaveText('Checkout: Complete!');
    await expect(page.getByText(/thank you for your order!/i)).toBeVisible();
  });
});
