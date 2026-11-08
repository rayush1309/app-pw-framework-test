import {test as baseTest} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductInfo } from '../pages/ProductInfo';
import { CsvHelper } from '../utils/CsvHelper';
//define type for page fixtures
type pageFixtures ={
    loginPage: LoginPage,
    homePage: HomePage
    searchResultsPage: SearchResultsPage
    productInfoPage: ProductInfo
    testData: Record<string, string>[]
};

//extend playwright base Test
export let test = baseTest.extend<pageFixtures>({
// creating fixtures for loginPage and homePage
//creating function inside the object and using use method to pass the instance of the page class to the test function
// meaning of use method is to pass the instance of the page class to the test function
// we need to thing, page in destructuring is coming from the base test, so we can use it to create the instance of the page class and use 
// call back function to pass the instance of the page class to the test function: use will return the metioned in bracket of call back function,
//  so we can use it to create the instance of the page class and use
    loginPage: async ({ page }, use) => {

        const loginPage = new LoginPage(page);

        await use(loginPage);
    },

    homePage: async ({ page }, use) => {

        const homePage = new HomePage(page);

        await use(homePage);
    },

    searchResultsPage: async ({ page }, use) => {

        const searchResultsPage = new SearchResultsPage(page);

        await use(searchResultsPage);
    },

    productInfoPage: async ({ page }, use) => {

        const productInfoPage = new ProductInfo(page);

        await use(productInfoPage);
    },

    testData: async ({}, use) => {
        const testData = CsvHelper.readCsv('src/data/login.csv');
        if (testData.length === 0) {
            throw new Error('src/data/login.csv must contain at least one login data row.');
        }
        if (testData.some(row => !row.username || !row.password)) {
            throw new Error('Each row in src/data/login.csv must have username and password values.');
        }
        await use(testData);
    },
});

export { expect } from '@playwright/test';


