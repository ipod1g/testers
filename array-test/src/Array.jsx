import React from 'react';
import { useState } from 'react';

const Array = () => {
  const data = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
  const [arrayThing, setArrayThing] = useState(data);
  const [toggle, setToggle] = useState(true);

  let newThing = [];

  const clickHandler = () => {
    for (let i = 0; i < 3; i++) {
      let x = { name: `${i}` };
      console.log(x);
      newThing.push(x);
    }
    // setArrayThing([...arrayThing, newThing]);
    setArrayThing(arrayThing.concat(newThing));
    console.log(arrayThing);
  };

  const toggler = () => {
    // setToggle(!toggle);
    setToggle((prev) => !prev);
    console.log(toggle);
  };

  const listItems = arrayThing.map((elem, keys) => {
    return <div key={keys}>{elem.name}</div>;
  });

  return (
    <div>
      {listItems}
      {JSON.stringify(arrayThing)}
      {/* {arrayThing} */}
      <button onClick={() => clickHandler()}>CLICK</button>
      <button onClick={() => toggler()}>TOGGLE</button>
    </div>
  );
};

export default Array;
