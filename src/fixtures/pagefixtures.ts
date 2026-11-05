import {test as baseTest} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
//define type for page fixtures
type pageFixtures ={
    loginPage: LoginPage,
    homePage: HomePage
};

//extend playwright base Test
export let test = baseTest.extend<pageFixtures>({
// creating fixtures for loginPage and homePage
//creating function inside the object and using use method to pass the instance of the page class to the test function
// meaning of use method is to pass the instance of the page class to the test function
// we need to thing, page in destructuring is coming from the base test, so we can use it to create the instance of the page class and use 
// call back function to pass the instance of the page class to the test function: use will return the metioned in bracket of call back function,
//  so we can use it to create the instance of the page class and use
    loginPage: async({page}, use)=>{
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage: async({page}, use)=>{
        let homePage = new HomePage(page);
        await use(homePage);
    },

});

export { expect } from '@playwright/test';


