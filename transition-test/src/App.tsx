import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import './App.css';

function App() {
  const [transition, setTransition] = useState(false);

  const variants = {
    initial: { scale: 0 },
    expand: {
      scale: 10,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="App">
      <div className="fixed overflow-hidden w-screen h-screen">
        <div className="relative w-10 h-10 top-0 right-0 bg-red-200">
          <button
            onClick={() => setTransition(!transition)}
            className=" bg-green-600 absolute z-50"
          >
            Hi
          </button>
          <AnimatePresence>
            {transition && (
              <motion.div
                variants={variants}
                initial="initial"
                animate="expand"
                exit="initial"
                className="absolute -top-1/2 -left-1/2 w-[100px] md:h-auto  aspect-square bg-gray-500 rounded-full"
              ></motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
