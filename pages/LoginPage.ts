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
        this.errorMessageContainer = page.getByTestId("error");
        this.errorXButton = page.getByTestId("error-button");
    };

    async goto() {
        await this.page.goto("https://saucedemo.com");
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    /*async getErrorMessage(): Promise<string> {
        return (await this.errorMessageContainer.textContent()) ?? "";
    }*/
}