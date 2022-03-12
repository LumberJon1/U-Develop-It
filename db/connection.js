const mysql = require("mysql2");

//Connect to database
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "#Handshake12117",
        database: "election"
    }
);

module.exports = db;