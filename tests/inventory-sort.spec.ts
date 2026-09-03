import { test, expect } from "../fixtures/pom-fixtures";
import { users } from "../data/users";

test.describe("Inventory Page Test Suite", () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);
    });

    test("Url has '/inventory' in it", async ({ page }) => {
        await expect(page).toHaveURL(/inventory.html/)
    })

    test("Inventory has 6 items", async ({page}) => {
        const inventoryItems = page.getByTestId("inventory-item");
        await expect(inventoryItems).toHaveCount(6)
    });

    //cart icon leads to checkout page
    test("Cart Icon leads to checkout page", async ({inventoryPage, checkoutStepOnePage}) => {
        await inventoryPage.shoppingCartIconLink.click()
        expect (checkoutStepOnePage.checkoutPageTitle).toHaveText("Your Cart");
        //expect (checkoutStepOnePage.getCartItemCard("Sauce Labs Onesie")).toBeVisible();
        expect (checkoutStepOnePage.checkoutButton).toBeVisible();
        expect (checkoutStepOnePage.continueShoppingButton).toBeVisible(); //see how these 3 can be morphed into one
    });

    test("Hamburger icon leads to proper, working menu", async ({page}) => {});

    test("Item name/header leads to item details page", async ({page}) => {});

    test("Item photo leads to item details page", async ({page}) => {});
    
    test("Adding an item to cart increases cart badge number", async ({page}) => {});



})