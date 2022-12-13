import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <BrowserRouter>
      <GoogleOAuthProvider clientId="768036574762-0cegdl5t94hh85aemuf3ldk013g01qn5.apps.googleusercontent.com">
         <App />
      </GoogleOAuthProvider>
   </BrowserRouter>
);
