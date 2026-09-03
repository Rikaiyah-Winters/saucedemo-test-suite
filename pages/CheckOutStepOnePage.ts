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

    getItemCard(itemName: string): Locator {
        return this.page.getByTestId("inventory-item").filter({hasText: itemName});
    }

    async remoteItemFromCart(itemName: string) {
        await this.getItemCard(itemName).getByRole("button", {name: "Remove"});
    }
};