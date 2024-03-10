import puppeteer from 'puppeteer';

export class SearchController {
  static async getProductsFromWeb(req, res) {
    const productName = req.params.productName;

    const browser = await puppeteer.launch({
      slowMo: 200,
    });

    // _OrderId_PRICE_NoIndex_True
    const page = await browser.newPage();

    await page.goto(`https://listado.mercadolibre.com.mx/${productName}_OrderId_PRICE_NoIndex_True`);

    const result = await page.evaluate(() => {
      const productItemsNodeList = document.querySelectorAll('.ui-search-result__wrapper');
      const productItem = [...productItemsNodeList].map((productItem) => {
        const productLink = productItem.querySelector('a').getAttribute('href');
        const productTitle = productItem.querySelector('h2').innerText;
        const productImageBase64 = productItem.querySelector('img').src;
        const productPrice = productItem.querySelector('.andes-money-amount__fraction').innerText;

        return {
          productLink,
          productTitle,
          productImageBase64,
          productPrice,
        };
      });

      return productItem;
    });

    const response = result.slice(0, 10);

    await browser.close();
    res.json({ data: response });
  }
}
