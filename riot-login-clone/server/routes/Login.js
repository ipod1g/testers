const express = require("express");
const router = express.Router();
const { Users } = require("../models");

const bcrypt = require("bcrypt");
const { createTokens, validateToken } = require("../JWT");

router.get("/", validateToken, (req, res) => {
   res.json("Login Success");
});

router.post("/", async (req, res) => {
   const { username, password } = req.body;

   const user = await Users.findOne({ where: { username: username } });

   if (!user) {
      return res.status(400).json({ error: "User Doesn't Exist" });
   }

   const dbPassword = user.password;
   bcrypt.compare(password, dbPassword).then((match) => {
      if (!match) {
         res.status(400).json({
            error: "Wrong Username and Password Combination!",
         });
      } else {
         const accessToken = createTokens(user);

         res.cookie("access-token", accessToken, {
            maxAge: 60 * 60 * 60, //(1hr)
            //to prevent other websites stealing this cookie
            httpOnly: true,
         });

         res.json("LOGGED IN");
      }
   });

   // if (password !== dbPassword) {
   //    res.status(400).json({
   //       error: "Wrong Username and Password Combination!",
   //    });
   // } else {
   //    res.json("LOGGED IN");
   // }
});

module.exports = router;
