const express = require("express");
const router = express.Router();
const dashboardController = require('../controller/dashboardController')

//Get all pets data
router.get("/:id", dashboardController.getAllPets)
//Add a new pet
router.post("/add/:id",dashboardController.createNewPet)
//Update an existing pet
router.put('/update/:id', dashboardController.updatePet)
//Delete a pet entry
router.delete('/delete/:id', dashboardController.deletePet)

module.exports = router;