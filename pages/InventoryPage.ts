import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";


export class InventoryPage extends BasePage {
    readonly page: Page;
    readonly hamburgerMenu: Locator;
    readonly shoppingCartIconLink: Locator;
    readonly shoppingCartBadgeNumber: Locator;
    readonly sort: Locator;
    readonly itemNames: Locator;
    readonly itemPrices: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.hamburgerMenu = page.getByRole("button", { name: "Open Menu" });
        this.shoppingCartIconLink = page.getByTestId('shopping-cart-link');
        this.shoppingCartBadgeNumber = page.getByTestId('shopping-cart-badge');
        this.sort = page.getByTestId('product-sort-container');
        this.itemNames = page.getByTestId("inventory-item-name");
        this.itemPrices = page.getByTestId("inventory-item-price");
    }

    async addItemToCart(itemName: string) {
        this.getItemCard(itemName).getByRole("button", { name: "Add to cart" }).click();
    }

    async navigateHamburgerMenu(menuItem: string) {
        await this.hamburgerMenu.click();
        await this.page.getByTestId(`${menuItem}-sidebar-link`).click();
    }

    async sortBy(option: string){
        await this.sort.selectOption(option);
    }

    async sortedItemNames(): Promise<string[]> {
        return this.itemNames.allTextContents()
    };

    async getItemPricesInOrder(): Promise<number[]> {
        const prices = await this.itemPrices.allTextContents();
        return prices.map((p) => parseFloat(p.replace("$", "")))
    }
}