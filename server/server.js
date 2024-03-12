const express = require("express");
const app = express();
const path = require("path");
const cors =  require("cors");
const corsOptions = require("./config/CorsConfig");
const verifyJWT = require("./middleware/verifyToken")
const cookieParser = require("cookie-parser")
const PORT = process.env.PORT || 8080;

app.use(cors(corsOptions));

//built-in middleware to handle form data. It extracts form data and sends to other routing methods
app.use(express.urlencoded({extended:false}))

//built-in middleware for JSON data
app.use(express.json())

//middleware for cookies
app.use(cookieParser())

//Handle all calls to /login
app.use('/login(.html)?', require('./routes/login'));
//Handle all calls to /register
app.use('/register(.html)?',require("./routes/register"))
//Handle all calls to /refresh
app.use('/refresh',require("./routes/refresh"))
//Handle all calls to /logout
app.use('/logout', require("./routes/logout"))

 
app.use(verifyJWT)//Any API calls below this will require to verify the JWT access token by sending it in request header
//Handle all calls to /dashboard 
app.use('/dashboard', require("./routes/dashboard"))
//Handle all calls to /user 
app.use('/user', require("./routes/user"))



app.listen(PORT, ()=>{
    console.log(`Listening at Port = ${PORT}`)
})
