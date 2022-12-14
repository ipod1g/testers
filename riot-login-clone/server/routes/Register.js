const express = require("express");
const router = express.Router();
const { Users } = require("../models");

const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
   res.json("Register page");
});

router.post("/", async (req, res) => {
   const { username, password } = req.body;

   const user = await Users.findOne({ where: { username: username } });

   if (!user) {
      bcrypt.hash(password, 10).then((hash) => {
         Users.create({
            username: username,
            password: hash,
         })
            .then(() => {
               res.json("USER REGISTERED");
            })
            .catch((err) => {
               if (err) {
                  res.status(400).json({ error: err });
               }
            });
      });
   } else {
      return res.status(400).json({ error: "Username already exists" });
   }
});

module.exports = router;
