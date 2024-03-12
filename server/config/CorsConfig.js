const allowedOrigins = require('./allowedOrigins');
const corsOptions = {
    origin: (origin, callback) =>{
        if(allowedOrigins.indexOf(origin) !== (-1) || !origin){ //if the origin(URL) is in the whitelist or if origin doesn't exist
            callback(null, true) //callback(error, boolean)
        }else{
            callback(new Error('CORS error. NOT ALLOWED'));
        }
    },
    optionsSuccessStatus:200,
    credentials: true,
    exposedHeaders: ['set-cookie']
  
}

module.exports = corsOptions


