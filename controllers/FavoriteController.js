const dotenv = require("dotenv");
dotenv.config();

const Favorite = require("../models/Favorite");

class FavoriteController {
    static async createFavorite(req, res, next){
        const { id_akun, id_barang } = req.body;
        const newFavorite = new Favorite({ id_akun, id_barang });
        try {
            await newFavorite.save();
            res.status(200).json({message: "Berhasil menambahkan produk ke favorit!"});
        } catch (error)  {
            error.status = 400;
            next(error);
        }
    };

    static async getAllFavorite(req, res, next){
        try {
            const favorites = await Favorite.find();
            res.status(200).json({favorites});
        } catch (error) {
            error.status = 400;
            next(error);
        }
    }

    static async getFavoriteByUser(req, res, next){
        const { id_akun } = req.params;
        try {
            const favorites = await Favorite.find({ id_akun });
            res.status(200).json({favorites});
        } catch (error) {
            error.status = 400;
            next(error);
        }
    }

}

module.exports = FavoriteController;