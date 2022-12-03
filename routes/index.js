const express = require("express");

const UserRoutes = require("./User");
const ProductRoutes = require("./Product");
const FavoriteRoutes = require("./Favorite");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/ping", (res) => {
    const ready = {
        status: "Server is Ready"
    };

    res.status(200).send(ready);
})

router.use("/user", UserRoutes);
router.use("/product", ProductRoutes);
router.use("/favorite", auth, FavoriteRoutes);

module.exports = router