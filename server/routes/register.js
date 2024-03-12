const express = require("express");
const router = express.Router();
const resgisterController = require('../controller/registerController')

//Register a new User
router.post("/",resgisterController.handleNewUser);

module.exports = router;