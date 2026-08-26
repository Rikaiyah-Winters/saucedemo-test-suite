import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { users } from "../data/users";

test.describe("Inventory Page Test Suite", () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);
    });

    test("Url has '/inventory' in it", async ({ page }) => {
        await expect(page).toHaveURL(/inventory.html/)
    })

    //has 6 items in enventory
    test("Inventory has 6 items", async ({page}) => {
        const inventoryItems = page.getByTestId("inventory-item");
        await expect(inventoryItems).toHaveCount(6)
    });

    //cart icon leads to checkout page
    //hamburger menu icon leads to proper menu
    //each item NAME and PHOTO leads to item details page
    //add to cart button increases cart bage and adds item to checkout page

})