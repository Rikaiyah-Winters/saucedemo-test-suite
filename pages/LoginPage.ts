import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
    readonly page: Page;

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessageContainer: Locator;
    readonly errorXButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByRole("textbox", { name: "Username" });
        this.passwordInput = page.getByRole("textbox", { name: "Password" });
        this.loginButton = page.getByRole("button", { name: "Login" });
        this.errorMessageContainer = page.locator('[data-test="error"]'); //⚠️
        this.errorXButton = page.locator('[data-test="error-button"]'); //⚠️
    };

    async goto() {
        await this.page.goto("https://saucedemo.com");
    }

    //standard user
    async standardUserLogin() {
        await this.usernameInput.fill("standard_user");
        await this.passwordInput.fill("secret_sauce");
        await this.loginButton.click();
        expect(this.page.url()).toContain("inventory.html");
    };

    async invalidUsernameLogin() {
        await this.usernameInput.fill("wrong user");
        await this.passwordInput.fill("secret_sauce");
        await this.loginButton.click();
        await expect(this.errorMessageContainer).toBeVisible();
        await expect(this.errorMessageContainer).toHaveText("Epic sadface: Username and password do not match any user in this service")
    }

    //locked out user
    async lockedOutUserLogin() {
        await this.usernameInput.fill("locked_out_user");
        await this.passwordInput.fill("secret_sauce");
        await this.loginButton.click()
        await expect(this.errorMessageContainer).toBeVisible();
        await expect(this.errorMessageContainer).toHaveText("Epic sadface: Sorry, this user has been locked out.")
    }

    /*Saving for later
    async problemUserLogin() {};
    async performanceGlitchUserLogin() {};
    async errorUserLogin() {};
    async visual user() {};
    */
}