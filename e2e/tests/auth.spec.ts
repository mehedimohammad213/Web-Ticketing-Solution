import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Authentication and RBAC', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('TC-01: Admin should login successfully', async ({ page }) => {
        if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
            console.warn('Skipping TC-01: ADMIN credentials missing');
            return;
        }
        await loginPage.login(process.env.ADMIN_EMAIL!, process.env.ADMIN_PASSWORD!);
        // Verify redirection to admin dashboard
        await expect(page).toHaveURL(/.*dashboard/);
        await expect(page.locator('h1')).toContainText('Admin Dashboard');
    });

    test('TC-04: Agent should be denied access to Admin settings', async ({ page }) => {
        if (!process.env.AGENT_EMAIL || !process.env.AGENT_PASSWORD) {
            console.warn('Skipping TC-04: AGENT credentials missing');
            return;
        }
        await loginPage.login(process.env.AGENT_EMAIL!, process.env.AGENT_PASSWORD!);

        // Attempt to navigate directly to admin settings
        await page.goto('/settings/admin');

        // Check for error message or fallback to URL check
        const errorLocator = page.locator('.error-message');
        const errorCount = await errorLocator.count();
        if (errorCount > 0) {
            await expect(errorLocator).toContainText('Access Denied');
        } else {
            // Ensure we are not still on the admin settings page (e.g., redirected to 404 or home)
            await expect(page).not.toHaveURL(/.*\/settings\/admin/);
        }
    });

    test('Login failure with invalid credentials', async () => {
        if (!process.env.APP_URL) {
            console.warn('Skipping test: APP_URL not configured');
            return;
        }
        await loginPage.login('invalid@user.com', 'wrongpassword');
        // Wait for error message to appear
        await expect(loginPage.getErrorMessage()).toBeVisible();
        await expect(loginPage.getErrorMessage()).toContainText('Invalid credentials');
    });
});
