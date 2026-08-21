import { Page, Locator, expect } from "@playwright/test";

export class InventoryPage {
    readonly page: Page;
    readonly hamburgerMenu: Locator;
    readonly shoppingCartIconLink: Locator;
    readonly shoppingCartIconNumber: Locator;
    readonly filter: Locator;
    //add types of filters
    //item name locator
    readonly itemName: Locator;
    //locator "Add to Cart" button
    readonly addToCartButton: Locator;
    //item photo locator
    readonly itemPhotoLink: Locator;



    constructor(page:Page){
        this.page = page;
        this.hamburgerMenu = page.getByRole("button", {name: "OpenMenu"});
        this.shoppingCartIconLink = page.locator('[data-test="shopping-cart-link"]'); //⚠️
        this.shoppingCartIconNumber = page.locator('[data-test="shopping-cart-badge"]'); //⚠️
        this.filter = page.getByText("Name (A to Z)"); //see if that works
        this.itemName = 
        this.addToCartButton = page.getByRole("button", {name: "Add to cart"});
        this.itemPhotoLink = page.getByRole("img", {description: "Sauce Labs Backpack"}); //placeholder
    }
}