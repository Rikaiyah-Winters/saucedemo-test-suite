import { Page, Locator, expect } from "@playwright/test";

export class InventoryPage {
    readonly page: Page;
    readonly hamburgerMenu: Locator;
    readonly shoppingCartIconLink: Locator;
    readonly shoppingCartIconNumber: Locator;
    readonly filter: Locator;
    readonly addToCartButton: Locator;
    //readonly itemName: Locator;
    //readonly itemPhotoLink: Locator;



    constructor(page: Page) {
        this.page = page;
        this.hamburgerMenu = page.getByRole("button", { name: "OpenMenu" });
        this.shoppingCartIconLink = page.getByTestId('shopping-cart-link');
        this.shoppingCartIconNumber = page.getByTestId('shopping-cart-badge');
        this.filter = page.getByRole("listbox", { name: "Name (A to Z)" });
        this.addToCartButton = page.getByRole("button", { name: "Add to cart" });
        //this.itemName
        //this.itemPhotoLink
    }
}