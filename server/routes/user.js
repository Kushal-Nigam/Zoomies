const express = require("express");
const router = express.Router();
const userController = require('../controller/userController')

//Update an existing user
router.put('/update/:id', userController.updateUser)
//Delete the user entry
router.delete('/delete/:id', userController.deleteUser)

module.exports = router;