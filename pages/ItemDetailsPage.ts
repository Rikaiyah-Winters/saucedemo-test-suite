import { Page, Locator} from "@playwright/test";

export class ItemDetailsPage {
    readonly page: Page;
    readonly backToProductsButton: Locator;
    readonly itemName: Locator;
    readonly itemDescription: Locator;
    readonly itemPrice: Locator;
    readonly addToCart: Locator;

    constructor(page: Page) {
        this.page = page;
        this.backToProductsButton = page.getByRole("button", {name: "Back to products"});
        this.itemName = page.getByTestId("inventory-item-name");
        this.itemDescription = page.getByTestId("inventory-item-desc");
        this.itemPrice = page.getByTestId("inventory-item-price");
        this.addToCart = page.getByRole("button", {name: "Add to cart"}) //page.getByTestId("add-to-cart");
    }
};