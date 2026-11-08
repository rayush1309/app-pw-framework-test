import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage  extends BasePage {
    //Locator //every page will have own Locators (private):'
    //private locators
    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly forgottenPasswordLink: Locator;
    private readonly logo: Locator;
    private readonly loginErrorMessage: Locator;
    // constructor of the class : initialize the locators
     constructor(page: Page){
        super(page);
        this.emailId =    page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password =   page.getByRole('textbox', { name: 'password' });
        this.loginBtn =   page.getByRole('button', { name: 'Login' });
        this.forgottenPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
        this.logo = page.getByAltText('naveenopencart');
        this.loginErrorMessage = page.locator('.alert.alert-danger.alert-dismissible');


     }

     //public page actions(method)/behaviour of the page
     async goToLoginPage() : Promise<void> { 
        await this.page.goto('opencart/index.php?route=account/login');
        await this.page.waitForTimeout(2000);
     }

     async getLoginPageTitle() : Promise<String> {
        return await this.page.title();

     }

     async isforgotPasswordLinkExists() : Promise<boolean> {
        return await this.forgottenPasswordLink.isVisible();

     }

      async doLogin(username: string, password: string ) : Promise<void> {
       await this.emailId.fill(username);
       await this.password.fill(password);
       await this.loginBtn.click();



     }
     async isInavalidLoginErrorMessageVisible() : Promise<boolean> {
        return await this.loginErrorMessage.isVisible();

     }

 



}
