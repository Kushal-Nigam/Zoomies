const User = require("../model/Users.js")
const Pet = require("../model/Pets.js")

const  updateUser =  async (req, res) => {
    const {firstName, lastName, email} = req.body;
    const Id = req.params.id;
    if (!firstName || !lastName || !email || !Id ) {
        return res.status(400).json({'message':' All fields are required.'})
    }

    try{
        const user = new User(firstName,lastName,email,null)
        await user.updateUser(Id)
        res.json({firstName : firstName, lastName: lastName, email:email})
    }catch(err){
        res.status(500).json({'message':err.message})
    }
}

const  deleteUser= async (req, res) => {
    const Id = req.params.id;
    if (!Id) return res.status(400).json({'message': 'Id missing.'})

    
    try{
        if(await Pet.deleteAllPets(Id)){
            console.log("User Deleted")
        }
        if(await User.deleteUser(Id)){
            console.log("User Deleted")
        }
        res.status(204).json({'success':`Pet deleted`}) 
    }catch(err){
        res.status(500).json({'message':err.message})
    }

}

module.exports = {
    updateUser,
    deleteUser
}