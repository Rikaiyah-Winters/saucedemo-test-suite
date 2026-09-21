import { test, expect } from "../fixtures/pom-fixtures";
import { inventoryItems } from "../data/inventory-items";
import { users } from "../data/users";
/*Cart Page
-cart page item card's title/name leads back to correct item detail page
-remote button can remove item from cart
-"Continue shopping" button works
-"Checkout button works"
*/
test.describe("Cart flow tests", () => {
    test.beforeEach(async ({ loginPage, inventoryPage }) => {
        //perhaps consider grouping some of these tests (that don't require interactions) under a "before all" hook?
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.addItemToCart(inventoryItems.bikeLight.name); //adds bike light to cart
        await inventoryPage.shoppingCartIconLink.click(); //goes to cart page
    });

    test("Cart Item Card's name leads back to correct item detail page", async ({ page, cartPage }) => {
        await expect(cartPage.getItemCard(inventoryItems.bikeLight.name)).toBeVisible();
        await page.getByTestId(new RegExp(`item-${inventoryItems.bikeLight.itemId}-title-link`)).click();
        await expect(page).toHaveURL(new RegExp(`id=${inventoryItems.bikeLight.itemId}`));
        await expect(page.getByText(inventoryItems.bikeLight.name)).toBeVisible();
    });
});