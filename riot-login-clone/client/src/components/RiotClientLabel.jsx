import React from "react";
import RiotLogo1 from "../assets/Riot Games RGB Logos (Web)/001_RG 2021 Logomark/001.3_RG_2021_LOGOMARK_CIRCLE_OFFWHITE_RED_CONTAINER.png";

const LABEL_STYLES = {
   boxSizing: "border-box",
   padding: "0 0 20px 0",
   zIndex: 1000,
   fontFamily: "FF Mark, sans-serif",
   color: "#fff",
};

const RiotClientLabel = () => {
   return (
      <div style={LABEL_STYLES}>
         <span style={{ position: "relative", top: "5px" }}>
            <img src={RiotLogo1} alt="RiotLogo" width="30px" />
         </span>
         <span
            style={{
               paddingLeft: "20px",
               fontSize: "30px",
            }}
         >
            Riot Client
         </span>
      </div>
   );
};

export default RiotClientLabel;
