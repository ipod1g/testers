//For settings and account icon
import React from "react";
import "./Hero.css";
import windowSizeInfo from "./Dimensions";
import NavMenu from "./NavMenu";

function Hero() {
   /*** HERO ART RESIZE ***/
   const height = windowSizeInfo();
   const proportionalDimensions = { width: height * 1.71, height };
   const proportionsArray = Object.values(proportionalDimensions);
   let finalDimension = proportionsArray.map((el) => el + "px");
   /*** HERO ART RESIZE ***/

   return (
      <section
         className="hero-section"
         style={{
            backgroundSize: `${finalDimension[0]} ${finalDimension[1]}`,
         }}
      >
         <NavMenu />
      </section>
   );
}

export default Hero;
