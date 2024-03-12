const Pet = require("../model/Pets.js")

const getAllPets = async (req, res) => {
    const userId = req.params.id;
    if (!userId) return res.status(400).json({'message': 'Id missing.'})
    res.json(await Pet.getAllPets(userId));
}

const  deletePet= async (req, res) => {
    const Id = req.params.id; 
    if (!Id) return res.status(400).json({'message': 'Id missing.'})

    
    try{
        if(await Pet.deletePet(Id)){
            console.log("Pet Deleted")
        }
        res.status(204).json({'success':`Pet deleted`}) 
    }catch(err){
        res.status(500).json({'message':err.message})
    }

}

const  createNewPet =  async (req, res) => {
    const {name, type, breed} = req.body;
    const userId = req.params.id;
    if (!name || !type || !breed || !userId) {
        return res.status(400).json({'message':' All fields are required.'})
    }

    try{
        const pet = new Pet(name,type,breed, null,userId)
        await pet.save()
        res.status(201).json({'success':`New pet ${name} created`}) 
    }catch(err){
        res.status(500).json({'message':err.message})
    }
}
const  updatePet =  async (req, res) => {
    const {name, type, breed} = req.body;
    const Id = req.params.id;
    if (!name || !type || !breed || !Id ) {
        return res.status(400).json({'message':' All fields are required.'})
    }

    try{
        const pet = new Pet(name,type,breed, null,null)
        await pet.updatePet(Id)
        res.status(200).json({'success':`Pet ${name} updated`}) 
    }catch(err){
        res.status(500).json({'message':err.message})
    }
}

module.exports = {
    getAllPets,
    createNewPet,
    updatePet,
    deletePet
}