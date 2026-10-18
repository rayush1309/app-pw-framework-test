import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";
let loginPage: LoginPage;
let homePage: HomePage;


test.beforeEach(async({page}) =>{
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin('pwtestbatch@open.com', 'pw123');
    homePage = new HomePage(page);

})

test('home page title test', async() =>{
    const homePagetitle = await homePage.getHomePageTitle();
        console.log('Home  page title is: ', homePagetitle);
        expect(homePagetitle).toBe('My Account')

})

test('Logout Link exist test', async() =>{
    expect(await homePage.isLogoutLinkExists()).toBeTruthy();

})


test('Home page header exist test', async() =>{
   let  allHeaders= await homePage.getHomePageHeaders();
   console.log('home page headers is ', allHeaders);
   expect(allHeaders).toHaveLength(4);
   expect(allHeaders).toEqual([
    'My Account',
    'My Orders',
    'My Affiliate Account',
    'Newsletter'
   ])


})


