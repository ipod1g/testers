import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

const Carousel = (props) => {
  const [flowDirection, setFlowDirection] = useState(true);
  const [centerId, setCenterId] = useState(0);
  const [leftId, setLeftId] = useState(props.content.length - 1);
  const [rightId, setRightId] = useState(1);

  const nextBtn = () => {
    if (leftId === props.content.length - 1) {
      setLeftId(0);
    } else {
      setLeftId(leftId + 1);
    }
    if (centerId === props.content.length - 1) {
      setCenterId(0);
    } else {
      setCenterId(centerId + 1);
    }

    if (rightId === props.content.length - 1) {
      setRightId(0);
    } else {
      setRightId(rightId + 1);
    }
    setFlowDirection(true);
  };
  const prevBtn = () => {
    setFlowDirection(false);
    if (leftId === 0) {
      setLeftId(props.content.length - 1);
    } else {
      setLeftId(leftId - 1);
    }
    if (centerId === 0) {
      setCenterId(props.content.length - 1);
    } else {
      setCenterId(centerId - 1);
    }
    if (rightId === 0) {
      setRightId(props.content.length - 1);
    } else {
      setRightId(rightId - 1);
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => nextBtn(), 3000);
    console.log(centerId);
    return () => clearInterval(timerId);
  });

  const variants = {
    center: {
      x: '0rem',
      opacity: 1,
      scale: 1.1,
      zIndex: '5',
      //   filter: 'brightness(100%)',
      backgroundImage: 'url(' + props.content[centerId] + ')',
      boxShadow: '0px 0px 30px 0px rgba(0,0,0,0.3)',
      transition: {
        type: 'spring',
        duration: 1,
      },
    },
    left: {
      x: '-4rem',
      opacity: 0.5,
      //   filter: 'brightness(40%)',
      scale: 1,
      backgroundImage: 'url(' + props.content[leftId] + ')',
      zIndex: '4',
      //   boxShadow: 'unset',
      transition: {
        type: 'spring',
        duration: 1,
      },
    },
    right: {
      backgroundImage: 'url(' + props.content[rightId] + ')',
      x: '4rem',
      opacity: 0.5,
      //   filter: 'brightness(40%)',
      scale: 1,
      //   boxShadow: 'unset',
      zIndex: '3',
      transition: {
        type: 'spring',
        duration: 1,
      },
    },
    rightHidden: {
      x: '8rem',
      scale: 0,
      opacity: 0,
    },
    leftHidden: {
      x: '-8rem',
      scale: 0,
      opacity: 0,
    },
  };

  const dots = {
    initial: { opacity: 0.2 },
    animate: {
      scale: 1.25,
      opacity: 1,
      transition: {
        delay: 0.08,
        type: 'spring',
      },
    },
  };

  const CarouselIndicator = () => {
    return (
      <div className="flex mt-10 gap-4 justify-center items-center">
        {[...Array(props.content.length).keys()].map((i) => (
          <motion.div
            key={i}
            variants={dots}
            initial="inital"
            animate={centerId === i ? 'animate' : 'inital'}
            style={
              centerId === i
                ? { backgroundColor: 'rgb(255 255 255)' }
                : { backgroundColor: 'rgb(107 114 128)' }
            }
            className="w-2 h-2 opacity-75 rounded-full"
            onClick={() => {
              if (i === leftId) {
                prevBtn();
              } else if (i === rightId) {
                nextBtn();
              } else {
                return;
              }
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div className="grid place-content-center h-full">
      <motion.div className="relative w-[50vw] h-[35svh] md:w-auto md:aspect-[3/5] md:h-[50vh]">
        <AnimatePresence initial={false}>
          <motion.div
            key={leftId}
            variants={variants}
            initial={flowDirection ? 'center' : 'leftHidden'}
            animate="left"
            exit={'leftHidden'}
            className="absolute w-full h-full bg-center bg-cover bg-no-repeat rounded-lg"
          ></motion.div>
          <motion.div
            variants={variants}
            key={centerId}
            initial={flowDirection ? 'right' : 'left'}
            animate="center"
            className="absolute w-full h-full bg-center bg-cover bg-no-repeat rounded-lg"
          ></motion.div>
          <motion.div
            key={rightId}
            variants={variants}
            initial={flowDirection ? 'rightHidden' : 'center'}
            animate="right"
            exit={'rightHidden'}
            className="absolute w-full h-full bg-center bg-cover bg-no-repeat rounded-lg"
          ></motion.div>
        </AnimatePresence>
      </motion.div>

      <CarouselIndicator />
    </motion.div>
  );
};

export default Carousel;
