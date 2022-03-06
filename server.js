const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

//Server Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// //GET routes
// app.get("/", (req, res) => {
//     res.json({
//         message: "Hello World!"
//     });
// });

//Default route for incorrect addresses
app.use((req, res) => res.status(404).end());

//Server start
app.listen(PORT, () => console.log("Server running on port "+PORT));