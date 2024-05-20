import playwright from 'playwright';
import lodahs from 'lodash';
import { uploadAsset } from '../utils/uploadAsset.js';

export class SearchController {
  static async getProductsFromWeb(req, res) {
    const productName = req.params.productName;

    const browser = await playwright.chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
      viewport: { width: 1280, height: 720 },
    });

    const [page2] = await Promise.all([await context.newPage()]);
    await Promise.all([
      // await page1.goto(`https://www.amazon.com.mx/s?k=${productName}`, { waitUntil: 'domcontentloaded' }),
      await page2.goto(`https://listado.mercadolibre.com.mx/${productName}`),
    ]);

    const [productsMercadoLibre] = await Promise.all([
      // await page1.$$eval('.puis-card-container', (els) =>
      //   els.map((element) => {
      //     const productImage = element.querySelector('.s-image').src;
      //     const productNameTag = element.querySelector('h2');
      //     const productName = productNameTag.querySelector('span').innerText;
      //     const productPriceElement = element.querySelector('.a-price.whole');
      //     const productPrice = productPriceElement ? productPriceElement.innerText : 0;
      //     const productLink = element.querySelector('.a-link-normal').getAttribute('href');

      //     return {
      //       name: productName,
      //       link: `https://www.amazon.com.mx${productLink}`,
      //       img: productImage,
      //       price: productPrice,
      //       shop: 'Amazon',
      //     };
      //   })
      // ),
      await page2.$$eval('.ui-search-result__wrapper', (els) =>
        els.map((element) => {
          const productLink = element.querySelector('a').getAttribute('href');
          const productTitle = element.querySelector('h2');
          const productTitleText = productTitle ? productTitle.innerText : productName;
          const productImageBase64 = element.querySelector('img').src;
          const productPrice = element.querySelector('.andes-money-amount__fraction').innerText;

          return {
            link: productLink,
            name: productTitleText,
            img: productImageBase64,
            price: productPrice,
            shop: 'Mercado libre',
          };
        })
      ),
    ]);

    // const allItems = [...slicedAmazonProducts, ...sliceMercadoLibreProducts];
    const allItems = [...productsMercadoLibre];
    const newItems = await uploadAsset(allItems);
    // const shuffleAllItems = lodahs.shuffle(allItems);
    await browser.close();
    res.json({ data: newItems });
  }
}
