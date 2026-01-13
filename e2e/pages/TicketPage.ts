import type { Page, Locator } from '@playwright/test';

export class TicketPage {
    readonly page: Page;
    readonly subjectInput: Locator;
    readonly descriptionInput: Locator;
    readonly prioritySelect: Locator;
    readonly categorySelect: Locator;
    readonly submitButton: Locator;
    readonly confirmationToast: Locator;
    readonly ticketIdDisplay: Locator;
    readonly statusTag: Locator;
    readonly priorityTag: Locator;
    readonly assigneeDisplay: Locator;

    constructor(page: Page) {
        this.page = page;
        this.subjectInput = page.locator('#subject');
        this.descriptionInput = page.locator('#description');
        this.prioritySelect = page.locator('#priority');
        this.categorySelect = page.locator('#category');
        this.submitButton = page.locator('button[type="submit"]');
        this.confirmationToast = page.locator('.confirmation-toast');
        this.ticketIdDisplay = page.locator('.ticket-id');
        this.statusTag = page.locator('.status-tag');
        this.priorityTag = page.locator('.priority-tag');
        this.assigneeDisplay = page.locator('.assignee-name');
    }

    async gotoCreate() {
        await this.page.goto('/tickets/new');
    }

    async createTicket(subject: string, description: string, priority: string, category: string) {
        await this.subjectInput.fill(subject);
        await this.descriptionInput.fill(description);
        await this.prioritySelect.selectOption(priority);
        await this.categorySelect.selectOption(category);
        await this.submitButton.click();
        await this.confirmationToast.waitFor();
    }

    async getTicketId() {
        return await this.ticketIdDisplay.innerText();
    }

    async verifyPriority(expectedPriority: string) {
        await this.priorityTag.waitFor();
        const text = await this.priorityTag.innerText();
        if (!text.includes(expectedPriority)) {
            throw new Error(`Expected priority ${expectedPriority} but found ${text}`);
        }
    }

    async verifyAssignee(expectedAssignee: string) {
        await this.assigneeDisplay.waitFor();
        const text = await this.assigneeDisplay.innerText();
        if (!text.includes(expectedAssignee)) {
            throw new Error(`Expected assignee ${expectedAssignee} but found ${text}`);
        }
    }
}
