import React, { useState } from "react";
import "./LoginForm.css";
import windowSizeInfo from "./Dimensions";

function LoginForm({ Login, error }) {
   const [details, setDetails] = useState({ name: "", password: "" });
   const [value, setValue] = useState("");
   const [isIdActive, setIdActive] = useState(false);
   const [isPwActive, setPwActive] = useState(false);

   const submitHandler = (e) => {
      e.preventDefault();
      Login(details);
   };

   const handleTextChange = (text) => {
      setValue(text);
      if (text !== "") {
         setIdActive(true);
      } else {
         setIdActive(false);
      }
   };

   const handlePasswordChange = (text) => {
      setValue(text);
      if (text !== "") {
         setPwActive(true);
      } else {
         setPwActive(false);
      }
   };

   const height = windowSizeInfo();

   return (
      <section className="form-main">
         <div className="form-outer">
            <img
               className="logo-main"
               src={require("../assets/002_RG_2021_FULL_LOCKUP_RED.png")}
               alt="Riot games logo"
            />
            <h2 className="sign-in">Sign in</h2>
            {error !== "" ? (
               <div className="error-shadow">
                  <span className="error-box">
                     <span className="error-msg">{error}</span>
                  </span>
               </div>
            ) : (
               ""
            )}
            <form
               id="main-form"
               onSubmit={submitHandler}
               className="form-inner"
            >
               <div className="form-group">
                  <input
                     type="text"
                     name="name"
                     id="name"
                     onChange={(e) => {
                        handleTextChange(e.target.value);
                        setDetails({ ...details, name: e.target.value });
                     }}
                     value={details.name}
                  />
                  <label className={isIdActive ? "Active" : ""} htmlFor="name">
                     Username
                  </label>
               </div>

               <div className="form-group">
                  <input
                     type="password"
                     name="password"
                     id="password"
                     onChange={(e) => {
                        handlePasswordChange(e.target.value);
                        setDetails({ ...details, password: e.target.value });
                     }}
                     value={details.password}
                  />
                  <label
                     className={isPwActive ? "Active" : ""}
                     htmlFor="password"
                  >
                     Password
                  </label>
               </div>
            </form>
            <ul className="login-routes">
               <button className="button-fb">
                  <img
                     className="fblogo"
                     src={require("../assets/fbicon.png")}
                     alt="fb login"
                  />
               </button>
               <button className="button-google">
                  <img
                     className="googlelogo"
                     src={require("../assets/googleicon.png")}
                     alt="google login"
                  />
               </button>
               <button className="button-apple">
                  <img
                     className="applelogo"
                     src={require("../assets/appleicon.png")}
                     alt="apple login"
                  />
               </button>
            </ul>
            <label className="stay-container">
               <input type="checkbox" value="stay" />
               Stay signed in
               <span className="checkmark"></span>
            </label>
         </div>
         <footer className="bottom-section">
            <div className="login-btn-container case1">
               <div className="login-btn-wrapper">
                  <input
                     form="main-form"
                     className="login-btn"
                     type="submit"
                     value="LOGIN"
                  />
               </div>
            </div>
            <div>
               <div>
                  <a href="https://recovery.riotgames.com/en?region=NA1">
                     can't sign in?
                  </a>
               </div>
               <div>
                  <a href="https://signup.leagueoflegends.com/en-gb/signup/index">
                     create account
                  </a>
               </div>
               <div className="version">V57.0.0</div>
            </div>
         </footer>
      </section>
   );
}

export default LoginForm;
