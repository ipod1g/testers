import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./LoginSection.css";
import SocialLoginButton from "./SocialLoginButton";
import LoginForm from "./LoginForm";
import Axios from "axios";

function LoginSection({ Login, errorMsg }) {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [passwordShown, setPasswordShown] = useState(false);
   const [isError, setIsError] = useState(false);
   const [isPwFocused, setIsPwFocused] = useState(false);
   const idInputRef = useRef(null);
   const passwordInputRef = useRef(null);
   const [isFirstRun, setIsFirstRun] = useState(true);

   const login = () => {
      Axios.post("http://localhost:3001/login", {
         username: username,
         password: password,
      }).then(
         (response) => {
            console.log(response);
         },
         (error) => {
            console.log(error);
         }
      );
   };

   const submitHandler = (e) => {
      e.preventDefault();
      login();
      setIsError(true);
      // setDetails((prev) => {
      //    const updatedDetails = { ...prev, password: "" };
      //    return updatedDetails;
      // });
      // WILL NOW ACTUALLY CONNECT TO DB
   };

   useEffect(() => {
      if (isFirstRun) {
         setIsFirstRun(false);
      } else {
         passwordInputRef.current.focus();
      }
   }, [passwordShown]);

   useEffect(() => {
      if (isFirstRun) {
         setIsFirstRun(false);
      } else if (isError === true) {
         idInputRef.current.focus();
      }
   }, [isError]);

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
            <div className="form-innerwrap">
               <form
                  id="main-form"
                  onSubmit={submitHandler}
                  className="form-inner"
                  autoComplete="off"
               >
                  <LoginForm
                     formType="username"
                     details={username}
                     isError={isError}
                     setIsError={setIsError}
                     setDetails={setUsername}
                     refInput={idInputRef}
                  />

                  <LoginForm
                     formType="password"
                     details={password}
                     isError={isError}
                     setIsError={setIsError}
                     setDetails={setPassword}
                     refInput={passwordInputRef}
                     setIsPwFocused={setIsPwFocused}
                     pwShown={passwordShown}
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
                  <div className="toggle-wrapper">
                     <button
                        type="button"
                        className={
                           // "toggle-btn toggle-btn-show"
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
                  </div>
               </form>
            </div>
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
                     username && password ? "login-btn--on" : "login-btn--off"
                  }
               ></button>
            </div>

            <nav>
               <ul>
                  <li>
                     <Link to="/register">can't sign in?</Link>
                  </li>
               </ul>
               <ul>
                  <li>
                     <Link to="/register">create account</Link>
                  </li>
               </ul>
               <div className="version">V57.0.0</div>
            </nav>
         </footer>
      </section>
   );
}

export default LoginSection;
