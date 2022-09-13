import React, { useState } from "react";
import RiotLogo2 from "../assets/Riot Games RGB Logos (Web)/001_RG 2021 Logomark/001.2_RG_2021_LOGOMARK_BLACK_OFFWHITE_CONTAINER.png";
import LOL from "../assets/lol.png";
import Valorant from "../assets/valorant.png";

// Needs work on making the buttons functional and triggering states

const TAB_STYLES = {
   boxSizing: "border-box",
   position: "fixed",
   top: 0,
   left: 0,
   padding: "60px 0 0 50px",
   width: "25%",
   height: "100%",
   zIndex: 1000,
   fontFamily: "FF Mark, sans-serif",
   textTransform: "uppercase",
   display: "flex",
   flexDirection: "column",
   justifyContent: "space-between",
};

const LIST_STYLES = {
   listStyleType: "none",
   fontSize: "13px",
   paddingTop: "30px",
   paddingLeft: "0",
};

const LIST_CHILD_STYLES = {
   padding: "4px 0px 4px 12px",
   width: "200px",
   margin: "10px 0 10px 0",
   opacity: "0.3",
   cursor: "pointer",

   "&:hover": {
      opacity: "0.8",
   },
};

const LIST_CHOSEN_STYLES = {
   padding: "10px 0 10px 12px",
   width: "200px",
   backgroundColor: "rgb(79 79 79 / 50%)",
   borderRadius: "6px",
   cursor: "pointer",
};

const LIST_STYLES_2 = {
   listStyleType: "none",
   fontSize: "11px",
   paddingTop: "30px",
   paddingLeft: "0",
};

const SettingsTab = () => {
   return (
      <div style={TAB_STYLES}>
         <label style={{ fontSize: "25px", color: "rgb(247 247 247 / 87%)" }}>
            Settings
            <ul style={LIST_STYLES}>
               <li style={LIST_CHOSEN_STYLES}>
                  <img
                     src={RiotLogo2}
                     alt="Riot Logo 2"
                     width="18px"
                     style={{ verticalAlign: "middle" }}
                  />
                  &nbsp;&nbsp; Riot Client
               </li>
               <li style={LIST_CHILD_STYLES}>
                  <img
                     src={LOL}
                     alt="LOL logo"
                     width="18px"
                     style={{ verticalAlign: "middle" }}
                  />
                  &nbsp;&nbsp; League of Legends
               </li>
               <li style={LIST_CHILD_STYLES}>
                  <img
                     src={Valorant}
                     alt="LOL logo"
                     width="18px"
                     style={{ verticalAlign: "middle" }}
                  />
                  &nbsp;&nbsp; Valorant
               </li>
            </ul>
         </label>

         <div style={{ minWidth: "131px" }}>
            <ul style={LIST_STYLES_2}>
               <li>
                  <a>Terms of Service</a>
               </li>
               <li>
                  <a>Third Party</a>
               </li>
               <li>
                  <a>Privacy Notice</a>
               </li>
            </ul>
            <div
               style={{
                  paddingBottom: "50px",
                  color: "rgb(255 255 255 / 15%)",
                  fontSize: "12px",
               }}
            >
               V58.0.0.4640299
            </div>
         </div>
      </div>
   );
};

export default SettingsTab;
