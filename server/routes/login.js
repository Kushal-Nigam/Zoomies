const express = require("express");
const router = express.Router();
const authController = require('../controller/authController')

//Authentiate user login
router.post("/auth", authController.handleLogin)
module.exports = router;
