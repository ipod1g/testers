import React, { useState } from 'react';
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
    const startTime = Date.now();

    const values = new Array(count).fill(0).map((_, i) => i);
    const calculation = values.reduce(
      (a, v) => ({
        ...a,
        [v]: v,
      }),
      {}
    );
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    return elapsedTime;
  };

  /** this uses one object that we create and just add on the values as we go
   *  this creates only 1 new object from this whole sequence
   */
  const mutableReduce = (count = TEST_COUNT) => {
    const startTime = Date.now();
    const values = new Array(count).fill(0).map((_, i) => i);
    const calculation = values.reduce((a: { [key: number]: number }, v) => {
      a[v] = v;
      return a;
    }, {});
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    return elapsedTime;
  };

  return (
    <div>
      <h1>Object Test</h1>
      <p>Count: {TEST_COUNT}</p>
      <p>
        <div>Destructure reduce</div>
        <button onClick={() => console.log(destructureReduce())} />
      </p>
      <p>
        <div>Mutable reduce</div>
        <button onClick={() => console.log(mutableReduce())} />
      </p>
    </div>
  );
}

export default App;
