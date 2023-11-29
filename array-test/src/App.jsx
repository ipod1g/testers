import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  // pure js fn
  function preprocess(projects) {
    let preprocessedProjects = [];
    projects.forEach((project) => {
      const { name, brand, time } = project;
      if (!(brand in preprocessedProjects)) {
        preprocessedProjects[brand] = [];
      }

      preprocessedProjects[brand].push({ name, time });
    });

    return preprocessedProjects;
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

const projects = [
  {
    productName: 'product A 1',
    brand: 'brand A',
    secondsBrowsed: 6300,
    clickTimes: 3,
    lastClickTime: '2018-12-10T13:49:51.141Z',
  },
  {
    productName: 'product A 2',
    brand: 'brand A',
    secondsBrowsed: 2300,
    clickTimes: 3,
    lastClickTime: '2018-12-10T13:49:51.141Z',
  },
  {
    productName: 'product B 1',
    brand: 'brand B',
    secondsBrowsed: 1300,
    clickTimes: 3,
    lastClickTime: '2018-12-10T13:49:51.141Z',
  },
];

function preProcess(projects) {
  let filtered = {};

  projects.forEach((project) => {
    const { brand, productName, secondsBrowsed, clickTimes } = project;

    if (!(brand in filtered)) {
      filtered[brand] = [];
    }

    filtered[brand].push({
      productName: productName,
      minutesBrowsed: Math.round(secondsBrowsed / 60),
      clickTimes: clickTimes,
    });
  });
  return filtered;
}

function debounce(callback, timer) {
  let timeoutId;

  return (...args) => {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(context, args);
    }, timer);
  };
}

function throttle(cb, delay) {
  let wait = false;

  return (...args) => {
    if (wait) {
      return;
    }
    cb(...args);
    wait = true;
    setTimeout(() => {
      wait = false;
    }, delay);
  };
}

export default App;
