import "./App.css";
import React, { useState } from "react";
import Axios from "axios";

function App() {
   const [usernameReg, setUsernameReg] = useState("");
   const [passwordReg, setPasswordReg] = useState("");

   const register = () => {
      Axios.post("http://localhost:3001/register", {
         username: usernameReg,
         password: passwordReg,
      }).then(
         (response) => {
            console.log(response);
         },
         (error) => {
            console.log(error);
         }
      );
   };

   return (
      <div className="App">
         <input
            type="text"
            onChange={(e) => {
               setUsernameReg(e.target.value);
            }}
            placeholder="username"
            value={usernameReg}
         ></input>
         <input
            type="text"
            onChange={(e) => {
               setPasswordReg(e.target.value);
            }}
            placeholder="password"
            value={passwordReg}
         ></input>
         <button onClick={register}>Register</button>
      </div>
   );
}

export default App;
