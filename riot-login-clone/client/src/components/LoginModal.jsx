import React from "react";
import ReactDom from "react-dom";

const LoginModal = (props) => {
   return ReactDom.createPortal(
      <div>
         <div className="overlay" onClick={() => props.setModalOpen(false)} />
         <div className="login-modal">
            <button
               className="modal-close-btn"
               onClick={() => props.setModalOpen(false)}
            ></button>
            <div className="login-modal-container">
               <div className="login-text">WELCOME TO SUMMONER'S RIFT</div>
            </div>
         </div>
      </div>,
      document.getElementById("portal")
   );
};

export default LoginModal;
