import React, { useState } from "react";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { CustomDropdownIndicator } from "./CustomDropdownIndicator";
import Select, { components } from "react-select";
import { CSSTransition } from "react-transition-group";
import SettingsModal from "./SettingsModal";
import SettingsTab from "./SettingsTab";
import "./Settings.css";
import RiotClientLabel from "./RiotClientLabel";

// ********* DROPDOWN STYLING *********

library.add(faCaretDown);
library.add(faCaretUp);

const LANG_TAB_Style = {
   menuList: (provided, state) => {
      return {
         maxHeight: "60%",
      };
   },

   control: (base, state) => ({
      ...base,
      background: state.isFocused ? "#fff" : "rgb(79 79 79 / 50%)",
      cursor: "pointer",
      color: state.isFocused ? "black" : "#fff",
      // Overwrittes the different states of border
      borderColor: "transparent",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      padding: "6px",
      paddingBottom: "12px",
      opacity: "0.9",

      "&:hover": {
         borderColor: "transparent",
         opacity: "1",
      },
   }),

   indicatorContainer: (styles) => ({
      ...styles,
      backgroundColor: "rgb(79 79 79 / 50%)",
      color: "#fff",
      // Removes weird border around container
      "&:hover": {
         borderColor: "transparent",
      },
   }),

   singleValue: (styles, state) => ({
      fontFamily: "MarkW05-NarrowMedium",
      fontSize: "15px",
   }),

   option: (base, state) => ({
      ...base,
      color: state.isSelected ? "red" : "black",
      fontWeight: "700",
      backgroundColor: "transparent",
      fontSize: "13px",
      cursor: "pointer",
      opacity: "0.6",
      "&:hover": {
         opacity: "0.9",
      },
      "&:active": {
         background: "transparent",
      },
   }),

   valueContainer: (base, styles) => ({
      ...base,
      display: "flex",
   }),

   indicatorSeparator: (styles) => {},

   menu: (base) => ({
      ...base,
      marginTop: "-3px",
      paddingLeft: "4px",
      borderRadius: "0",
      border: "none",
      boxShadow: "none",
   }),
};
// ********* DROPDOWN STYLING *********

// ******** LANGUAGE OPTIONS **********

const options = [
   { value: "en", label: "English" },
   { value: "ko", label: "한국어" },
   { value: "cn", label: "中文" },
];

// ******** LANGUAGE OPTIONS **********

const Settings = (props) => {
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

         <CSSTransition
            in={isModalOpen}
            timeout={800}
            unmountOnExit
            classNames="modal-anim"
         >
            <SettingsModal
               open={isModalOpen}
               onClose={() => setModalOpen(false)}
               setModalOpen={setModalOpen}
               variant="primary"
            >
               <SettingsTab />
               <div className="select-placement">
                  <RiotClientLabel />
                  <label className="select-label">RIOT CLIENT LANGUAGE</label>
                  <Select
                     // defaultMenuIsOpen
                     components={{
                        DropdownIndicator: CustomDropdownIndicator,
                     }}
                     defaultControlIsFocused
                     label="Single Select"
                     defaultValue={options[0]}
                     options={options}
                     styles={LANG_TAB_Style}
                     isSearchable={false}
                     blurInputOnSelect
                  />
               </div>
            </SettingsModal>
         </CSSTransition>
      </>
   );
};

export default Settings;
