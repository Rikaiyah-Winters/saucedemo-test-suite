import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe("Suite", () => {
    let loginPage: LoginPage;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto()
    });

    test("001: Standard User can log in", async ({ page }) => {
        await loginPage.standardUserLogin();
    });
    
    test("002: Invalid user and/or password recieves error", async ({page}) => {
        //wrong user, right password
        await loginPage.invalidUsernameLogin();
    })
    
    test("003: Locked out user", async ({page}) => {});

    test("004: Performance Glitch User", async ({page}) => {});

    test("005: Error User", async ({page}) => {});

    test("006: Visual User", async ({page}) => {})
})
