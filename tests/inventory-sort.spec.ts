import { test, expect } from "../fixtures/pom-fixtures";
import { users } from "../data/users";
import { inventoryItems } from "../data/inventory-items";
import { InventoryPage } from "../pages/InventoryPage";

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

    test("Item name/header leads to item details page - Backpack", async ({ page }) => {
        await page.getByTestId(`item-${inventoryItems.backpack.itemId}-title-link`).click();
        await expect(page).toHaveURL(new RegExp(`id=${inventoryItems.backpack.itemId}`));
        await expect(page.getByText(inventoryItems.backpack.name)).toBeVisible(); //perhaps add inventoryItemPage for this one?
        //save checking for proper name, description, price, "Add to Cart" button, and "Back to products" button for item description page
    });

    test("Item photo leads to item details page", async ({ page }) => {
        await page.getByRole("img", { name: "Sauce Labs Backpack" }).click(); //need to replace this with variable
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

    //hamburger menu tests
    //"All items should go to inventory page - on inventory page when clicked it shouldn't do anything -  on say, item description page, it should return to inventory page"
    //"About" leads to saucelabs.com
    //"Logout" leads to login page
    //"Reset app State" SHOULD reset app state, but this has a bug and only clears the cart badge; only after you refresh the page does the app reset

    test("Hamburger Menu: 'All Items' should direct to inventory page", async ({page, inventoryPage}) => {
        await page.getByTestId(`item-${inventoryItems.backpack.itemId}-title-link`).click();
        await inventoryPage.navigateHamburgerMenu("inventory");
        await expect(page).toHaveURL(/inventory\.html/);
    });

    test("Hamburger Menu: 'About' should lead to saucelabs.com", async ({page, inventoryPage}) => {
        await inventoryPage.navigateHamburgerMenu("about");
        await expect(page).toHaveURL(/saucelabs\.com/);
    });

    test("Hamburger Menu: 'Logout' should lead back to the login page", async ({page, inventoryPage}) => {
        await inventoryPage.navigateHamburgerMenu(("logout"));
        await expect(page).toHaveURL("https://www.saucedemo.com");
    });

    test("Hamburger Menu: 'Reset App State'", async ({page, inventoryPage}) => {
        await inventoryPage.addItemToCart(inventoryItems.redShirt.name);
        await inventoryPage.addItemToCart(inventoryItems.bikeLight.name);
        await expect(inventoryPage.shoppingCartBadgeNumber).toHaveText("2");
        await inventoryPage.navigateHamburgerMenu("reset");
        await expect(inventoryPage.shoppingCartBadgeNumber).not.toBeVisible();
    })

    test("Hamburger icon leads to proper, working menu", async ({ inventoryPage }) => {
        await inventoryPage.hamburgerMenu.click();
        //Clicking "All Items" shouldn't change the page
        //"About" leads you to a different page, saucelabs.com
        //"Logout" logs you out
        //perhaps these should all be seperate tests?
        //🚨🐞Found a bug! The "Reset App State" doesn't reset the "Add to Cart buttons". Just the cart badge
    });

    //SORT TESTS!!!
});