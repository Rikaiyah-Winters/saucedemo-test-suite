import { Page, Locator, expect } from "@playwright/test";

export class CheckoutCompletePage {
    readonly page: Page;




    constructor(page: Page) {
        this.page = page;
    }
};