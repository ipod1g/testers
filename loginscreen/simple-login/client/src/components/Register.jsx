import React, { useState } from "react";
import Axios from "axios";

const Register = () => {
   const [usernameReg, setUsernameReg] = useState("");
   const [passwordReg, setPasswordReg] = useState("");

   const register = () => {
      Axios.post("https://localhost3001/register", {
         username: usernameReg,
         password: passwordReg,
      }).then((response) => {
         console.log(response);
      });
   };

   return <div>Register</div>;
};

export default Register;
