import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ItemDetailsPage extends BasePage {
    readonly page: Page;
    readonly backToProductsButton: Locator;
    readonly itemName: Locator;
    readonly itemDescription: Locator;
    readonly itemPrice: Locator;
    readonly addToCart: Locator;
    readonly checkoutButton: Locator;
    readonly continueShopping: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.backToProductsButton = page.getByRole("button", { name: "Back to products" });
        this.itemName = page.getByTestId("inventory-item-name");
        this.itemDescription = page.getByTestId("inventory-item-desc");
        this.itemPrice = page.getByTestId("inventory-item-price");
        this.addToCart = page.getByRole("button", { name: "Add to cart" }) //page.getByTestId("add-to-cart");
        this.checkoutButton = page.getByRole("button", {name: "Checkout"});
        this.continueShopping = page.getByRole("button", {name: "Continue Shopping"});
    }
};