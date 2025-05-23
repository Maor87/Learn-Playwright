import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';

let browser;
let context;
let page;

test.beforeAll(async () => {
    // launch browser before all test
    browser = await chromium.launch();
    console.log('Before all hook launched chromium browser');
});

test.beforeEach(async () => {
    // create context for browser
    context = await browser.newContext();
    // create new page
    page = await context.newPage();
    // navigate to page
    await page.goto('https://the-internet.herokuapp.com/');
    console.log('Before each hook launched new page');
    // pause execution
    await page.pause();
});

test.afterEach(async () => {
    // close page
    await page.close();
    await context.close();
    console.log('After each hook closed page');
});

test.afterAll(async () => {
    // close browser
    await browser.close();
    console.log('After all hook closed browser');
});

test('A/B Test Control', async () => {
    await page.click('text="A/B Testing"');
    const header = await page.textContent('h3');
    expect(header).toBe('A/B Test Control');
});

test('checkbox verification', async () => {
    await page.click('text="Checkboxes"');
    const checkbox = await page.isChecked('input[type="checkbox"]:first-child');
    expect(checkbox).toBe(false);
});

test.only('Geolocation setting in context and verification', async () => {
    context = await browser.newContext({
        permissions: ['geolocation'],
        geolocation: {
            latitude: 37.774929,
            longitude: -122.419416
        },
        viewport: {
            width: 1280,
            height: 720
        }
    })
    page = await context.newPage()
    await page.pause();
    console.log('Using cotext and page for test');
    await page.goto('https://the-internet.herokuapp.com/geolocation');
    await page.click('button');
    const lat = await page.textContent('#lat-value');
    const lng = await page.textContent('#long-value');
    expect(lat).toBe('37.774929');
    expect(lng).toBe('-122.419416');
})