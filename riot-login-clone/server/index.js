const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const loginRouter = require("./routes/Login");
app.use("/login", loginRouter);
const registerRouter = require("./routes/Register");
app.use("/register", registerRouter);

// run on 3001 if local
db.sequelize
   .sync()
   .then(() => {
      app.listen(process.env.PORT || 3001, () => {
         console.log("Running on port 3001");
      });
   })
   .catch((err) => {
      console.log(err);
   });
