import { useEffect, useRef, useState } from 'react';
import './App.css';
import { AnimatePresence, motion } from 'framer-motion';

// TODO: try attaching leva
// TODO: try with image structure
// TODO: try using react-use for raf loop

// one time line
const variant1 = {
  '0': {
    opacity: 0,
    backgroundColor: 'blue',
    transition: { duration: 1 },
    // transitionEnd: { opacity: 1 },
  },
  '1': {
    opacity: 1,
    backgroundColor: 'orange',
    transition: { duration: 1 },
    x: 100,
  },
  '2': {
    opacity: 0,
    backgroundColor: 'orange',
    transition: { duration: 1 },
    x: 100,
  },
  '3': {
    opacity: 1,
    backgroundColor: 'green',
    transition: { duration: 1 },
    y: 300,
  },
  '4': {
    opacity: 0,
    backgroundColor: 'green',
    transition: { duration: 1 },
    y: 300,
  },
  '5': {
    opacity: 1,
    backgroundColor: 'blue',
    transition: { duration: 1 },
  },
};

const variant2 = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    backgroundColor: 'red',
    transition: { duration: 1 },
  },
};

function App() {
  const [animTimeline, setAnimTimeline] = useState(variant1);
  const [anim, setAnim] = useState('0');

  const currentInterval = useRef(null);

  // change this to rafloop?
  useEffect(() => {
    if (!currentInterval.current) {
      currentInterval.current = setInterval(() => {
        setAnimTimeline(variant1);
        setAnim((prev) => String((Number(prev) + 1) % Object.keys(animTimeline).length));
      }, 2000);
    }

    return () => {
      if (currentInterval.current) {
        clearInterval(currentInterval.current);
        currentInterval.current = null;
      }
    };
  }, [animTimeline]);

  console.log(anim);

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          initial="0"
          animate={anim}
          style={{
            width: 100,
            height: 100,
            position: 'absolute',
          }}
          variants={animTimeline}
        ></motion.div>
        <motion.img
          animate={anim}
          src="https://pngimg.com/uploads/cat/cat_PNG50446.png"
          width={100}
          height={'auto'}
          style={{ position: 'absolute' }}
          variants={animTimeline}
          exit={{ opacity: 0 }}
        ></motion.img>
        <motion.img
          animate={anim}
          src="https://gallerypng.com/wp-content/uploads/2024/03/cat-png-cute-cat-free-hd-download-transparent-png-45943.png"
          width={100}
          style={{ position: 'absolute' }}
          height={'auto'}
          variants={animTimeline}
          exit={{ opacity: 0 }}
        ></motion.img>
        <motion.img
          animate={anim}
          src="https://gallerypng.com/wp-content/uploads/2024/03/black-cat-png-cute-cat-free-hd-download-transparent-png-4545.png"
          width={100}
          style={{ position: 'absolute' }}
          height={'auto'}
          variants={animTimeline}
          exit={{ opacity: 0 }}
        ></motion.img>
      </AnimatePresence>
    </>
  );
}

export default App;
