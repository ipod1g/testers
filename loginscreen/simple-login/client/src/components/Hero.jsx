//For settings and account icon
import React from "react";
import "./Hero.css";
import windowSizeInfo from "./Dimensions";
import NavMenu from "./NavMenu";

function Hero() {
   /*** HERO ART RESIZE ***/
   const windowSizeArray = windowSizeInfo();
   const realWidth = windowSizeArray[0]; // For future use
   const realHeight = windowSizeArray[1];
   const proportionalDimensions = { width: realHeight * 1.71, realHeight };
   const proportionsArray = Object.values(proportionalDimensions);
   let finalDimension = proportionsArray.map((el) => el + "px");
   /*** HERO ART RESIZE ***/

   return (
      <section
         className="hero-section"
         style={
            realHeight > 600
               ? {
                    backgroundSize: `${finalDimension[0]} ${finalDimension[1]}`,
                 }
               : { backgroundSize: "1060px 600px" }
         }
      ></section>
   );
}

export default Hero;
