
import {test, expect} from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';

test.beforeEach(async({loginPage}) =>{
    await loginPage.goToLoginPage();


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
    await loginPage.doSuccessfulLogin(process.env.APPUSERNAME!, process.env.PASSWORD!);
    await expect.poll(() => homePage.getHomePageTitle()).toBe('My Account');
    await expect.poll(() => homePage.isLogoutLinkExists()).toBeTruthy();
});

// One test runs all CSV rows sequentially using the testData fixture.
test('login to test with wrong credentials with data driven test', async ({loginPage, testData}) => {
    for (const row of testData) {
        await loginPage.doLogin(row.username, row.password);
        await expect.poll(() => loginPage.isInavalidLoginErrorMessageVisible()).toBeTruthy();
    }
});

// DD_2: Without the testData fixture; read CSV directly and create one test per row.
// These tests run in parallel because playwright.config.ts has fullyParallel: true.
const testData = CsvHelper.readCsv('src/data/login.csv');

for (const row of testData) {
    test(`invalid login test with - ${row.username} - row ${testData.indexOf(row) + 1}`, async ({loginPage}) => {
        await loginPage.doLogin(row.username, row.password);
        await expect.poll(() => loginPage.isInavalidLoginErrorMessageVisible()).toBeTruthy();
    });
}
