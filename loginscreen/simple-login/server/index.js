const express = require("express");
const mysql = require("mysql");

const app = express();

app.use(express.json());

const db = mysql.createConnection({
   user: "root",
   host: "localhost",
   password: "password",
   database: "riot_db",
});

// app.get("/", (req, res) => {
//    res.send("hello");
// });

app.post("/register", (req, res) => {
   db.query(
      "INSERT INTO user (username, password) VALUES (?,?)",
      [username, password],
      (err, result) => {
         console.log(err);
      }
   );
});

// run on 3001
app.listen(3001, () => {
   console.log("Running on port 3001");
});
