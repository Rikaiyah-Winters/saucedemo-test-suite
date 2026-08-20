import { Page, Locator, expect } from "@playwright/test";

export class CheckOutStepOnePage {
    readonly page: Page;




    constructor(page: Page) {
        this.page = page;
    }
};