import React, { useState, useEffect } from "react";
import "./Settings.css";
import SettingsModal from "./SettingsModal";

const SettingsButton = (props) => {
   const [isModalOpen, setModalOpen] = useState(false);

   return (
      <>
         <button
            onClick={() => {
               setModalOpen(true);
               props.setIsNavOpen(false);
            }}
         >
            Settings
         </button>
         <SettingsModal open={isModalOpen} onClose={() => setModalOpen(false)}>
            MODAL?
         </SettingsModal>
      </>
   );
};

export default SettingsButton;
