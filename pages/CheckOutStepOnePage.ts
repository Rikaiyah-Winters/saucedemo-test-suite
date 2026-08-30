import { Page, Locator, expect } from "@playwright/test";

export class CheckOutStepOnePage {
    readonly page: Page;
    readonly checkoutPageTitle: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;




    constructor(page: Page) {
        this.page = page;
        this.checkoutPageTitle = page.getByTestId("title");
        this.checkoutButton = page.getByTestId("checkout");
        this.continueShoppingButton = page.getByTestId("continue-shopping")
    }

    getCartItemCard(itemName: string): Locator {
        return this.page.getByTestId("inventory-item").filter({hasText: itemName});
    }
};