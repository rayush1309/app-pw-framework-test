import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage  extends BasePage {
    //Locator //every page will have own Locators (private):'
    //private locators
    private readonly logoutLink: Locator;
    private readonly headers : Locator;
   
    // constructor of the class : initialize the locators
     constructor(page: Page){
        super(page);
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.headers = page.getByRole('heading',{level: 2});

     }

     //public page actions(method)/behaviour
     async getHomePageTitle() : Promise<String> {
        return await this.page.title();

     }

     async isLogoutLinkExists() : Promise<boolean> {
        return await this.logoutLink.isVisible();

     }

      async getHomePageHeaders () : Promise<string[]> {
        return await this.headers.allInnerTexts();
    
     }




}
