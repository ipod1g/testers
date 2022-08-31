//For settings and account icon
import React, { useEffect, useState } from "react";
import "./Hero.css";
import Background from "../assets/udyr_art.jpg";
import windowSizeInfo from "./Dimensions";

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
            backgroundImage: `url${Background})`,
            backgroundRepeat: "no-repeat",
            width: "100%",
         }}
      ></section>
   );
}

export default Hero;
