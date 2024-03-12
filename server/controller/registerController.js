const User = require("../model/Users.js")
const bcrypt =  require("bcrypt")

const handleNewUser = async (req,res) =>{
    const {firstName, lastName, email, password, confirmPassword} = req.body;
    
    if (!firstName || !lastName || !email || !password || !confirmPassword) return res.status(400).json({'message':' All fields are required.'})
    //checking if confirmPassword matches password
    if(password !== confirmPassword) return res.status(400).json({'message':"Confirm Password doesn't match Password"})
    //checking for duplicate username in DB
    if(await User.checkDuplicate(email)) return res.sendStatus(409); //Conflict
    try{
        //encrpyting the password
        const hashedPassword = await bcrypt.hash(password,10)
        //storing new user
        const user = new User(firstName,lastName,email,hashedPassword)
        await user.save()
        res.status(201).json({'success':`New user ${firstName} created`})

    }catch(err){
        res.status(500).json({'message':err.message})
    }
}

module.exports = {handleNewUser}