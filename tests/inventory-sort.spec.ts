import { test, expect } from "../fixtures/pom-fixtures";
import { users } from "../data/users";
import { inventoryItems } from "../data/inventory-items";

test.describe("Inventory Page Test Suite", () => {
    test.beforeEach(async ({ loginPage }) => {
        //perhaps consider grouping some of these tests (that don't require interactions) under a "before all" hook?
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);
    });

    test("Url has '/inventory' in it", async ({ page }) => {
        await expect(page).toHaveURL(/inventory.html/)
    })

    test("Inventory has 6 items", async ({ page }) => {
        const inventoryItems = page.getByTestId("inventory-item");
        await expect(inventoryItems).toHaveCount(6)
    });

    test("Cart Icon leads to (empty) checkout page", async ({ inventoryPage, checkoutStepOnePage }) => {
        await inventoryPage.shoppingCartIconLink.click()
        await expect(checkoutStepOnePage.checkoutPageTitle).toHaveText("Your Cart");
        await expect(checkoutStepOnePage.checkoutButton).toBeVisible();
        await expect(checkoutStepOnePage.continueShoppingButton).toBeVisible(); //see how these 3 can be morphed into one
    });

    test("Hamburger icon leads to proper, working menu", async ({ inventoryPage }) => {
        await inventoryPage.hamburgerMenu.click();
        //Clicking "All Items" shouldn't change the page
        //"About" leads you to a different page, saucelabs.com
        //"Logout" logs you out
        //perhaps these should all be seperate tests?
        //🚨🐞Found a bug! The "Reset App State" doesn't reset the "Add to Cart buttons". Just the cart badge
    });

    test("Item name/header leads to item details page - Backpack", async ({ page }) => {
        await page.getByTestId(`item-${inventoryItems.backpack.itemId}-title-link`).click();
        await expect(page).toHaveURL(new RegExp(`id=${inventoryItems.backpack.itemId}`));
        await expect(page.getByText(inventoryItems.backpack.name)).toBeVisible(); //perhaps add inventoryItemPage for this one?
        //save checking for proper name, description, price, "Add to Cart" button, and "Back to products" button for item description page
    });

    test("Item photo leads to item details page", async ({ page }) => {
        await page.getByRole("img", { name: "Sauce Labs Backpack" }).click();
        await expect(page).toHaveURL(new RegExp(`id=${inventoryItems.backpack.itemId}`));
        await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();
    });

    test("Adding an item to cart increases cart badge number", async ({ page, inventoryPage }) => {
        await expect(inventoryPage.shoppingCartBadgeNumber).not.toBeVisible();
        await inventoryPage.addItemToCart(inventoryItems.redShirt.name);
        await expect(inventoryPage.shoppingCartBadgeNumber).toHaveText("1");
        await inventoryPage.addItemToCart(inventoryItems.backpack.name);
        await expect(inventoryPage.shoppingCartBadgeNumber).toHaveText("2");
    });

    //SORT TESTS!!!
});