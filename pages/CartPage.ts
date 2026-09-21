import { Page, Locator} from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }
};