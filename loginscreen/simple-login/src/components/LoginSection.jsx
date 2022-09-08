import React, { useState, useEffect, useRef } from "react";
import "./LoginSection.css";
import SocialLoginButton from "./SocialLoginButton";
import LoginForm from "./LoginForm";

function LoginSection({ Login, errorMsg }) {
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
               <LoginForm
                  formType="name"
                  details={details.name}
                  isError={isError}
                  setIsError={setIsError}
                  setDetails={setDetails}
               />
               {/* <div className="form-group">
                  <input
                     className={isError ? "input--error" : "input"}
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
                     }}
                     value={details.name}
                  />
                  <label
                     className={details.name ? "Active" : ""}
                     htmlFor="name"
                  >
                     Username
                  </label>
               </div> */}

               <LoginForm
                  formType="password"
                  details={details.password}
                  isError={isError}
                  pwShown={passwordShown}
                  setIsError={setIsError}
                  setIsPwFocused={setIsPwFocused}
                  refInput={passwordInputRef}
                  setDetails={setDetails}
               />

               {/* <div className="form-group">
                  <input
                     className={isError ? "input--error" : "input"}
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
               </div> */}

               <button
                  type="button"
                  className={
                     isPwFocused
                        ? passwordShown
                           ? "toggle-btn toggle-btn-show "
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
               <button
                  form="main-form"
                  type="submit"
                  className={
                     details.name && details.password
                        ? "login-btn--on"
                        : "login-btn--off"
                  }
               ></button>
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

export default LoginSection;
