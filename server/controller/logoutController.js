const User = require("../model/Users.js")


const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    //check if a JWT cookies exists
    if (!cookies?.jwt) return res.sendStatus(204); //No content, no cookie with JWT sent
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await User.findToken(refreshToken)
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204); 
    }

    // Delete refreshToken in db
    if(! await User.addToken(foundUser.email,null,null)) return res.sendStatus(500)

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true, maxAge: 0 });
    res.status(204).json({'success':`Logged Out`}) 
}

module.exports = { handleLogout }