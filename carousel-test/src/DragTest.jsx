import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';

const Carousel = (props) => {
  const [flowDirection, setFlowDirection] = useState(true);
  const [activeId, setActiveId] = useState(0);
  const sliderRef = useRef();

  const itemWidth = 250;

  const swipeConfidenceThreshold = 1000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const { scrollX } = useScroll({ container: sliderRef });

  const variants = {
    initial: { opacity: 0.7 },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.08,
        type: 'spring',
      },
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

  const pageinate = (i) => {
    setActiveId(i);
    console.log(activeId);
  };

  const CarouselIndicator = () => {
    return (
      <div className="flex mt-10 gap-4 justify-center items-center">
        {[...Array(props.content.length).keys()].map((i) => (
          <motion.div
            key={i}
            variants={dots}
            initial="initial"
            animate={activeId === i ? 'animate' : 'inital'}
            style={
              activeId === i
                ? { backgroundColor: 'rgb(255 255 255)' }
                : { backgroundColor: 'rgb(107 114 128)' }
            }
            className="w-2 h-2 opacity-75 rounded-full"
            onClick={() => {
              pageinate(i);
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <motion.div
        ref={sliderRef}
        className="w-[320px] h-fit snap-x snap-mandatory overflow-x-auto overflow-y-hidden whitespace-nowrap relative"
      >
        <motion.div
          drag="x"
          dragConstraints={sliderRef}
          //   style={{ translateX: -250 * activeId }}
          dragElastic={0.5}
          dragPropagation
          dragMomentum={0}
          className="flex w-[1000px]"
        >
          {[...Array(props.content.length).keys()].map((i) => (
            <motion.div
              key={i}
              className="flex flex-row scroll-smooth snap-center justify-center items-center"
            >
              <motion.div
                whileInView={() => {
                  pageinate(i);
                }}
                viewport={{
                  root: sliderRef,
                  margin: '0px -1% 0px -1%',
                  amount: 'all',
                }}
                variants={variants}
                initial="initial"
                animate={activeId === i ? 'animate' : 'inital'}
                style={
                  activeId === i
                    ? {
                        backgroundColor: 'rgb(255 255 255)',
                        backgroundImage: 'url(' + props.content[i] + ')',
                      }
                    : {
                        backgroundColor: 'rgb(107 114 128)',
                        backgroundImage: 'url(' + props.content[i] + ')',
                      }
                }
                // onDragStart={() => setDragging(true)}
                // onDragEnd={(e, { offset, velocity }) => {
                //   const swipe = swipePower(offset.x, velocity.x);
                //   if (swipe < -swipeConfidenceThreshold) {
                //   } else if (swipe > swipeConfidenceThreshold) {
                //     prevBtn();
                //   }
                //   setDragging(false);
                // }}
                className={`flex w-[${itemWidth}px] bg-no-repeat bg-contain h-[300px] mx-4 bg-slate-300`}
              ></motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <CarouselIndicator />
    </div>
  );
};

export default Carousel;
