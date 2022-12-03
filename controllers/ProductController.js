const dotenv = require("dotenv");
dotenv.config();

const Product = require("../models/Products");

class ProductController {
    static async createProduct(req, res, next){
        const { nama_barang, kategori, deskripsi_barang, rating_total, total_favorite, foto_barang } = req.body;
        const newProduct = new Product({ nama_barang, kategori, deskripsi_barang, rating_total, total_favorite, foto_barang });
        try {
            await newProduct.save();
            res.status(200).json({message: "Berhasil menambahkan produk!"});
        } catch (error)  {
            error.status = 400;
            next(error);
        }
    };

    static async getAllProduct(req, res, next){
        try {
            const products = await Product.find();
            res.status(200).json({products});
        } catch (error) {
            error.status = 400;
            next(error);
        }
    }

    static async getProductByCategory(req, res, next){
        const { kategori } = req.params;
        try {
            const products = await Product.find({ kategori });
            res.status(200).json({products});
        } catch (error) {
            error.status = 400;
            next(error);
        }
    }

    static async searchProduct(req, res, next){
        const { search } = req.params;
        try {
            const products = await Product.find({ nama_barang: { $regex: search, $options: "i" } });
            res.status(200).json({products});
        } catch (error) {
            error.status = 400;
            next(error);
        }
    }

    static async getproductsByID(req, res, next){
        const { id } = req.params;
        try {
            const products = await Product.findById(id);
            res.status(200).json({products});
        } catch (error) {
            error.status = 400;
            next(error);
        }
    }
};

module.exports = ProductController;