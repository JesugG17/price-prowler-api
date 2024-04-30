import { response } from 'express';
import path from 'path';

export class AssetsController {
  static async getAsset(req, res = response) {
    const assetId = req.params.id;
    res.sendFile(path.resolve('../../images', assetId));
  }
}
