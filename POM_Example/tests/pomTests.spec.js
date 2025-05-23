import { test, expect } from '@playwright/test';
import PomManager from '../Pages/PomManager.js';

let pm;

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    pm = new PomManager(page);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('login with valid credentials', async () => {
    await pm.login.navigate();
    await pm.login.login('tomsmith', 'SuperSecretPassword!');
    await pm.secure.assertLoggedInMessage('You logged into a secure area!');

    // assert value directly in test
  const message = await pm.secure.getMessage();
  expect(message).toContain('You logged into a secure area!');
  });

  // Verify password is invalid
  test('login with invalid credentials', async () => {
    await pm.login.navigate();
    await pm.login.login('tomsmith', 'wrongpassword');
    await pm.secure.assertLoggedInMessage('Your password is invalid!');
    await pm.login.assertErrorMessage('Your password is invalid!');
  })

});

test.describe('Checkbox verification', () => {
  test.beforeEach(async ({ page }) => {
    pm = new PomManager(page);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Check and uncheck checkboxes', async () => {
    // veify it can go from unchecked to checked
    await pm.checkboxesPage.navigate();
    await pm.checkboxesPage.checkCheckbox(1);
    await pm.checkboxesPage.assertCheckbox(1, true);
    
    // verify it can go from checked to unchecked
    await pm.checkboxesPage.navigate();
    await pm.checkboxesPage.checkCheckbox(2)
    await pm.checkboxesPage.assertCheckbox(2, false);
  });
});

