import { useState } from 'react';
import { AnimatePresence, animate, motion } from 'framer-motion';

function App() {
  const [transition, setTransition] = useState(false);

  const fadeInOut = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="h-screen w-screen bg-blue-300 flex justify-center items-center">
      <div className="scale-150">
        <svg
          width="216"
          height="108"
          viewBox="0 0 216 108"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 108C2 94.0798 4.74178 80.296 10.0688 67.4355C15.3958 54.575 23.2037 42.8896 33.0467 33.0466C42.8897 23.2036 54.5751 15.3957 67.4356 10.0687C80.2961 4.74175 94.0799 1.99999 108 2C121.92 2.00001 135.704 4.74179 148.565 10.0688C161.425 15.3958 173.11 23.2037 182.953 33.0467C192.796 42.8897 200.604 54.5751 205.931 67.4356C211.258 80.2961 214 94.0799 214 108"
            stroke="#F6C833"
            strokeWidth="8"
            strokeDasharray="2 13"
          />
        </svg>
        <div className="w-[108px] -mt-10 h-fit absolute rotate-45 origin-right flex">
          <div className="w-10 h-10 rounded-full bg-yellow-300 self-end"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
