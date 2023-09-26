import { Inter } from 'next/font/google';
import { useEffect, useRef } from 'react';
// import Sketch from '../three/three';
import dynamic from 'next/dynamic';
import Sketch from '../three/app';

// import particleTexture from '@/public/particle.webp';
import particleTexture from '@/public/images/23.png';

const inter = Inter({ subsets: ['latin'] });

// const Sketch = dynamic(() => import('../three/app'), {
//   ssr: false,
// });

export default function Home() {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas: HTMLDivElement | null = canvasRef.current;
    if (!canvas) return;
    new Sketch({ dom: document.getElementById('container') }).renderer
      .domElement;
  }, []);

  return (
    <div id="container" className="w-screen h-screen" ref={canvasRef}>
      <img src={`${particleTexture}`} className="absolute top-0" />
    </div>
  );
}
