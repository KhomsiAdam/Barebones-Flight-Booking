require('dotenv').config()

const mysql = require('mysql2');

const connect = mysql.createPool({
    dateStrings: true,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

module.exports = connect.promise();