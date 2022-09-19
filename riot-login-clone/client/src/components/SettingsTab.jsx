import React, { useState, useEffect } from "react";
import RiotLogo2 from "../assets/Riot Games RGB Logos (Web)/001_RG 2021 Logomark/001.2_RG_2021_LOGOMARK_BLACK_OFFWHITE_CONTAINER.png";
import LOL from "../assets/lol.png";
import Valorant from "../assets/valorant.png";
import windowSizeInfo from "./Dimensions";
import "./Settings.css";

// Needs work on making the buttons functional and triggering states

const SettingsTab = () => {
   const [settingsNow, setSettingsNow] = useState("client");
   const windowSizeArray = windowSizeInfo();
   const screenWidth = windowSizeArray[0];

   if (screenWidth < 680)
      return (
         <div
            style={{
               minHeight: "100px",
               color: "rgb(247 247 247 / 87%)",
               fontSize: "25px",
               fontFamily: "FF Mark, sans-serif",
               textTransform: "uppercase",
            }}
         >
            Settings
         </div>
      );

   return (
      <div className="settings-tab-container">
         <div>
            Settings
            <ul>
               <li>
                  <button
                     onClick={() => setSettingsNow("client")}
                     className={settingsNow === "client" ? "chosen" : "default"}
                  >
                     <img
                        src={RiotLogo2}
                        alt="Riot Logo 2"
                        width="18px"
                        style={{ verticalAlign: "middle" }}
                     />
                     &nbsp;&nbsp; Riot Client
                  </button>
               </li>
               <li>
                  <button
                     onClick={() => setSettingsNow("lol")}
                     className={settingsNow === "lol" ? "chosen" : "default"}
                  >
                     <img
                        src={LOL}
                        alt="LOL logo"
                        width="18px"
                        style={{ verticalAlign: "middle" }}
                     />
                     &nbsp;&nbsp; League of Legends
                  </button>
               </li>
               <li>
                  <button
                     onClick={() => setSettingsNow("val")}
                     className={settingsNow === "val" ? "chosen" : "default"}
                  >
                     <img
                        src={Valorant}
                        alt="LOL logo"
                        width="18px"
                        style={{ verticalAlign: "middle" }}
                     />
                     &nbsp;&nbsp; Valorant
                  </button>
               </li>
            </ul>
         </div>

         <div style={{ minWidth: "131px" }}>
            <ul className="bottom">
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
            <div className="version-bottom">V58.0.0.4640299</div>
         </div>
      </div>
   );
};

export default SettingsTab;
