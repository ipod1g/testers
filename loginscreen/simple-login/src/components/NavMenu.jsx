import React, { useState, useRef, useEffect } from "react";
import "./NavMenu.css";
import Settings from "./Settings";

const NavMenu = () => {
   const [isOpen, setIsOpen] = useState(false);
   const refMenu = useRef();
   const refButton = useRef();

   const openOnClick = () => {
      setIsOpen((prev) => !prev);
   };

   useEffect(() => {
      const handleClickOutside = (e) => {
         if (
            !refMenu.current.contains(e.target) &&
            !refButton.current.contains(e.target)
         ) {
            setIsOpen(false);
         }
      };
      document.addEventListener("mousedown", handleClickOutside);
   }, [refMenu]);

   return (
      <div className="menu-container">
         <div></div>
         <ul className={isOpen ? "dropdown-menu" : "invis-menu"} ref={refMenu}>
            <li>
               <Settings />
            </li>
            <li>
               <button className="available-x">Sign Out</button>
            </li>
            <li>
               <button onClick={() => setIsOpen(false)}>Exit</button>
            </li>
         </ul>
         <button
            className={isOpen ? "nav-btn active" : "nav-btn"}
            onClick={openOnClick}
            ref={refButton}
         ></button>
      </div>
   );
};

export default NavMenu;
