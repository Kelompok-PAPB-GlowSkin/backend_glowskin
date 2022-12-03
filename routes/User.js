
const express = require("express");
const router = express.Router();

const UserController = require('../controllers/UserController');

router.post("/add-user", UserController.createUser);
router.post("/login", UserController.loginUser);
router.get("/get-all-user", UserController.getAllUser);
router.put("/update-user/:id", UserController.editUser);
router.get("/get-user-by-email/:email", UserController.getUserByEmail);

module.exports = router;