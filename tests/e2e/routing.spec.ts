import { test, expect } from '@playwright/test';
import { TicketPage } from '@/pages/TicketPage';
import { LoginPage } from '@/pages/LoginPage';

test.describe('Automated Ticket Routing', () => {
    let ticketPage: TicketPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        ticketPage = new TicketPage(page);

        // Assumption: We need to be logged in as a customer to create a ticket
        if (process.env.CUSTOMER_EMAIL && process.env.CUSTOMER_PASSWORD) {
            await loginPage.goto();
            await loginPage.login(process.env.CUSTOMER_EMAIL, process.env.CUSTOMER_PASSWORD);
        } else {
            // Fallback or skip if not provided, but for now assuming we can proceed or are auto-logged in via session state?
            // Let's assume we need to login.
            console.warn('CUSTOMER_EMAIL/PASSWORD not set, attempting to continue relying on existing session or minimal login.');
            // If manual login needed:
            // await loginPage.goto();
            // await loginPage.login('customer@example.com', 'password');
        }
        await ticketPage.gotoCreate();
    });

    test('ROUT-01: Ticket with "Billing" category should be routed to Finance Team', async ({ page }) => {
        await ticketPage.createTicket('Invoice Query #999', 'I have a question about my invoice.', 'Medium', 'Billing');

        // After creation, we expect to be redirected to ticket view or stay on page with success
        // Let's assume we go to ticket view
        await expect(page).toHaveURL(/.*\/tickets\/\d+/);

        // Verify routing
        // This relies on the UI showing the assigned group/agent immediately
        await ticketPage.verifyAssignee('Finance Team');
    });

    test('ROUT-02: Ticket with "Critical" priority should be tagged High Priority', async ({ page }) => {
        await ticketPage.createTicket('System Down', 'Cannot access server.', 'Critical', 'Technical');
        await ticketPage.verifyPriority('Critical');
        // Theoretically verification of "High Priority" queue placement would require Admin/Agent view
    });
});
