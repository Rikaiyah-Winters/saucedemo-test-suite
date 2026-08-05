import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;
test.beforeEach(async({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.goto()
})

test("001: Standard User can log in", async ({page}) => {
    loginPage.standardUserLogin();
})

//Invalid user and/or password recieves error