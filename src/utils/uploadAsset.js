import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { v4 as uuid } from 'uuid';

export const uploadAsset = async (products = []) => {
  const productsWithoutImage = products.filter((product) => product.img.includes('base64'));
  const productsWithImage = products.filter((product) => !product.img.includes('base64'));

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const newProductsWithImage = productsWithoutImage.map((product) => {
    const uri = product.img.split(';base64,').pop();
    const img = new Buffer.from(uri, 'base64');
    const nameImage = `${uuid()}.png`;
    const imagePath = path.resolve(__dirname, '..', '..', 'images', nameImage);

    fs.writeFileSync(imagePath, img);

    return {
      ...product,
      img: `http://localhost:3002/api/assets/${nameImage}`,
    };
  });

  return [...productsWithImage, ...newProductsWithImage];
};
