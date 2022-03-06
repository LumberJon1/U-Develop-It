const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

//Server Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Connect to database
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "#Handshake12117",
        database: "election"
    },
    console.log("Connected to the election database")
);

//GET routes...

//pull data for a single candidate
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if (err) {console.log(err)}
//     console.log(row);
// });

//Delete a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if (err) {console.log(err)}
//     console.log(result);
// })

// //Add a new candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//     VALUES (?, ?, ?, ?)`;

// //Sample params to use for query
// const params = [1, "Ronald", "Firbank", 1];

// db.query(sql, params, (err, result) => {
//     if (err) {console.log(err)}
//     console.log(result);
// });


// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });

//Default route for incorrect addresses
app.use((req, res) => res.status(404).end());

//Server start
app.listen(PORT, () => console.log("Server running on port "+PORT));