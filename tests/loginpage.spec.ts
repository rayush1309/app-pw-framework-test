import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async({page}) =>{
    loginPage = new LoginPage(page);
    loginPage.goToLoginPage();
    await page.waitForTimeout(2000);
    homePage = new HomePage(page);

})

test('login page title test', async() => {
    const pagetitle = await loginPage.getLoginPageTitle();
    console.log('login page title'   , pagetitle);
    expect(pagetitle).toBe('Account Login')

    
})

test('forgot pwd link exists test', async() => {
    expect(await loginPage.isforgotPasswordLinkExists()).toBeTruthy();
    
})

test('user is able to login app test', async() => {
    await loginPage.doLogin('pwtestbatch@open.com', 'pw123');
    //expect pending  
    let result = await homePage.isLogoutLinkExists() ;
    expect.soft(result).toBeTruthy();
    expect.soft(await homePage.getHomePageTitle()).toBe('My Account')
})