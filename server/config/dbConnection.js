const mysql = require("mysql2")
require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT,
    namedPlaceholders: true
})

module.exports = pool.promise()

