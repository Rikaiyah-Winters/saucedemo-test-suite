import { Page, Locator, expect } from "@playwright/test";

export class InventoryItemPage {
    readonly page: Page;



    
    constructor(page: Page) {
        this.page = page;
    }
};