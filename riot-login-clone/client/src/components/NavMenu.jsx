import React, { useState, useRef, useEffect } from "react";
import "./NavMenu.css";
import Settings from "./Settings";

const NavMenu = () => {
   const [isNavOpen, setIsNavOpen] = useState(false);
   const refMenu = useRef();
   const refButton = useRef();

   const openOnClick = () => {
      setIsNavOpen((prev) => !prev);
   };

   useEffect(() => {
      const handleClickOutside = (e) => {
         if (
            !refMenu.current?.contains(e.target) &&
            !refButton.current?.contains(e.target)
         ) {
            setIsNavOpen(false);
         }
      };
      document.addEventListener("mousedown", handleClickOutside);
   }, [refMenu]);

   return (
      <div className="menu-container">
         <button
            className={isNavOpen ? "nav-btn active" : "nav-btn"}
            onClick={openOnClick}
            ref={refButton}
         ></button>
         <ul
            className={isNavOpen ? "dropdown-menu" : "invis-menu"}
            ref={refMenu}
         >
            <li>
               <Settings setIsNavOpen={setIsNavOpen} />
            </li>
            <li>
               <button className="available-x">Sign Out</button>
            </li>
            <li>
               <button onClick={() => setIsNavOpen(false)}>Exit</button>
            </li>
         </ul>
      </div>
   );
};

export default NavMenu;
