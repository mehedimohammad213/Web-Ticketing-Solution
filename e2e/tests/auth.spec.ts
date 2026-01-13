import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Authentication and RBAC', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('TC-01: Admin should login successfully', async ({ page }) => {
        await loginPage.login(process.env.ADMIN_EMAIL!, process.env.ADMIN_PASSWORD!);
        // Verify redirection to admin dashboard
        await expect(page).toHaveURL(/.*dashboard/);
        await expect(page.locator('h1')).toContainText('Admin Dashboard');
    });

    test('TC-04: Agent should be denied access to Admin settings', async ({ page }) => {
        await loginPage.login(process.env.AGENT_EMAIL!, process.env.AGENT_PASSWORD!);

        // Attempt to navigate directly to admin settings
        await page.goto('/settings/admin');

        // Verify 403 or Error message
        await expect(page.locator('.error-message')).toContainText('Access Denied');
    });

    test('Login failure with invalid credentials', async () => {
        await loginPage.login('invalid@user.com', 'wrongpassword');
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Invalid credentials');
    });
});
