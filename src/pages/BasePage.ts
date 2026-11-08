import { Page, Locator } from "@playwright/test";

export class BasePage {

    protected readonly page: Page;

    // common locators across all pages
    protected readonly logo: Locator;
    protected readonly searchBox: Locator;
    protected readonly cartIcon: Locator;
    protected readonly footerLinks: Locator;
    protected readonly currency: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.getByAltText("naveenopencart");
        this.searchBox = page.getByPlaceholder("Search");
        this.cartIcon = page.locator("#cart");
        this.footerLinks = page.locator("footer a");
        this.currency = page.locator("#form-currency");
    }

    // common actions
    async isLogoVisible(): Promise<boolean> {
        return await this.logo.isVisible();
    }

    async searchProduct(productName: string): Promise<void> {
        await this.searchBox.fill(productName);
        await this.searchBox.press("Enter");
    }

    async clickCartIcon(): Promise<void> {
        await this.cartIcon.click();
    }

    async getFooterLinks(): Promise<string[]> {
        return await this.footerLinks.allTextContents();
    }

    async isCurrencyVisible(): Promise<boolean> {
        return await this.currency.isVisible();
    }

    // page level utilities
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async getCurrentURL(): Promise<string> {
        return this.page.url();
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState("networkidle");
    }

    async takeScreenshot(name: string): Promise<Buffer> {
        return await this.page.screenshot({
            path: `reports/screenshots/${name}.png`,
            fullPage: true,
        });
    }
}