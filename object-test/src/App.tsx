import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const TEST_COUNT = 50000;

  // object type test
  const objType1: { [key: string]: number } = {
    foo: 1,
    bar: 2,
    baz: 3,
  };
  // object type test
  const objType2: { [key: number]: string } = {
    0: 'foo',
    1: 'bar',
    2: 'baz',
  };

  // creates an object where every filled value is mapped to its own key

  /** destructure in this case is way slower
   *  this creates TEST_COUNT objects and throws away the rest except for the final object that is returned
   */
  const destructureReduce = (count = TEST_COUNT) => {
    const values = new Array(count).fill(0).map((_, i) => i);
    return values.reduce(
      (a, v) => ({
        ...a,
        [v]: v,
      }),
      {}
    );
  };

  /** this uses one object that we create and just add on the values as we go
   *  this creates only 1 new object from this whole sequence
   */
  const mutableReduce = (count = TEST_COUNT) => {
    const values = new Array(count).fill(0).map((_, i) => i);
    return values.reduce((a: { [key: number]: number }, v) => {
      a[v] = v;
      return a;
    }, {});
  };

  return (
    <>
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
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
