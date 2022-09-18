const express = require("express");
const router = express.Router();
const { Users } = require("../models");

router.get("/", (req, res) => {
   res.json("Hello World");
});

router.post("/", async (req, res) => {
   const { username, password } = req.body;

   const user = await Users.findOne({ where: { username: username } });

   if (!user) {
      return res.status(400).json({ error: "User Doesn't Exist" });
   }

   const dbPassword = user.password;

   if (password !== dbPassword) {
      res.status(400).json({
         error: "Wrong Username and Password Combination!",
      });
   } else {
      res.json("LOGGED IN");
   }
});

module.exports = router;
