import { useState } from "react";
import "./App.css";
import LoginSection from "./components/LoginSection";
import Hero from "./components/Hero";
import windowSizeInfo from "./components/Dimensions";
import NavMenu from "./components/NavMenu";

function App() {
   //----TEMP DATABASE ----//
   const adminUser = {
      username: "bono",
      password: "1234",
   };
   //----TEMP DATABASE ----//

   //----MEDIA QUERY ----//
   const windowSizeArray1 = windowSizeInfo();
   const width = windowSizeArray1[0];

   //----MEDIA QUERY ----//

   const [user, setUser] = useState({ name: "" });
   const [errorMsg, setError] = useState("");
   const [isError, setIsError] = useState(false);

   const Login = (details) => {
      if (
         details.name === adminUser.username &&
         details.password === adminUser.password
      ) {
         console.log("Logged in");
         setIsError(false);
         setUser({
            name: details.name,
         });
      } else {
         setIsError(true);
         setError(
            "Your login credentials don't match an account in our system."
         );
      }
   };

   const Logout = () => {
      console.log("Logout");
      setUser({ name: "" });
   };

   return (
      <div className="App">
         {user.name !== "" ? (
            <div className="welcome">
               <h2>
                  Welcome, <span>{user.name}</span>
               </h2>
               <button onClick={Logout}>Logout</button>
            </div>
         ) : (
            <LoginSection Login={Login} errorMsg={errorMsg} />
         )}
         {width > 400 ? <Hero /> : null}
         <NavMenu />
      </div>
   );
}

export default App;
