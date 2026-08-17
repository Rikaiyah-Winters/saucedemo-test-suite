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
    }
}