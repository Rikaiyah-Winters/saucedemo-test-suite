import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { users } from "../data/users";
import { CheckOutStepOnePage } from "../pages/CheckOutStepOnePage";

test.describe("Inventory Page Test Suite", () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let checkoutStepOnePage: CheckOutStepOnePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        checkoutStepOnePage = new CheckOutStepOnePage(page);
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
    test("Cart Icon leads to checkout page", async ({page}) => {
        await inventoryPage.shoppingCartIconLink.click()
        expect (checkoutStepOnePage.checkoutPageTitle).toHaveText("Your Cart");
        //expect (checkoutStepOnePage.getCartItemCard("Sauce Labs Onesie")).toBeVisible();
        expect (checkoutStepOnePage.checkoutButton).toBeVisible();
        expect (checkoutStepOnePage.continueShoppingButton).toBeVisible(); //see how these 3 can be morphed into one
    })

    //hamburger menu icon leads to proper menu
    test("Hamburger icon leads to proper, working menu", async ({page}) => {});

    //each item NAME and PHOTO leads to item details page
    test("Item name/header and photo leads to item details page", async ({page}) => {});
    
    //add to cart button increases cart bage 
    test("Adding an item to cart increases cart badge number", async ({page}) => {});



})