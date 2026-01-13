import { chromium } from '@playwright/test';

async function testFreshworksLogin() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        console.log('Navigating to Freshworks...');
        await page.goto('https://ethertech-team.myfreshworks.com');

        // Wait for page to load
        await page.waitForLoadState('networkidle');

        console.log('Page loaded. Taking screenshot...');
        await page.screenshot({ path: 'freshworks-login-page.png', fullPage: true });

        // Try to find login form elements
        console.log('\nSearching for login form elements...');

        // Get page content
        const pageContent = await page.content();
        console.log('Page title:', await page.title());

        // Try common login selectors
        const selectors = [
            'input[type="email"]',
            'input[type="text"]',
            'input[name="email"]',
            'input[name="username"]',
            '#email',
            '#username',
            'input[type="password"]',
            '#password',
            'button[type="submit"]',
            'input[type="submit"]'
        ];

        for (const selector of selectors) {
            const count = await page.locator(selector).count();
            if (count > 0) {
                console.log(`✓ Found ${count} element(s) with selector: ${selector}`);
                const element = page.locator(selector).first();
                const attrs = await element.evaluate(el => ({
                    id: el.id,
                    name: el.getAttribute('name'),
                    placeholder: el.getAttribute('placeholder'),
                    type: el.getAttribute('type')
                }));
                console.log('  Attributes:', attrs);
            }
        }

        console.log('\nWaiting 5 seconds for you to inspect...');
        await page.waitForTimeout(5000);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
    }
}

testFreshworksLogin();
