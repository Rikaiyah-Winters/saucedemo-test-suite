import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";

test.describe("Inventory Page Test Suite", () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.goto();
        await loginPage.standardUserLogin();
    });

    test("Url has '/inventory' in it", async ({ page }) => {
        await expect(page.url()).toContain("/inventory.html")
    })

    //has 6 items in enventory
    test("Inventory has 6 items", async ({page}) => {
        const inventoryItems = await page.getByTestId("inventory-item");
        await expect(inventoryItems).toHaveCount(6)
    });
})