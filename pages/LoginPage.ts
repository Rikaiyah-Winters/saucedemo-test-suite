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
        this.usernameInput = page.getByTestId("username"); //not sure if .getByTestId works with data-test instead of data-testid
        this.passwordInput = page.getByTestId("password");
        this.loginButton = page.getByTestId("login-button");
        this.errorMessageContainer = page.getByTestId("error");
        this.errorXButton = page.getByTestId("error-button");
    };

    async goto() {
        await this.page.goto("saucedemo.com");
    }

    //standard user
    async standardUserLogin(username = "standard_user", password = "secret_sauce") {//not sure if that's best practice
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();

        await expect(this.page.url()).toContain("inventory.html")
    };
    
    //locked_out_user
    //problem_user
    //performance_glitch_user
    //error_user
    //visual_user

}