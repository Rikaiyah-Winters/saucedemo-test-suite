import { test, expect } from "../fixtures/pom-fixtures";
import { users } from '../data/users';

test.describe("Login Page Test Suite", () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto()
    });

    test("001: Standard User can log in", async ({ page, loginPage }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await expect(page).toHaveURL(/inventory.html/)
    });
    
    test("002: Locked out user sees error", async ({loginPage}) => {
        await loginPage.login(users.lockedOut.username, users.lockedOut.password);
        await expect(loginPage.errorMessageContainer).toHaveText(/locked out/); 
        
    })
});