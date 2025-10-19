// tests/login.negative.spec.js
import { test, expect } from '@playwright/test';
import { urls } from '../data/urls.js';
import { users } from '../data/users.js';

async function doLogin(page, username, password) {
  await page.goto(urls.base);
  await page.getByPlaceholder(/username/i).fill(username);
  await page.getByPlaceholder(/password/i).fill(password);
  await page.getByRole('button', { name: /login/i }).click();
}

function errorBox(page) {
  // הקונטיינר של הודעת השגיאה בלוגין
  return page.locator('[data-test="error"]').or(page.locator('.error-message-container'));
}

test.describe('Login - Negative', () => {
  test('locked_out_user shows error', async ({ page }) => {
    await doLogin(page, users.negative.locked.username, users.negative.locked.password);
    // אימות הודעת שגיאה (טקסט יכול להשתנות, אז נבדוק בתבנית רגישה)
    await expect(errorBox(page)).toBeVisible();
    await expect(errorBox(page)).toContainText(/locked|ננעל|חסום|blocked/i);
  });

  const cases = [
    ['good user + wrong pw', users.negative.goodUserBadPw.username, users.negative.goodUserBadPw.password],
    ['bad user + good pw',   users.negative.badUserGoodPw.username, users.negative.badUserGoodPw.password],
    ['bad user + bad pw',    users.negative.badUserBadPw.username,  users.negative.badUserBadPw.password],
    ['empty user + good pw', users.negative.emptyUser.username,     users.negative.emptyUser.password],
    ['good user + empty pw', users.negative.emptyPw.username,       users.negative.emptyPw.password],
    ['empty user + empty pw',users.negative.emptyBoth.username,     users.negative.emptyBoth.password],
  ];

  for (const [name, un, pw] of cases) {
    test(`invalid creds error: ${name}`, async ({ page }) => {
      await doLogin(page, un, pw);
      await expect(errorBox(page)).toBeVisible();
      await expect(errorBox(page)).toContainText(/error|invalid|required|שגוי|שגיאה/i);
    });
  }
});
