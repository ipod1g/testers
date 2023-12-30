import './App.css';
import Lottie from 'lottie-react';
import testAnim from './assets/App-list.json';

function App() {
  return (
    <>
      <Lottie animationData={testAnim} loop={true}  />
    </>
  );
}

export default App;
