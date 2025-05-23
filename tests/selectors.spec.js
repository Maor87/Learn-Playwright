import {test, expect} from '@playwright/test';

test('Learing Selectors', async ({page}) => {
    // Navigate to the webpage
    await page.goto('http://127.0.0.1:5500/ClickMe.html');
    // 1 Selector by ID
    await page.locator('#button').click();
    // 2 Selector by Class
    await page.locator('.button-style').click();
    // 3 By Tag & Class
    await page.locator('button.button-style').click();
    // 4 By Attribute & Value
    await page.locator('[data-action="increment"]').click();
    await page.locator('[id="button"]').click();
    await page.locator('[class="button-style"]').click();
    // 5 Partial attribute
    await page.locator('[role="button"]').click();
    // 6 By text content
    await page.locator('text=Click Me').click();
    // 7 Combined selectors for precision, Class & text
    await page.locator('.button-style:text("Click Me")').click();
    // 8 has-text
    await page.locator('button:has-text("Click Me")').click();
    // 9 Attribute & text combination
    await page.locator('[role="button"]:text("Click Me")').click();
    // 10 recommended Playwright Locators, getByText()
    await page.getByText('Click Me').click();
    // 11 recommended Playwright Locators, getByRole()
    await page.getByRole('button', { name: /Click Me/i }).click();
    // assert the counter from the number 0 to 13
    await expect(page.locator('#counter')).toContainText('13');
})