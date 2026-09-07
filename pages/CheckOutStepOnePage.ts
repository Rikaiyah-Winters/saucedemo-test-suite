import { Page, Locator} from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckOutStepOnePage extends BasePage{
    readonly page: Page;
    readonly checkoutPageTitle: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.checkoutPageTitle = page.getByTestId("title");
        this.checkoutButton = page.getByTestId("checkout");
        this.continueShoppingButton = page.getByTestId("continue-shopping")
    }

    async removeItemFromCart(itemName: string) {
        await this.getItemCard(itemName).getByRole("button", {name: "Remove"}).click();
    }
};