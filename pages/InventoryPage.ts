import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";


export class InventoryPage extends BasePage {
    readonly page: Page;
    readonly hamburgerMenu: Locator;
    readonly shoppingCartIconLink: Locator;
    readonly shoppingCartBadgeNumber: Locator;
    readonly sort: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.hamburgerMenu = page.getByRole("button", { name: "Open Menu" });
        this.shoppingCartIconLink = page.getByTestId('shopping-cart-link');
        this.shoppingCartBadgeNumber = page.getByTestId('shopping-cart-badge');
        this.sort = page.getByRole("combobox");
    }

    async addItemToCart(itemName: string) {
        this.getItemCard(itemName).getByRole("button", { name: "Add to cart" }).click();
    }

    async navigateHamburgerMenu(menuItem: string) {
        await this.hamburgerMenu.click();
        await this.page.getByTestId(`${menuItem}-sidebar-link`).click();
    }
}