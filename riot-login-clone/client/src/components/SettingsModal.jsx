import React from "react";
import ReactDom from "react-dom";

const SettingsModal = ({ open, children, onClose }) => {
   if (!open) return null;

   return ReactDom.createPortal(
      <div>
         <div className="overlay" onClick={onClose} />
         <div className="modal">
            <button className="modal-close-btn" onClick={onClose}></button>
            <div className="modal-container">{children}</div>
         </div>
      </div>,
      document.getElementById("portal")
   );
};

export default SettingsModal;
