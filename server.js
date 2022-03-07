const express = require("express");
const mysql = require("mysql2");
const inputCheck = require("./utils/inputCheck");

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
app.get("/api/candidate/:id", (req, res) => {
    const sql = `SELECT * FROM candidates where id = ?`;
    const params = [req.params.id];
    
    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: "success",
            data: row
        });
    });
});

//Delete a candidate
app.delete("/api/candidate/:id", (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];
    
    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({error: res.message});
        }
        else if (!result.affectedRows) {
            res.json({
                message: `Candidate with ID ${req.params.id} was not found.`
            });
        }
        else {
            res.json({
                message: "deleted",
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});



//GET all candidates
app.get("/api/candidates", (req, res) => {
    const sql = `SELECT * FROM candidates`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: "success",
            data: rows
        });
    });
});


//POST routes...

//Create a candidate
app.post("/api/candidate", ({body}, res) => {
    const errors = inputCheck(body, "first_name", "last_name", "industry_connected");
    if (errors) {
        res.status(400).json({error: errors});
        return;
    }

    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
        VALUES (?, ?, ?)`;
    
    //Sample params to use for query
    const params = [body.first_name, body.last_name, body.industry_connected];
    
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: "success",
            data: body
        });
    });
});



//Default route for incorrect addresses
app.use((req, res) => res.status(404).end());

//Server start
app.listen(PORT, () => console.log("Server running on port "+PORT));