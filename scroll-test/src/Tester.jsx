import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';
import { images } from './image-data';

const variants = {
  enter: (direction) => {
    return {
      //   x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      //   x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const Tester = ({ scrollY }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const handleScroll = () => {
        // section condition for scroll (between some scroll values its some state)
      if (scrollY.get() % 800 === 0) {
        console.log('paginate');
        paginate(1);
      }
    };

    scrollY.on('change', handleScroll);

    return () => {};
  }, [scrollY, paginate]);


  //In React, changing a component's key makes React treat it as an entirely new component. So the old one is unmounted before the new one is mounted.
  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 1 },
          }}
        />
      </AnimatePresence>
      <div className="next" onClick={() => paginate(1)}>
        {'‣'}
      </div>
      <div className="prev" onClick={() => paginate(-1)}>
        {'‣'}
      </div>
    </>
  );
};

export default Tester;
