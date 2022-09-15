import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Home from "./components/Home";

function App() {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/register" element={<Register />} />
      </Routes>
   );
}

export default App;
