import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import App3 from './App3';
import App4 from './App4';
import CanvasTest from './CanvasTest';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    {/* <App2 /> */}
    {/* <App3 /> */}
    {/* <App4 /> */}
    <CanvasTest />
  </StrictMode>,
);
