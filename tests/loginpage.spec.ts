import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async({page}) =>{
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
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
    await loginPage.doSuccessfulLogin(process.env.APPUSERNAME!, process.env.PASSWORD!);
    await expect.poll(() => homePage.getHomePageTitle()).toBe('My Account');
    await expect.poll(() => homePage.isLogoutLinkExists()).toBeTruthy();
})

