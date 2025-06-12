import { useEffect, useRef, useState } from 'react';
import './App.css';
import { AnimatePresence, motion, TargetAndTransition, useAnimation } from 'framer-motion';
import { useRafLoop, useUpdate } from 'react-use';
import { folder, useControls } from 'leva';

const SPRING = {
  type: 'spring',
  duration: 1,
};

// one time line
const variant1: Animation[] = [
  [
    {
      opacity: 0,
      backgroundColor: 'blue',
      transition: {
        ...SPRING,
      },
      x: 0,
      y: 0,
    },
  ],
  [
    {
      opacity: 1,
      backgroundColor: 'orange',
      transition: {
        type: 'spring',
      },
      x: 100,
    },
  ],
  [
    {
      opacity: 0,
      backgroundColor: 'orange',
      transition: { duration: 1, type: 'spring' },
      x: 100,
    },
  ],
  [
    {
      opacity: 1,
      backgroundColor: 'green',
      transition: {
        ...SPRING,
      },
      x: 400,
      y: 100,
    },
  ],
  [
    {
      opacity: 0,
      backgroundColor: 'green',
      transition: {
        ...SPRING,
      },
      y: 100,
    },
  ],
  [
    {
      opacity: 1,
      backgroundColor: 'blue',
      transition: {
        ...SPRING,
      },
    },
  ],
];

const variant2 = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    backgroundColor: 'red',
    transition: {
      ...SPRING,
    },
  },
};

const testKeyframe = 1;
type AnimateParams = [TargetAndTransition];
type Animation = AnimateParams | Animation[];
const useAnimationTimeline = (keyframes: Animation[], count: number = 1) => {
  const controls = useAnimation();
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    handleAnimate();
    return () => {
      mounted.current = false;
    };
  }, []);

  const processAnimation = async (animation: Animation) => {
    // If list of animations, run all concurrently
    if (Array.isArray(animation[0])) {
      await Promise.all(
        animation.map(async (a) => {
          await processAnimation(a as Animation);
        }),
      );
    } else {
      // Else run the single animation
      await controls.start(animation[0]);
    }
  };
  const handleAnimate = async () => {
    for (let i = 0; i < count; i++) {
      for (const animation of keyframes) {
        if (!mounted.current) return;
        await processAnimation(animation);
      }
    }
  };
  return controls;
};

function App3() {
  const controls = useAnimationTimeline(variant1, Infinity);

  return (
    <>
      <motion.div
        animate={controls}
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'blue',
          position: 'absolute',
        }}
      >
        <motion.img
          src="https://gallerypng.com/wp-content/uploads/2024/03/cat-png-cute-cat-free-hd-download-transparent-png-45943.png"
          width={100}
          height={'auto'}
        ></motion.img>
      </motion.div>
    </>
  );
}

export default App3;
