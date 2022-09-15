import React, { useState, useRef, useEffect } from "react";
import Axios from "axios";
import RegForm from "./RegForm";
import "./Register.css";
import Divider from "../assets/reg/divider.png";
import PEGI from "../assets/reg/pegi.jpg";
import Riotlogofull from "../assets/Riot Games RGB Logos (Web)/002_RG 2021 Full Lockup/002_RG_2021_FULL_LOCKUP_OFFWHITE.png";

const Register = () => {
   const [usernameReg, setUsernameReg] = useState("");
   const [passwordReg, setPasswordReg] = useState("");
   const [passwordShown, setPasswordShown] = useState(false);
   const [isPwFocused, setIsPwFocused] = useState(false);
   const passwordInputRef = useRef(null);
   const [isFirstRun, setIsFirstRun] = useState(true);

   useEffect(() => {
      if (isFirstRun) {
         setIsFirstRun(false);
      } else {
         passwordInputRef.current.focus();
      }
   }, [passwordShown]);

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
      <article className="regform-container">
         <section className="scene-content">
            <header className="header-main">Register Now</header>
            <h3>Enter your info below</h3>
            <div className="divider">
               <img src={Divider} alt="divider gold" />
            </div>
            <div className="regform-innerwrap">
               <form
                  id="regform"
                  onSubmit={register}
                  className="regform-inner"
                  autoComplete="off"
               >
                  <RegForm
                     formType="usernameReg"
                     details={usernameReg}
                     setDetails={setUsernameReg}
                  />
                  <RegForm
                     formType="passwordReg"
                     details={passwordReg}
                     setDetails={setPasswordReg}
                     refInput={passwordInputRef}
                     pwShown={passwordShown}
                     setIsPwFocused={setIsPwFocused}
                  />
                  <div className="reg-toggle-wrapper">
                     <button
                        type="button"
                        className={
                           //    "toggle-btn toggle-btn-hide colorsvg-gold"
                           isPwFocused
                              ? passwordShown
                                 ? "toggle-btn toggle-btn-show colorsvg-gold "
                                 : "toggle-btn toggle-btn-hide colorsvg-gold"
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
                  <div className="reg-btn">
                     <button
                        onClick={(e) => {
                           register();
                           e.preventDefault();
                        }}
                     >
                        Register
                     </button>
                  </div>
               </form>
            </div>
            <footer>
               <img
                  src={Riotlogofull}
                  width="100px"
                  style={{ verticalAlign: "middle" }}
                  alt="Riotlogofull"
               />
               <img
                  src={PEGI}
                  height="50px"
                  style={{ verticalAlign: "middle" }}
                  alt="PEGI img"
               />
            </footer>
         </section>
      </article>
   );
};

export default Register;
