import React, { useState, useRef, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
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
            if (response.data.message) {
               alert("Register SUCCESS!");
            } else {
               console.log(response.data);
            }
         },
         (error) => {
            console.log(error);
         }
      );
   };

   return (
      <article className="regform-container">
         <nav className="nav-back">
            <ul>
               <li>
                  <icon className="left-arrow"></icon>
                  <Link to="/">GO BACK</Link>
               </li>
            </ul>
         </nav>
         <section className="scene-content">
            <a
               href="https://www.leagueoflegends.com/en-gb/?_gl=1*1ssl8ty*_ga*MTExNzQ5MzYzNy4xNjYxNjg2NzQ2*_ga_FXBJE5DEDD*MTY2MzMwNTg4NS45LjEuMTY2MzMwNjg3Ny42MC4wLjA.&amp;_ga=2.252011597.574815907.1663179802-1117493637.1661686746"
               target="_blank"
            >
               <img
                  className="lol-logo-img"
                  src="https://signup.br.leagueoflegends.com/en-gb/assets/lol-logo.png"
                  alt="lol logo"
                  width="120px"
               />
            </a>
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
               <a href="https://www.riotgames.com" target="_blank">
                  <img
                     src={Riotlogofull}
                     width="100px"
                     style={{ verticalAlign: "middle" }}
                     alt="Riotlogofull"
                  />
               </a>
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
