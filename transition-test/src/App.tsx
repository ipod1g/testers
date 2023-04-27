import { useState } from 'react';
import barba from '@barba/core';
import { AnimatePresence, animate, motion } from 'framer-motion';

function App() {
  const [transition, setTransition] = useState(false);

  const fadeInOut = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  barba.init({
    schema: {
      prefix: 'data-barba',
      wrapper: 'wrapper',
      container: 'container',
    },
    transitions: [
      {
        name: 'fade-transition',
        leave(data) {
          return animate(fadeInOut.visible, fadeInOut.hidden);
        },
        enter(data) {
          return animate(fadeInOut.hidden, fadeInOut.visible);
        },
      },
    ],
  });

  return (
    <div className="h-screen w-screen bg-blue-300" data-barba="wrapper">
      <AnimatePresence>
        <motion.div
          animate={transition ? 'visible' : 'hidden'}
          variants={fadeInOut}
          initial="hidden"
          exitBeforeEnter
          data-barba="container"
          data-barba-namespace="home"
        >
          <div>HOME PAGE</div>
        </motion.div>
      </AnimatePresence>
      <motion.div
        animate={animate}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        data-barba="container"
        data-barba-namespace="about"
      >
        <div>ABOUT PAGE</div>
      </motion.div>
    </div>
  );
}

export default App;
