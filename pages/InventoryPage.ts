import { Page, Locator, expect } from "@playwright/test";

export class InventoryPage {
    readonly page: Page;
    readonly hamburgerMenu: Locator;
    readonly shoppingCartIconLink: Locator;
    readonly shoppingCartIconNumber: Locator;
    readonly filter: Locator;

    constructor(page: Page) {
        this.page = page;
        this.hamburgerMenu = page.getByRole("button", { name: "Open Menu" });
        this.shoppingCartIconLink = page.getByTestId('shopping-cart-link');
        this.shoppingCartIconNumber = page.getByTestId('shopping-cart-badge');
        this.filter = page.getByRole("combobox"); //🚨how is it combo box because of select? Difference between combobox and listbox??
    }

    getItemCard(itemName: string): Locator {
        return this.page.getByTestId("inventory-item").filter({hasText: itemName});
    }

    async addItemToCart(itemName: string) {
        await this.getItemCard(itemName).getByRole("button", {name: "Add to cart"});
    }
}