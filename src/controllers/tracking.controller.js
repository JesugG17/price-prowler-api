import { Tracks } from '../data/mongo/models/tracking.model.js';
import { Users } from '../data/mongo/models/users.model.js';
import { HTTP_CODE } from '../utils/http-codes.js';

export class TrackingController {
  static async addProduct(req, res) {
    const { link, currentPrice, img } = req.body;
    const userId = req.userId;

    const user = await Users.findById(userId);
    const track = await Tracks.findOne({ link });

    if (track) {
      return res.status(HTTP_CODE.BAD_REQUEST).json({
        message: 'Este producto ya ha sido agregado a la wishlist',
        ok: false,
      });
    }

    if (!user) {
      return res.status(HTTP_CODE.BAD_REQUEST).json({
        message: `El usuario con el id ${userId} no existe`,
        ok: false,
      });
    }

    const newTrackingProduct = {
      link,
      lastChecked: new Date(),
      currentPrice,
      img,
      user,
    };

    const trackingProductDb = new Tracks(newTrackingProduct);
    await trackingProductDb.save();

    const trackingProduct = {
      ...trackingProductDb._doc,
      id: trackingProductDb._id,
    };

    res.status(HTTP_CODE.CREATED).json({
      data: trackingProduct,
      ok: true,
      message: '¡Producto agregado a la wishlist de forma exitosa!',
    });
  }

  static async removeProduct(req, res) {
    const trackId = req.params.id;

    const track = await Tracks.findById(trackId);

    if (!track) {
      return res.status(HTTP_CODE.BAD_REQUEST).json({
        ok: false,
        message: `El producto con el id ${trackId} no existe en la wishlist`,
      });
    }

    await Tracks.deleteOne({ _id: trackId });

    res.json({
      message: '¡Producto removido de la wishlist exitosamente!',
      ok: true,
    });
  }

  static async getByUser(req, res) {
    const userId = req.userId;

    const tracks = await Tracks.find({
      user: userId,
    });

    const formattedTracks = tracks.map((track) => ({
      ...track._doc,
      id: track._id,
    }));

    res.json({
      data: formattedTracks,
      ok: true,
    });
  }
}
