// tests/login.positive.spec.js
import { test, expect } from '@playwright/test';
import { urls } from '../data/urls.js';
import { users } from '../data/users.js';

test.describe('Login - Positive', () => {
  for (const u of users.positive) {
    test(`successful login: ${u.name}`, async ({ page }) => {
      // כניסה לעמוד ההתחברות
      await page.goto(urls.base);

      // הזנת פרטי משתמש ולחיצה על Login
      await page.getByPlaceholder(/username/i).fill(u.username);
      await page.getByPlaceholder(/password/i).fill(u.password);
      await page.getByRole('button', { name: /login/i }).click();

      // אימות URL לאחר התחברות
      await expect(page).toHaveURL(urls.inventory);

      // אימות כותרת הדף לאחר התחברות
      await expect(page.locator('.title')).toHaveText('Products');
    });
  }
});
