import { useEffect, useState } from "react";

export default function windowSizeInfo() {
   const getWindowSize = () => [window.innerWidth, window.innerHeight];

   function Dimension() {
      const [windowSize, setWindowSize] = useState(getWindowSize());

      useEffect(() => {
         function handleWindowResize() {
            console.log(windowSize);
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
