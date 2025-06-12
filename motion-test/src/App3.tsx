import { useEffect, useRef } from 'react';
import './App.css';
import { animateVisualElement, animationControls, motion, useAnimation } from 'framer-motion';
import type { TargetAndTransition } from 'framer-motion';
import { useConstant } from './useConstant';

const SPRING = {
  type: 'spring',
  duration: 1,
};

animateVisualElement;

const variant1: Animation[] = [
  [
    {
      opacity: 0,
      backgroundColor: 'blue',
      transition: SPRING,
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
  // const controls = useAnimationTimeline(variant1, Infinity);
  return (
    <>
      <div
        style={{
          backgroundImage: 'url(/LandingPage1_BG.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100vw',
          height: '100vh',
          position: 'fixed',
        }}
      >
        <img
          style={{
            position: 'absolute',
            width: '20.8%',
            aspectRatio: '0.9',
            height: 'auto',
            top: '42.3%',
            left: '40.4%',
          }}
          src="/Corridor_Light_Flicker_0.webp"
        />
        {/* <motion.div
          id="cat1"
          animate={controls}
          style={{
            width: 300,
            height: 300,
            backgroundColor: 'blue',
            position: 'absolute',
          }}
        >
          <motion.img
            src="https://gallerypng.com/wp-content/uploads/2024/03/cat-png-cute-cat-free-hd-download-transparent-png-45943.png"
            width={'100%'}
            height={'auto'}
          ></motion.img>
        </motion.div> */}
      </div>
    </>
  );
}

export default App3;
