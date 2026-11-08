import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductInfo extends BasePage {
    private readonly header: Locator;
    private readonly productImages: Locator;
    private readonly productMetaData: Locator;
    private readonly productPricing: Locator;
    private map: Map<string, string | Number>;
    constructor(page: Page) {
        super(page);
        this.header = page.getByRole('heading', { level: 1 });
        this.productImages = page.locator('div#content li img');
        this.productMetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.productPricing = page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        this.map =  new Map<string, string | Number>();
    }

    async getProductHeader(): Promise<string> {
        return await this.header.innerText();
    }

    async getProductImagesCount(): Promise<number> {
        return await this.productImages.count();
    }
/*
*
* @returns this method is returning a map of product information, which includes the product header, the number of product images, and the product metadata and pricing data. The map is populated by calling the getProductHeader(), getProductImagesCount(), getProductMetaData(), and getProductPricingData() methods, which retrieve the relevant information from the page using Playwright locators. The map is then returned to the caller.
*/
    async getProductInfo(): Promise<Map<string, string | Number>> {
        this.map.set('productheader', await this.getProductHeader());
        this.map.set('ProductImages', await this.getProductImagesCount());
        await this.getProductMetaData();
        await this.getProductPricingData();
        return this.map;
    }

    private async getProductMetaData() : Promise<void> {
        let metaData = await this.productMetaData.allInnerTexts();
        for (let data of metaData) {
            let meta = data.split(':');
            let metaKey = meta[0].trim();
            let metaVal = meta[1].trim();
            this.map.set(metaKey, metaVal);
        }
    }

    // $2,000.00
    // Ex Tax: $2,000.00
    private async getProductPricingData() : Promise<void> {
        let priceData = await this.productPricing.allInnerTexts();
        let productPrice = priceData[0].trim();
        let exTaxPrice = priceData[1].split(':')[1].trim();
        this.map.set('productPrice', productPrice);
        this.map.set('exTaxPrice', exTaxPrice);
    }
}
