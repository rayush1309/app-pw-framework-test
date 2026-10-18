
import {test, expect} from '../src/fixtures/pagefixtures';

test.beforeEach(async({loginPage, page}) =>{
    await loginPage.goToLoginPage();
    await page.waitForTimeout(2000);

});

test('login page title test', async({loginPage}) => {
    const pagetitle = await loginPage.getLoginPageTitle();
    console.log('login page title'   , pagetitle);
    expect(pagetitle).toBe('Account Login')

    
});

test('forgot pwd link exists test', async({loginPage}) => {
    expect(await loginPage.isforgotPasswordLinkExists()).toBeTruthy();
    
});

test('user is able to login app test', async({loginPage, homePage}) => {
    await loginPage.doLogin('pwtestbatch@open.com', 'pw123');
    //expect pending  
    let result = await homePage.isLogoutLinkExists() ;
    expect.soft(result).toBeTruthy();
    expect.soft(await homePage.getHomePageTitle()).toBe('My Account')
});
