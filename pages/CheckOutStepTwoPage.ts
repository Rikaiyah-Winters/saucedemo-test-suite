import { Page, Locator, expect } from "@playwright/test";

export class CheckOutStepTwoPage {
    readonly page: Page;




    constructor(page: Page) {
        this.page = page;
    }
};