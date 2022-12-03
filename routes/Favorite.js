const express = require("express");
const router = express.Router();

const FavoriteController = require('../controllers/FavoriteController');

router.post("/add-favorite", FavoriteController.createFavorite);
router.get("/get-all-favorite", FavoriteController.getAllFavorite);
router.get("/get-favorite-by-user/:id_akun", FavoriteController.getFavoriteByUser);

module.exports = router;
