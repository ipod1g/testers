import React, { useState, useEffect, useRef } from "react";
import "./LoginForm.css";
import SocialLoginButton from "./SocialLoginButton";

function LoginForm({ Login, errorMsg }) {
   const [details, setDetails] = useState({ name: "", password: "" });
   const [passwordShown, setPasswordShown] = useState(false);
   const [isError, setIsError] = useState(false);
   const [isPwFocused, setIsPwFocused] = useState(false);
   const passwordInputRef = useRef(null);
   const [isFirstRun, setIsFirstRun] = useState(true);

   const submitHandler = (e) => {
      e.preventDefault();
      Login(details);
      setIsError(true);
      setDetails((prev) => {
         const updatedDetails = { ...prev, password: "" };
         return updatedDetails;
      });
   };
   useEffect(() => {
      console.log(details.password && details.name);
   }, [details]);

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

   const isInputFilled = () => {
      if (details.name && details.password) {
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

   // useEffect(() => {
   //    // console.log("useEffect ran");
   //    isInputFilled();
   //    return;
   // }, [details]);

   useEffect(() => {
      if (isFirstRun) {
         setIsFirstRun(false);
      } else {
         passwordInputRef.current.focus();
      }
   }, [passwordShown]);

   const loginRoutes = () => {
      alert("Logined with link");
   };

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
               <div className="form-group">
                  <input
                     type="text"
                     name="name"
                     id="name"
                     onChange={(e) => {
                        setIsError(false);
                        setDetails((prev) => {
                           const updatedDetails = {
                              ...prev,
                              name: e.target.value,
                           };
                           return updatedDetails;
                        });
                        isInputFilled();
                        // console.log("E= " + error);
                        // console.log("ES= " + isError);
                     }}
                     value={details.name}
                  />
                  <label
                     className={details.name ? "Active" : ""}
                     htmlFor="name"
                  >
                     Username
                  </label>
               </div>

               <div className="form-group">
                  <input
                     type={passwordShown ? "text" : "password"}
                     name="password"
                     id="password"
                     onChange={(e) => {
                        setDetails((prev) => {
                           const updatedDetails = {
                              ...prev,
                              password: e.target.value,
                           };
                           return updatedDetails;
                        });
                        setIsError(false);
                        isInputFilled();
                     }}
                     onFocus={() => setIsPwFocused(true)}
                     onBlur={() => setIsPwFocused(false)}
                     ref={passwordInputRef}
                     value={details.password}
                  />
                  <label
                     className={details.password ? "Active" : ""}
                     htmlFor="password"
                  >
                     Password
                  </label>
               </div>

               <button
                  type="button"
                  className={
                     isPwFocused
                        ? passwordShown
                           ? "toggle-btn toggle-btn-show"
                           : "toggle-btn toggle-btn-hide"
                        : "invis-btn"
                  }
                  onClick={() => {
                     setPasswordShown(!passwordShown);
                  }}
                  onFocus={() => {
                     setIsPwFocused(true);
                  }}
                  onBlur={() => {
                     setIsPwFocused(false);
                  }}
                  tabIndex="-1"
               ></button>
            </form>

            <ul className="login-routes">
               {["fb", "google", "apple"].map((social) => (
                  <SocialLoginButton
                     key={social}
                     social={social}
                     loginRoutes={loginRoutes}
                  />
               ))}
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
                        details.name && details.password
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
