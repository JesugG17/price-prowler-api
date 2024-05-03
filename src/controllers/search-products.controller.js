import playwright from 'playwright';

export class SearchController {
  static async getProductsFromWeb(req, res) {
    const productName = req.params.productName;

    const browser = await playwright.chromium.launch({ headless: true });
    const context = await browser.newContext();

    const [page1, page2] = await Promise.all([await context.newPage(), await context.newPage()]);
    await Promise.all([
      await page1.goto(`https://www.amazon.com.mx/s?k=${productName}`),
      await page2.goto(`https://listado.mercadolibre.com.mx/${productName}`),
    ]);

    const [productsAmazon, productsMercadoLibre] = await Promise.all([
      await page1.$$eval('.puis-card-container', (els) =>
        els.map((element) => {
          const productImage = element.querySelector('.s-image').src;
          const productNameTag = element.querySelector('h2');
          const productName = productNameTag.querySelector('span').innerText;
          const productLink = element.querySelector('.a-link-normal').getAttribute('href');

          return {
            name: productName,
            link: `https://www.amazon.com.mx${productLink}`,
            img: productImage,
            price: 0,
            shop: 'Amazon',
          };
        })
      ),
      await page2.$$eval('.ui-search-result__wrapper', (els) =>
        els.map((element) => {
          const productLink = element.querySelector('a').getAttribute('href');
          const productTitle = element.querySelector('h2').innerText;
          const productImageBase64 = element.querySelector('img').src;
          const productPrice = element.querySelector('.andes-money-amount__fraction').innerText;

          return {
            link: productLink,
            name: productTitle,
            img: productImageBase64,
            price: productPrice,
            shop: 'Mercado libre',
          };
        })
      ),
    ]);

    const slicedAmazonProducts = productsAmazon.slice(0, 5);
    const sliceMercadoLibreProducts = productsMercadoLibre.slice(0, 5);
    const allItems = [...slicedAmazonProducts, ...sliceMercadoLibreProducts];

    await browser.close();
    res.json({ data: allItems });
  }
}
