import { test, expect } from "../fixtures/pom-fixtures";
import { inventoryItems } from "../data/inventory-items";
import { users } from "../data/users";

test.describe("Cart flow tests", () => {
    test.beforeEach(async ({ page, loginPage, inventoryPage }) => {
        //perhaps consider grouping some of these tests (that don't require interactions) under a "before all" hook?
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);
        //await inventoryPage.addItemToCart(inventoryItems.bikeLight.name); //adds bike light to cart; 🚨 Ask why that's not working
        await page.getByTestId("inventory-item").filter({ hasText: inventoryItems.bikeLight.name }).getByRole("button", { name: "Add to cart" }).click() //thiw works, try to figure out what's the disconnect
        await inventoryPage.shoppingCartIconLink.click(); //goes to cart page
    });

    test("Cart Item Card's name leads back to correct item detail page", async ({ page, cartPage }) => {
        await expect(cartPage.getItemCard(inventoryItems.bikeLight.name)).toBeVisible();
        await page.getByTestId(new RegExp(`item-${inventoryItems.bikeLight.itemId}-title-link`)).click();
        await expect(page).toHaveURL(new RegExp(`id=${inventoryItems.bikeLight.itemId}`));
        await expect(page.getByText(inventoryItems.bikeLight.name)).toBeVisible();
    });

    test("Remove button can remove item from cart", async ({ page, cartPage, inventoryPage }) => {
        await expect(cartPage.getItemCard(inventoryItems.bikeLight.name)).toBeVisible();
        await expect(inventoryPage.shoppingCartBadgeNumber).toHaveText("1");
        await page.getByRole("button", { name: "Remove" }).click();
        await expect(cartPage.getItemCard(inventoryItems.bikeLight.name)).not.toBeVisible();
        await expect(inventoryPage.shoppingCartBadgeNumber).not.toBeVisible();
    });

    test("Checkout Shopping button works", async ({page, itemDetailsPage}) => {
        await itemDetailsPage.checkoutButton.click();
        await expect(page).toHaveURL(/checkout-step-one/)
        await expect(page.getByTestId("title")).toHaveText("Checkout: Your Information")
    })

    test("Continue shopping button goes back to inventory page", async ({page, itemDetailsPage}) => {
        await itemDetailsPage.continueShopping.click();
        await expect(page).toHaveURL(/inventory/);
        await expect(page.getByTestId("inventory-item")).toHaveCount(6)
    })

    //checkout step one
    //First Name, Last name, and postal code must be filled before user can continue

    test("First Name must be filled before user can continue", async ({page}) => {});
});