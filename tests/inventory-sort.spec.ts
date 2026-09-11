import { test, expect } from "../fixtures/pom-fixtures";
import { users } from "../data/users";
import { inventoryItems } from "../data/inventory-items";
import { InventoryPage } from "../pages/InventoryPage";

//perhaps group tests for: hamburger, cart, item details page, sorting

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

    test("Hamburger Menu: 'All Items' should direct to inventory page", async ({ page, inventoryPage }) => {
        await page.getByTestId(`item-${inventoryItems.backpack.itemId}-title-link`).click();
        await inventoryPage.navigateHamburgerMenu("inventory");
        await expect(page).toHaveURL(/inventory\.html/);
        //perhaps assert that it doesn't do anything when its already on the inventory page?
    });

    test("Hamburger Menu: 'About' should lead to saucelabs.com", async ({ page, inventoryPage }) => {
        await inventoryPage.navigateHamburgerMenu("about");
        await expect(page).toHaveURL(/saucelabs\.com/);
    });

    test("Hamburger Menu: 'Logout' should lead back to the login page", async ({ page, inventoryPage }) => {
        await inventoryPage.navigateHamburgerMenu(("logout"));
        await expect(page).toHaveURL("https://www.saucedemo.com");
    });

    test("Hamburger Menu: 'Reset App State'", async ({ page, inventoryPage }) => {
        await inventoryPage.addItemToCart(inventoryItems.redShirt.name);
        await inventoryPage.addItemToCart(inventoryItems.bikeLight.name);
        await expect(inventoryPage.shoppingCartBadgeNumber).toHaveText("2");
        await inventoryPage.navigateHamburgerMenu("reset");
        await expect(inventoryPage.shoppingCartBadgeNumber).not.toBeVisible();
        //keep in mind this link has a bug that only clears the cart badge; only after you refresh the page does the app reset
    });

    //sort tests
    //name a to z: good time to do a regexp?? to organize the names in alphabetical order. 
    //Focus on the inventory-item-name text, put into an array and check to see if they're in alphabetical order??
    test("sort a to z", async ({ inventoryPage }) => {
        //sorts items on BROWSER PAGE
        await inventoryPage.sortBy("az"); //why do i have to do await twice?
        //really good lesson in algorithms

        //Gets an array of the item names as they are on the page
        const actual = await inventoryPage.sortedItemNames();

        //further sorting the actual array into alphabetical order -- if its already then then nothing should change
        const expected = [...actual].sort((a, b) => a.localeCompare(b)); //🚨need to thuroughly understand a,b
        expect(actual).toEqual(expected);
    });

    test("sort z to a", async ({ inventoryPage }) => {
        await inventoryPage.sortBy("za");
        const actual = await inventoryPage.sortedItemNames()
        const expected = [...actual].sort((a, b) => b.localeCompare(a));
    });

    test("sort price high to low", async ({inventoryPage) => {})


    //name z to a: 
    //price low to high
    //price high to low
});