import React from "react";

const SocialLoginButton = (props) => {
   return (
      <button className={"button-" + props.social} onClick={props.loginRoutes}>
         {props.children}
         <img
            className={props.social + "logo"}
            src={require(`../assets/${props.social}icon.png`)}
            alt={props.social + " login"}
         />
      </button>
   );
};

export default SocialLoginButton;
