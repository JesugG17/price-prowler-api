import { response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

export class AssetsController {
  static async getAsset(req, res = response) {
    const assetId = req.params.id;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.resolve(__dirname, '..', '..', 'images', assetId));
  }
}
