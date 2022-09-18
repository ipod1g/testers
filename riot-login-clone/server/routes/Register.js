const express = require("express");
const router = express.Router();
const { Users } = require("../models");

router.get("/", (req, res) => {
   res.json("Hello World");
});

router.post("/", async (req, res) => {
   const { username, password } = req.body;
   //    await Users.create(user);
   //    res.json(user);
   await Users.create({
      username: username,
      password: password,
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

module.exports = router;
