import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage  extends BasePage {
    //Locator //every page will have own Locators (private):'
    //private locators
    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly forgottenPasswordLink: Locator;
    private readonly loginErrorMessage: Locator;
    // constructor of the class : initialize the locators
     constructor(page: Page){
        super(page);
        this.emailId =    page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password =   page.getByRole('textbox', { name: 'password' });
        this.loginBtn =   page.getByRole('button', { name: 'Login' });
        this.forgottenPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
        this.loginErrorMessage = page.locator('.alert.alert-danger.alert-dismissible');


     }

     //public page actions(method)/behaviour of the page
     async goToLoginPage() : Promise<void> { 
        await this.page.goto('opencart/index.php?route=account/login');
        await this.emailId.waitFor({ state: 'visible' });
     }

     async getLoginPageTitle() : Promise<String> {
        return await this.page.title();

     }

     async isforgotPasswordLinkExists() : Promise<boolean> {
        return await this.forgottenPasswordLink.isVisible();

     }

      async doLogin(username: string, password: string ) : Promise<void> {
       if (!username || !password) {
          throw new Error('Login requires a username and password. Check APPUSERNAME and PASSWORD configuration.');
       }
       await this.emailId.fill(username);
       await this.password.fill(password);
       await this.loginBtn.click();



     }
     async doSuccessfulLogin(username: string, password: string): Promise<void> {
        await this.doLogin(username, password);
        try {
            await expect(this.page).toHaveTitle('My Account');
        } catch (error) {
            if (await this.loginErrorMessage.isVisible()) {
                const message = (await this.loginErrorMessage.innerText()).trim();
                throw new Error(`Login failed: ${message}. Check APPUSERNAME and PASSWORD for the selected BASE_URL and GitHub environment.`);
            }
            throw error;
        }
     }

     async isInavalidLoginErrorMessageVisible() : Promise<boolean> {
        return await this.loginErrorMessage.isVisible();

     }

 



}
