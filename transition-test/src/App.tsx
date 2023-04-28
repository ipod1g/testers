import { useState } from 'react';
import { AnimatePresence, animate, motion } from 'framer-motion';

function App() {
  const [transition, setTransition] = useState(false);

  const fadeInOut = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return <div className="h-screen w-screen bg-blue-300"></div>;
}

export default App;
