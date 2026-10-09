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

    test("Checkout Shopping button works", async ({ page, itemDetailsPage }) => {
        await itemDetailsPage.checkoutButton.click();
        await expect(page).toHaveURL(/checkout-step-one/)
        await expect(page.getByTestId("title")).toHaveText("Checkout: Your Information")
    })

    test("Continue shopping button goes back to inventory page", async ({ page, itemDetailsPage }) => {
        await itemDetailsPage.continueShopping.click();
        await expect(page).toHaveURL(/inventory/);
        await expect(page.getByTestId("inventory-item")).toHaveCount(6)
    })

    //checkout step one
    //First Name, Last name, and postal code must be filled before user can continue

    test("First Name must be filled before user can continue", async ({ page }) => {
        await page.getByTestId("checkout").click()
        await page.getByPlaceholder("Last Name").fill("Doe");
        await page.getByPlaceholder("Zip/Postal Code").fill("90210");
        await page.getByTestId("continue").click();
        //refer to how the login page handled errors;
        await expect(page.getByTestId("error")).toHaveText(/First Name is required/);
    });
    //should probably make a loop to simplify these 3 tests
    test("Last Name must be filled before user can continue", async ({ page }) => {
        await page.getByTestId("checkout").click()
        await page.getByPlaceholder("First Name").fill("Jane");
        await page.getByPlaceholder("Zip/Postal Code").fill("90210");
        await page.getByTestId("continue").click();
        //refer to how the login page handled errors;
        await expect(page.getByTestId("error")).toHaveText(/Last Name is required/);
    });
    test("Zip Code must be filled before user can continue", async ({ page }) => {
        await page.getByTestId("checkout").click()
        await page.getByPlaceholder("First Name").fill("Jane");
        await page.getByPlaceholder("Last Name").fill("Doe");
        await page.getByTestId("continue").click();
        //refer to how the login page handled errors;
        await expect(page.getByTestId("error")).toHaveText(/Postal Code is required/);
    });

    test("Checkout Step One 'Continue' button works", async ({ page }) => {
        await page.getByTestId("checkout").click();
        await page.getByPlaceholder("First Name").fill("Jane");
        await page.getByPlaceholder("Last Name").fill("Doe");
        await page.getByPlaceholder("Zip/Postal Code").fill("90210");
        await page.getByTestId("continue").click();

        await expect(page).toHaveURL(/checkout-step-two/);
        await expect(page.getByTestId("title")).toHaveText("Checkout: Overview");
    })

    test("Checkout Step One 'Cancel' button works", async ({ page }) => {
        await page.getByTestId("checkout").click();
        await page.getByTestId("cancel").click();
        await expect(page).toHaveURL(/cart\.html/);
        await expect(page.getByTestId("title")).toHaveText("Your Cart");
    });

    //Checkout step two tests

    test("Overview has correct items", async ({ page, inventoryPage, checkoutStepTwoPage }) => {
        await page.getByTestId("continue-shopping").click();
        await page.getByTestId("inventory-item").filter({ hasText: inventoryItems.onesie.name }).getByRole("button", { name: "Add to cart" }).click();
        await inventoryPage.shoppingCartIconLink.click();
        await page.getByTestId("checkout").click();

        await page.getByPlaceholder("First Name").fill("Jane");
        await page.getByPlaceholder("Last Name").fill("Doe");
        await page.getByPlaceholder("Zip/Postal Code").fill("90210");
        await page.getByTestId("continue").click();
        await page.getByTestId("checkout");
        //they need to be in order. Try to figure out how they can be matched out of order. object?
        await expect(page.getByTestId("inventory-item-name")).toHaveText([inventoryItems.bikeLight.name, inventoryItems.onesie.name])//edit this to say like checkoutStep2.getitemcard("bikeLight")
        await expect(page.getByTestId("inventory-item")).toHaveCount(2);



        //total tests
        const cartPrices = checkoutStepTwoPage.strippedItemPrices();
        
        //somehow add the two cart prices and compare it to the Item total to the page
    });
    test("Item total, Tax, and Total are correct", async ({ page }) => {
        //capture the price from each item card and translate it into a number
        //add those numbers together and multiply by 0.08 to get grand total
    });
    test("Cancel button leads to inventory page", async ({ page }) => {
        //all the steps that lead to 2nd checkout page
        //click 'cancel' button
        //assure that url has 'inventory.html'
        //assure that title has 'Products'
    });
    test("Finish button leads to Checkout Complete page", async ({ page }) => { });
});