import puppeteer from 'puppeteer';
import { getProductFromMercadoLibre } from '../utils/scrapping.js';

export class SearchController {
  static async getProductsFromWeb(req, res) {
    const productName = req.params.productName;

    const browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();
    await page.setJavaScriptEnabled(false);

    const result = await getProductFromMercadoLibre(page, productName);

    const response = result.slice(0, 10);

    await browser.close();
    res.json({ data: response });
  }
}
