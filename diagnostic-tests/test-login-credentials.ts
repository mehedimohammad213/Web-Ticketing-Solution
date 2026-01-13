import { chromium } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

async function testLogin() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        console.log('Testing Freshworks login with provided credentials...\n');

        // Navigate to Freshworks
        console.log('1. Navigating to:', process.env.APP_URL);
        await page.goto(process.env.APP_URL!);
        await page.waitForLoadState('networkidle');

        // Take screenshot of login page
        await page.screenshot({ path: 'step1-login-page.png' });
        console.log('   ✓ Login page loaded\n');

        // Fill in credentials
        console.log('2. Filling in credentials...');
        console.log('   Email:', process.env.ADMIN_EMAIL);
        await page.locator('#username').fill(process.env.ADMIN_EMAIL!);
        await page.locator('#password').fill(process.env.ADMIN_PASSWORD!);
        console.log('   ✓ Credentials entered\n');

        // Take screenshot before submit
        await page.screenshot({ path: 'step2-credentials-filled.png' });

        // Click login button
        console.log('3. Clicking login button...');
        await page.locator('button[type="submit"]').click();

        // Wait for navigation or error
        await page.waitForTimeout(3000);
        await page.waitForLoadState('networkidle');

        // Take screenshot after login attempt
        await page.screenshot({ path: 'step3-after-login.png', fullPage: true });

        // Check current URL
        const currentUrl = page.url();
        console.log('   Current URL:', currentUrl);

        // Check for error messages
        const errorSelectors = [
            '.error-message',
            '.alert-danger',
            '[role="alert"]',
            '.notification-error',
            'div[class*="error"]',
            'div[class*="Error"]'
        ];

        let errorFound = false;
        for (const selector of errorSelectors) {
            const count = await page.locator(selector).count();
            if (count > 0) {
                const text = await page.locator(selector).first().textContent();
                console.log(`   ⚠️  Error found (${selector}):`, text);
                errorFound = true;
            }
        }

        if (!errorFound) {
            console.log('   ✓ No error messages found');
        }

        // Check if we're on a dashboard or logged in
        const title = await page.title();
        console.log('   Page title:', title);

        // Look for dashboard indicators
        const dashboardIndicators = [
            'h1',
            '[data-test-id*="dashboard"]',
            '.dashboard',
            'nav'
        ];

        console.log('\n4. Checking for dashboard elements...');
        for (const selector of dashboardIndicators) {
            const count = await page.locator(selector).count();
            if (count > 0) {
                const text = await page.locator(selector).first().textContent();
                console.log(`   Found ${selector}:`, text?.substring(0, 100));
            }
        }

        console.log('\n5. Waiting 10 seconds for inspection...');
        await page.waitForTimeout(10000);

        // Final determination
        if (currentUrl.includes('login')) {
            console.log('\n❌ LOGIN FAILED - Still on login page');
        } else if (currentUrl.includes('dashboard') || currentUrl.includes('home')) {
            console.log('\n✅ LOGIN SUCCESSFUL - Redirected to:', currentUrl);
        } else {
            console.log('\n⚠️  UNCERTAIN - On page:', currentUrl);
        }

    } catch (error) {
        console.error('\n❌ Error during test:', error);
    } finally {
        await browser.close();
    }
}

testLogin();
