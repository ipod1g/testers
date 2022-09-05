import { useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import Hero from "./components/Hero";

function App() {
   //----TEMP DATABASE ----//
   const adminUser = {
      username: "bono",
      password: "1234",
   };
   //----TEMP DATABASE ----//

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
            <LoginForm Login={Login} errorMsg={errorMsg} />
         )}
         <Hero />
      </div>
   );
}

export default App;
