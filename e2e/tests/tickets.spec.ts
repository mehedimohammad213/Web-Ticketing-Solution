import { test, expect } from '@playwright/test';

test.describe('Ticket Lifecycle Management', () => {

    test.beforeEach(async ({ page }) => {
        // Navigate to ticket creation page and ensure session is active
        await page.goto('/tickets/new');
    });

    test('TC-05: Should validate mandatory fields on submission', async ({ page }) => {
        await page.click('button[type="submit"]');

        const subjectError = page.locator('#subject-error');
        const descError = page.locator('#description-error');

        await expect(subjectError).toBeVisible();
        await expect(subjectError).toContainText('Subject is required');
        await expect(descError).toBeVisible();
        await expect(descError).toContainText('Description is required');
    });

    test('TC-06: Should assign priority level "Critical" correctly', async ({ page }) => {
        await page.fill('#subject', 'System Outage - Production');
        await page.fill('#description', 'The entire system is down for all users.');
        await page.selectOption('#priority', 'Critical');
        await page.selectOption('#category', 'Infrastructure');

        await page.click('button[type="submit"]');

        // Verify confirmation and priority tag
        await expect(page.locator('.confirmation-toast')).toContainText('Ticket Created');
        await expect(page.locator('.priority-tag')).toContainText('Critical');
    });
});
