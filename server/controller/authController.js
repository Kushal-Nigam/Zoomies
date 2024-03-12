const User = require("../model/Users.js")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const moment = require("moment")

const handleLogin = async (req,res) =>{
    const {email, password} = req.body;
    if (!email || !password) return res.status(400).json({'message': 'Email Id or Password missing.'})

    
    const foundUser = await User.findUser(email);
    if (!foundUser) return res.sendStatus(401) //Unauthroized
    //evaluate password
    const match = await bcrypt.compare(password,foundUser.password)
    if(match){
        //create JWT auth tokens
        const accessToken = jwt.sign(
            { "username": foundUser.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '5mins' }//Acces Token expires in 5 minutes
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }//Refresh token expires in 1 day
        );
        // Saving refreshToken with current user and valid until timestamp
        const timeStamp = moment().add(1, 'days').utc().format('YYYY-MM-DD HH:mm:ss');
        if(!User.addToken(email,refreshToken,timeStamp)) return res.sendStatus(500)
        res.cookie('jwt', refreshToken, { httpOnly: false, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ 'accessToken':accessToken, firstName : foundUser.First_Name, lastName: foundUser.Last_Name, email:foundUser.email , Id: foundUser.id}); //Store in memory on front end
    } else {
        res.status(400).json({'Error':'Password doesn\'t match'}) 
    }
}

module.exports = {handleLogin}

