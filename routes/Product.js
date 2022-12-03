const express = require("express");
const router = express.Router();

const ProductController = require('../controllers/ProductController');

router.post("/add-product", ProductController.createProduct);
router.get("/get-all-product", ProductController.getAllProduct);
router.get("/get-product-by-category/:kategori", ProductController.getProductByCategory);
router.get("/search-product/:search", ProductController.searchProduct);
router.get("/get-product-by-id/:id", ProductController.getproductsByID);

module.exports = router;