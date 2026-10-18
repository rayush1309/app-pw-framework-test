import {test, expect} from '../src/fixtures/pagefixtures';


test.beforeEach(async({loginPage}) =>{
    await loginPage.goToLoginPage();
    await loginPage.doLogin('pwtestbatch@open.com', 'pw123');


})

test('home page title test', async({homePage}) =>{
    const homePagetitle = await homePage.getHomePageTitle();
        console.log('Home  page title is: ', homePagetitle);
        expect(homePagetitle).toBe('My Account')

})

test('Logout Link exist test', async({homePage}) =>{
    expect(await homePage.isLogoutLinkExists()).toBeTruthy();

})


test('Home page header exist test', async({homePage}) =>{
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

/*
npm install --save-dev allure-playwright allure-commandline

reporter: [
  ['list'],
  ['html', { outputFolder: 'reports/html-report', open: 'never' }],
  ['allure-playwright', {
    resultsDir: 'allure-results',
    suiteTitle: true,
  }],
],

"scripts": {
  "test": "npx playwright test",
  "allure:generate": "npx allure generate allure-results --clean -o allure-report",
  "allure:open": "npx allure open allure-report",
  "allure:report": "npm run allure:generate && npm run allure:open"
}




*/


