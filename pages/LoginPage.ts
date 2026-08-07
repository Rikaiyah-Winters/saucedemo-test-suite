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
        this.errorMessageContainer = page.locator('[data-test="error"]');
        this.errorXButton = page.locator('[data-test="error-button"]');
    };

    async goto() {
        await this.page.goto("https://saucedemo.com");
    }

    //standard user
    async standardUserLogin() {//not sure if that's best practice
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
    }
}