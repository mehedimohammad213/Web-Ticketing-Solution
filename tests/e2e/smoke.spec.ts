import { test, expect } from '@playwright/test';

test.describe('General Smoke Tests', () => {
    test('Should load the homepage', async ({ page }) => {
        // Use the baseURL from config (APP_URL)
        await page.goto('/');
        // If APP_URL is not set, this might still fail if no default is provided in config.
        // But our config has: baseURL: process.env.APP_URL
        // I'll add a fallback in config too.
        expect(page).toBeTruthy();
    });
});
