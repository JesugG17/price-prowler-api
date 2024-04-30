import { uploadAsset } from './uploadAsset';

export const getProductFromMercadoLibre = async (page, productName) => {
  await page.goto(`https://listado.mercadolibre.com.mx/${productName}`);

  const result = await page.evaluate(() => {
    const productItemsNodeList = document.querySelectorAll('.ui-search-result__wrapper');
    const productItem = [...productItemsNodeList].map((productItem) => {
      const productLink = productItem.querySelector('a').getAttribute('href');
      const productTitle = productItem.querySelector('h2').innerText;
      const productImageBase64 = productItem.querySelector('img').src;
      const productPrice = productItem.querySelector('.andes-money-amount__fraction').innerText;

      return {
        link: productLink,
        name: productTitle,
        img: productImageBase64,
        price: productPrice,
        shop: 'Mercado libre',
      };
    });

    return productItem;
  });

  uploadAsset(result);

  return result;
};
