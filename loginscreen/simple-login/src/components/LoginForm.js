import React, { useState, useEffect, useRef } from "react";
import "./LoginForm.css";

function LoginForm({ Login, errorMsg, error }) {
   const [details, setDetails] = useState({ name: "", password: "" });
   const [value, setValue] = useState("");
   const [isIdActive, setIdActive] = useState(false);
   const [isPwActive, setPwActive] = useState(false);
   const [passwordShown, setPasswordShown] = useState(false);
   const [isError, setIsError] = useState(false);
   const [isIdFocused, setIsIdFocused] = useState(false);
   const [isPwFocused, setIsPwFocused] = useState(false);
   const inputRef = useRef(null);
   const [isFirstRun, setIsFirstRun] = useState(true);

   const submitHandler = (e) => {
      e.preventDefault();
      // console.log("submit handle fired");
      // console.log("ES= " + isError);
      Login(details);
      setIsError(true);
   };

   if (isError === true) {
      document.documentElement.style.setProperty(
         "--inputfield-color",
         "#efb7f36e"
      );
      document.documentElement.style.setProperty(
         "--inputfield-border-color",
         "#e3b4e3"
      );
      document.documentElement.style.setProperty("--border-width", "2px");
      document.documentElement.style.setProperty(
         "--inputfield-focus-color",
         "#efb7f36e"
      );
      document.documentElement.style.setProperty(
         "--inputfield-focus-border",
         "#e3b4e3"
      );
   } else {
      document.documentElement.style.setProperty(
         "--inputfield-color",
         "rgba(236, 236, 236, 0.612)"
      );
      document.documentElement.style.setProperty(
         "--inputfield-border-color",
         "transparent"
      );
      document.documentElement.style.setProperty("--border-width", "0px");
      document.documentElement.style.setProperty(
         "--inputfield-focus-color",
         "#fff"
      );
      document.documentElement.style.setProperty(
         "--inputfield-focus-border",
         "black"
      );
   }

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

   const togglePassword = () => {
      setPasswordShown(!passwordShown);
      // something to return back to input field
      // inputRef.current?.setSelectionRange(value.length, value.length);
   };

   const isInputFilled = () => {
      if (isIdActive === true && isPwActive === true) {
         document.documentElement.style.setProperty(
            "--border-color",
            "rgb(197 0 0)"
         );
         document.documentElement.style.setProperty(
            "--bg-color",
            "rgb(197 0 0)"
         );
         document.documentElement.style.setProperty("--arrow-color", "#fff");
         document.documentElement.style.setProperty("--btn-opacity", "0.9");
         document.documentElement.style.setProperty("--pointer-on", "all");
      } else {
         document.documentElement.style.setProperty(
            "--border-color",
            "#a3a3a3"
         );
         document.documentElement.style.setProperty(
            "--bg-color",
            "rgba(255, 255, 255, 0)"
         );
         document.documentElement.style.setProperty("--arrow-color", "#a3a3a3");
         document.documentElement.style.setProperty("--btn-opacity", "0.3");
         document.documentElement.style.setProperty("--pointer-on", "none");
      }
   };

   useEffect(() => {
      // console.log("useEffect ran");
      isInputFilled();
      return;
   }, [value]);

   useEffect(() => {
      if (isFirstRun === true) {
         setIsFirstRun(false);
         return;
      } else {
         console.log("Password state changed");
         inputRef.current.focus();
      }
      return;
   }, [passwordShown]);

   return (
      <section className="form-main">
         <div className="form-outer">
            <img
               className="logo-main"
               src={require("../assets/002_RG_2021_FULL_LOCKUP_RED.png")}
               alt="Riot games logo"
            />
            <h2 className="sign-in">Sign in</h2>
            {isError !== false ? (
               <div className="error-shadow">
                  <span className="error-box">
                     <span className="error-msg">{errorMsg}</span>
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
               <div
                  className={
                     isIdFocused ? "form-group form-group-focus" : "form-group"
                  }
               >
                  <input
                     type="text"
                     name="name"
                     id="name"
                     onChange={(e) => {
                        handleTextChange(e.target.value);
                        setDetails({ ...details, name: e.target.value });
                        setIsError(false);
                        // isInputFilled();
                        // console.log("E= " + error);
                        // console.log("ES= " + isError);
                     }}
                     onFocus={() => setIsIdFocused(true)}
                     onBlur={() => setIsIdFocused(false)}
                     value={details.name}
                  />
                  <label className={isIdActive ? "Active" : ""} htmlFor="name">
                     Username
                  </label>
               </div>

               <div
                  className={
                     isPwFocused ? "form-group form-group-focus" : "form-group"
                  }
               >
                  <input
                     type={passwordShown ? "text" : "password"}
                     name="password"
                     id="password"
                     onChange={(e) => {
                        handlePasswordChange(e.target.value);
                        setDetails({ ...details, password: e.target.value });
                        setIsError(false);
                        // isInputFilled();
                     }}
                     onFocus={() => setIsPwFocused(true)}
                     onBlur={() => setIsPwFocused(false)}
                     ref={inputRef}
                     value={isError === true ? "" : details.password}
                  />
                  <label
                     className={isPwActive && isError !== true ? "Active" : ""}
                     htmlFor="password"
                  >
                     Password
                  </label>
               </div>
            </form>
            <button
               className={
                  isPwFocused
                     ? passwordShown
                        ? "toggle-btn toggle-btn-show"
                        : "toggle-btn toggle-btn-hide"
                     : "invis-btn"
               }
               onClick={togglePassword}
               onFocus={() => {
                  setIsPwFocused(true);
                  setPwActive(true);
               }}
               onBlur={() => {
                  setIsPwFocused(false);
                  // setPwActive(false);
               }}
            ></button>
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
                     className={
                        isIdActive && isPwActive
                           ? "login-btn-on"
                           : "login-btn-off"
                     }
                     type="submit"
                     value=" "
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
