import { Page, Locator } from "@playwright/test";

export class BasePage {
    constructor(protected readonly page: Page) { }

    getItemCard(itemName: string): Locator {
        return this.page.getByTestId("inventory-item").filter({ hasText: itemName });
    }
}