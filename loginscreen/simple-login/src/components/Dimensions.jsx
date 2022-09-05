import { useEffect, useState } from "react";

export default function windowSizeInfo() {
   const getWindowSize = () => window.innerHeight;

   function Dimension() {
      const [windowSize, setWindowSize] = useState(getWindowSize());

      useEffect(() => {
         function handleWindowResize() {
            setWindowSize(getWindowSize());
         }

         window.addEventListener("resize", handleWindowResize);
         return () => {
            window.removeEventListener("resize", handleWindowResize);
         };
      }, [windowSize]);
      return windowSize;
   }

   return Dimension();
}
