import { useState } from "react";
import LoginSection from "./LoginSection";
import Hero from "./Hero";
import windowSizeInfo from "./Dimensions";
import NavMenu from "./NavMenu";

function Home() {
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
      </div>
   );
}

export default Home;
