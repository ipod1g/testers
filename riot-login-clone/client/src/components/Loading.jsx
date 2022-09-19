import React from "react";
import { Link } from "react-router-dom";
import "./Loading.css";

const Loading = (props) => {
   return (
      <>
         <section className={`form-${props.formType}`}>
            <div className={`spinner-container--${props.formType}`}>
               <div className={`loading-spinner--${props.formType}`}></div>
            </div>

            {props.formType !== "register" ? (
               <footer className="bottom-section">
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
            ) : (
               ""
            )}
         </section>
      </>
   );
};

export default Loading;
