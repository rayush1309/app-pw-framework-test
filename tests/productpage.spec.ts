
import {test, expect} from '../src/fixtures/pagefixtures';

test.beforeEach(async({loginPage}) =>{
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APPUSERNAME!, process.env.PASSWORD!);

});


test('product info test', async({homePage, productInfoPage, searchResultsPage}) => {
    await homePage.doSearch('MacBook');
    await searchResultsPage.selectProduct('MacBook Pro');
    const productInfo = await productInfoPage.getProductInfo();
    const prodImagesCount = await productInfoPage.getProductImagesCount();
    expect(prodImagesCount).toBe(4);
    console.log('product information is: ', productInfo);
    expect(productInfo.get('productheader')).toBe('MacBook Pro');
    expect(productInfo.get('ProductImages')).toBe(4);
    expect(productInfo.get('Brand')).toBe('Apple');
    expect(productInfo.get('Product Code')).toBe('Product 18');
    expect(productInfo.get('Reward Points')).toBe('800');
    expect(productInfo.get('Availability')).toBe('Out Of Stock');
    expect(productInfo.get('productPrice')).toBe('$2,000.00');
    expect(productInfo.get('exTaxPrice')).toBe('$2,000.00');

});
    

