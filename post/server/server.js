const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
   user: "root",
   host: "localhost",
   password: "dennisku10",
   database: "riotdb",
});

// MESSAGE ON SCREEN of server
app.get("/", (req, res) => {
   //    const sqlInsert =
   //       "INSERT INTO users (username, password) VALUES ('test1', 'testpw')";
   //    db.query(sqlInsert, (err, result) => {
   //       console.log("error", err);
   //       console.log("result", result);
   //    });
   res.send("You are connected");
});

app.post("/register", (req, res) => {
   const username = req.body.username;
   const password = req.body.password;

   db.query(
      "INSERT INTO users (username, password) VALUES (?,?)",
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
