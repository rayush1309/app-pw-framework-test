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


