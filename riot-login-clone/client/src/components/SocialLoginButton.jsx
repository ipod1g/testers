import React from "react";
import Axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import LoginModal from "./LoginModal";
import { useState } from "react";

const SocialLoginButton = (props) => {
   const googleLogin = useGoogleLogin({
      onSuccess: async (response) => {
         try {
            const res = await Axios.get(
               "https://www.googleapis.com/oauth2/v3/userinfo",
               {
                  headers: {
                     Authorization: `Bearer ${response.access_token}`,
                  },
               }
            );
            // console.log(res.data);
            // login success modal
            props.setLoginModalShown(true);
         } catch (err) {
            console.log(err);
            alert("LOGIN FAILED");
         }
      },
   });

   const loginRoutesHandler = () => {
      if (props.social == "google") {
         googleLogin();
      } else {
         alert("Not Ready");
      }
   };

   return (
      <button className={"button-" + props.social} onClick={loginRoutesHandler}>
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
