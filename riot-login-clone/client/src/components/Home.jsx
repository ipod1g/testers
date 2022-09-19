import { useState } from "react";
import LoginSection from "./LoginSection";
import Hero from "./Hero";
import windowSizeInfo from "./Dimensions";
import NavMenu from "./NavMenu";

function Home() {
   //----MEDIA QUERY ----//
   const windowSizeArray1 = windowSizeInfo();
   const width = windowSizeArray1[0];

   //----MEDIA QUERY ----//

   return (
      <div>
         <div
            className="Home"
            style={{
               display: "flex",
               height: "100vh",
               width: "100vw",
               minHeight: "600px",
            }}
         >
            <LoginSection />
            {width > 400 ? <Hero /> : null}
            <NavMenu />
         </div>
      </div>
   );
}

export default Home;
