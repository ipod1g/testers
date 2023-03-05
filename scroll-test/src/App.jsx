import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import './App.css';
import WindowSize from './WindowSize';

function App() {
  const { scrollY } = useScroll();

  // find out viewport height
  const [windowWidth, windowHeight] = WindowSize();
  // vh * section index = scroll stop point?
  // maybe try with useTransform?

  let scroll1 = useTransform(scrollY, [0, 1000], [-30, -1000]);
  let scroll2 = useTransform(scrollY, [1000, 2000], [20, -1000], {
    clamp: false,
  });
  let scrollBigRaw = useTransform(scrollY, [0, 3400, 4400], [0, 0, -1000], {
    clamp: false,
  });
  let scrollBig = useSpring(scrollBigRaw, { stiffness: 200, damping: 50 });
  let scrollBig2 = useTransform(scrollY, [0, 4400, 5400], [0, 0, -1000], {
    clamp: false,
  });

  // const isInView = useInView(aboutSection);

  // const scrollToSection = (elementRef) => {
  //   window.scrollTo({
  //     top: elementRef.current.offsetTop,
  //     behavior: 'smooth',
  //   });
  // };

  const spring1 = useSpring(scroll1, { stiffness: 100, damping: 30 });
  const spring2 = useSpring(scroll2, { stiffness: 100, damping: 30 });

  const handleClick = () => {
    window.scrollTo({ top: 1000, behavior: 'smooth' });
    console.log('handleClick' + scrollBig);
    console.log('handleClick' + JSON.stringify(scrollY));
  };

  const handleClick2 = () => {
    window.scrollTo({ top: 4400, behavior: 'smooth' });
    console.log('handleClick' + scrollBig);
    console.log('handleClick' + JSON.stringify(scrollY));
  };

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      console.log('Page scroll: ', latest);
      // console.log('sv2 : ', scroll2);
    });
  }, []);

  useEffect(() => {
    return scroll2.on('change', (latest) => {
      console.log('sc2: ', latest);
      // console.log('sv2 : ', scroll2);
    });
  }, []);

  return (
    <div className="App">
      <motion.section
        style={{ backgroundColor: 'blue', translateY: scrollBig2 }}
      >
        <h1>LOVE YOU</h1>
      </motion.section>{' '}
      <motion.section
        style={{ backgroundColor: 'pink', translateY: scrollBig }}
      >
        <motion.h1 style={{ translateX: spring2 }} onClick={handleClick2}>
          JISOO
        </motion.h1>
        <motion.h1 style={{ translateX: spring1 }} onClick={handleClick}>
          HI
        </motion.h1>
      </motion.section>
    </div>
  );
}

export default App;
