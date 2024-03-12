const User = require("../model/Users.js")
const jwt = require('jsonwebtoken');
require('dotenv').config();
const moment = require("moment")

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401); //check if cookie exists and JWT property exists, send to login page if unauthorized
    const refreshToken = cookies.jwt;

    //check if the user has an active Refresh Token
    const foundUser = await User.findToken(refreshToken)
    if (!foundUser) return res.sendStatus(403); //Forbidden, user not Found
    const timeStamp = moment().utc().format('YYYY-MM-DD HH:mm:ss');
    if(foundUser.Valid_Until < timeStamp) return res.sendStatus(403);
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.username) return res.sendStatus(403); //Forbidden, tampered JWT token
            const accessToken = jwt.sign(
                { "username": decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5min' } //Access token expires in 5 mins
            );
            res.json({ accessToken })
        }
    );
}

module.exports = { handleRefreshToken }