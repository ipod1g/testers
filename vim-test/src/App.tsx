import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [test, setTest] = useState(0);

  useEffect(() => {
    console.log(test);
  }, [test]);

  return (
    <main className="bg-pink-300 flex flex-col justify-center items-center">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Clicks on the Vite and React logos to learn more
      </p>
      <button
        className="bg-cyan-400 border-red-100 shadow-md font-bold text-lg mt-10 mb-4"
        onClick={() => setTest((prev) => prev + 1)}
      >
        Test Clicker
      </button>
    </main>
  );
}

export default App;
