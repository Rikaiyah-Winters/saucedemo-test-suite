import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CheckOutStepOnePage } from "../pages/CheckOutStepOnePage";
import { ItemDetailsPage } from "../pages/ItemDetailsPage";
import { CartPage } from "../pages/CartPage";

type PomFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    checkoutStepOnePage: CheckOutStepOnePage;
    itemDetailsPage: ItemDetailsPage;
    cartPage: CartPage;
};

export const test = base.extend<PomFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },

    checkoutStepOnePage: async ({ page }, use) => {
        const checkoutStepOnePage = new CheckOutStepOnePage(page);
        await use(checkoutStepOnePage);
    },

    itemDetailsPage: async ({page}, use) => {
        const itemDetailsPage = new ItemDetailsPage(page);
        await use(itemDetailsPage);
    },

    cartPage: async ({page}, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage)
    }
});

export { expect }