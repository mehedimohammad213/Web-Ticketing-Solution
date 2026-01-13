import { test, expect } from '@playwright/test';
import { TicketPage } from '@/pages/TicketPage';
import { LoginPage } from '@/pages/LoginPage';

test.describe('Ticket Lifecycle Management', () => {
    let ticketPage: TicketPage;

    test.beforeEach(async ({ page }) => {
        ticketPage = new TicketPage(page);
        await ticketPage.gotoCreate();
    });

    test('TC-05: Should validate mandatory fields on submission', async ({ page }) => {
        if (!process.env.APP_URL) {
            console.warn('Skipping TC-05: APP_URL not configured');
            return;
        }
        await page.click('button[type="submit"]');

        const subjectError = page.locator('#subject-error');
        const descError = page.locator('#description-error');

        await expect(subjectError).toBeVisible();
        await expect(subjectError).toContainText('Subject is required');
        await expect(descError).toBeVisible();
        await expect(descError).toContainText('Description is required');
    });

    test('TC-06: Should assign priority level "Critical" correctly', async ({ page }) => {
        // Refactored to use PO
        await ticketPage.createTicket('System Outage - Production', 'The entire system is down for all users.', 'Critical', 'Infrastructure');

        // Verify confirmation and priority tag
        await expect(ticketPage.confirmationToast).toContainText('Ticket Created');
        await ticketPage.verifyPriority('Critical');
    });

    test('Lifecycle: Customer creates ticket -> Agent replies -> Ticket Closed', async ({ page, browser }) => {
        // 1. Customer creates ticket
        await ticketPage.createTicket('Lifecycle Test', 'Testing full flow', 'Medium', 'General');
        const ticketId = await ticketPage.getTicketId();
        expect(ticketId).toBeTruthy();

        // 2. Agent Workflow (New Context/Page to simulate different user)
        // Ideally we use a new context for separate session
        const agentContext = await browser.newContext();
        const agentPage = await agentContext.newPage();
        const agentLogin = new LoginPage(agentPage);

        await agentLogin.goto();
        // Needed: AGENT_EMAIL in env
        if (process.env.AGENT_EMAIL && process.env.AGENT_PASSWORD) {
            await agentLogin.login(process.env.AGENT_EMAIL, process.env.AGENT_PASSWORD);
            await agentPage.goto(`/tickets/${ticketId}`);

            // Reply
            await agentPage.fill('#reply-box', 'We are looking into it.');
            await agentPage.click('button:has-text("Reply")');

            // Close
            await agentPage.click('button:has-text("Close Ticket")');
            await expect(agentPage.locator('.status-tag')).toHaveText('Closed');
        } else {
            console.warn('Skipping Agent part of Lifecycle test due to missing credentials');
        }

        await agentContext.close();

        // 3. Verify Customer sees closed
        await page.reload();
        await expect(ticketPage.statusTag).toHaveText('Closed');
    });
});
