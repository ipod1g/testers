import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import LoginModal from "./LoginModal";
import Axios from "axios";
import "./LoginSection.css";
import SocialLoginButton from "./SocialLoginButton";
import LoginForm from "./LoginForm";
import Loading from "./Loading";
import Version from "./Version";

function LoginSection() {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [passwordShown, setPasswordShown] = useState(false);
   const [isError, setIsError] = useState(false);
   const [errorMsg, setErrorMsg] = useState("");
   const [isPwFocused, setIsPwFocused] = useState(false);
   const idInputRef = useRef(null);
   const passwordInputRef = useRef(null);
   const [isFirstRun, setIsFirstRun] = useState(true);
   const [isLoading, setIsLoading] = useState(false);

   const [loginStatus, setLoginStatus] = useState("");
   const [loginModalShown, setLoginModalShown] = useState(false);

   const login = () => {
      Axios.post("https://riot-clone-login-api.herokuapp.com/login", {
         username: username,
         password: password,
      }).then(
         (response) => {
            setIsLoading(false);
            console.log(response);
            setIsError(false);
            setLoginModalShown(true);
         },
         (error) => {
            setIsLoading(false);
            console.log(error);
            setErrorMsg(
               "Your login credentials don't match an account in our system."
            );
            setIsError(true);
         }
      );
   };

   const submitHandler = (e) => {
      login();
      setIsLoading(true);
      e.preventDefault();
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
         setPassword("");
      }
   }, [isError]);

   const loginRoutes = ["fb", "google", "apple"];

   return (
      <>
         {isLoading ? (
            <Loading formType={"login"} />
         ) : (
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
                        <div className="toggle-wrapper">
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
                        </div>
                     </form>
                  </div>
                  <ul className="login-routes">
                     {loginRoutes.map((social) => (
                        <SocialLoginButton
                           key={social}
                           social={social}
                           setLoginModalShown={setLoginModalShown}
                        />
                     ))}
                  </ul>
                  <CSSTransition
                     in={loginModalShown}
                     timeout={800}
                     unmountOnExit
                     classNames="modal-anim"
                  >
                     <LoginModal
                        open={loginModalShown}
                        onClose={() => setLoginModalShown(false)}
                        setModalOpen={setLoginModalShown}
                        variant="primary"
                     ></LoginModal>
                  </CSSTransition>

                  <label className="stay-container" tabIndex={0}>
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
                           username && password
                              ? "login-btn--on"
                              : "login-btn--off"
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
                     <Version />
                  </nav>
               </footer>
            </section>
         )}
      </>
   );
}
export default LoginSection;
