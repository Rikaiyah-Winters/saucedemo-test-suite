import { Page, Locator} from "@playwright/test";

export class CheckOutStepTwoPage {
    readonly page: Page;
    readonly itemPrices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.itemPrices = page.getByTestId("inventory-item-price");

    }

    async strippedItemPrices(): Promise<number[]> {
        const prices = await this.itemPrices.allTextContents();
        return prices.map((p) => parseFloat(p.replace("$", "")))
    }
};