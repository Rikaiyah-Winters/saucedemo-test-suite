import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../data/users';

test.describe("Login Page Test Suite", () => {
    let loginPage: LoginPage;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto()
    });

    test("001: Standard User can log in", async ({ page }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await expect(page).toHaveURL(/inventory.html/)
    });
    
    test("002: Locked out user sees error", async ({page}) => {
        await loginPage.login(users.lockedOut.username, users.lockedOut.password);
        await expect(loginPage.errorMessageContainer).toHaveText(/locked out/); 
        
    })

});