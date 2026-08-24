import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe("Login Page Test Suite", () => {
    let loginPage: LoginPage;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto()
    });

    test("001: Standard User can log in", async ({ page }) => {
        await loginPage.standardUserLogin();
    });
    
    test("002: Invalid user and/or password recieves error", async ({page}) => {
        //wrong user and/or password; not for any established login credentials; should make more flexible to enter custom user and pass
        await loginPage.invalidUsernameLogin();
    })
    
    test("003: Locked out user", async ({page}) => {
        await loginPage.lockedOutUserLogin()
    });

})
