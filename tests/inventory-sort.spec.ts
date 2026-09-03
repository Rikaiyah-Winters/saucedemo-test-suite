import { test, expect } from "../fixtures/pom-fixtures";
import { users } from "../data/users";
import { inventoryItems } from "../data/inventory-items";

test.describe("Inventory Page Test Suite", () => {
    test.beforeEach(async ({ loginPage }) => {
        //perhaps consider grouping some of these tests under a "before all"
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);
        //popup isautomatically dismissed
    });

    test("Url has '/inventory' in it", async ({ page }) => {
        await expect(page).toHaveURL(/inventory.html/)
    })

    test("Inventory has 6 items", async ({ page }) => {
        const inventoryItems = page.getByTestId("inventory-item");
        await expect(inventoryItems).toHaveCount(6)
    });

    test("Cart Icon leads to checkout page", async ({ inventoryPage, checkoutStepOnePage }) => {
        await inventoryPage.shoppingCartIconLink.click()
        expect(checkoutStepOnePage.checkoutPageTitle).toHaveText("Your Cart");
        //expect (checkoutStepOnePage.getCartItemCard("Sauce Labs Onesie")).toBeVisible();
        expect(checkoutStepOnePage.checkoutButton).toBeVisible();
        expect(checkoutStepOnePage.continueShoppingButton).toBeVisible(); //see how these 3 can be morphed into one
    });

    test("Hamburger icon leads to proper, working menu", async ({ inventoryPage }) => {
        await inventoryPage.hamburgerMenu.click();
        //Clicking "All Items" shouldn't change the page
        //"About" leads you to a different page, saucelabs.com
        //"Logout" logs you out
        //perhaps these should all be seperate tests?

        //🚨🐞Found a bug! The "Reset App State" doesn't reset the "Add to Cart buttons". Just the cart badge
    });

    test("Item name/header leads to item details page", async ({ page, inventoryPage }) => {
        await page.getByRole("link", { name: inventoryItems.backpack.name }).click();
        //correct url
        //proper name
        //save checking for proper name, description, price, "Add to Cart" button, and "Back to products" button
    });

    test("Item photo leads to item details page", async ({ page }) => { });

    test("Adding an item to cart increases cart badge number", async ({ page }) => { });
});