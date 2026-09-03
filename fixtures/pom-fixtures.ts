import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CheckOutStepOnePage } from "../pages/CheckOutStepOnePage";


type PomFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    checkoutStepOnePage: CheckOutStepOnePage;
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
    }
});

export { expect }