import './App.css';
import { TextureLoader } from 'three';
import { Canvas, useLoader } from 'react-three-fiber';
import image from './assets/LandingPage1_BG.png';
import { Suspense } from 'react';

function Background() {
  // const textureA = useLoader(TextureLoader, '/LandingPage1_BG.png', (loader) => {});

  // Sprite material has a prop called map to set the texture on.
  return (
    <mesh position={[0, 10, -13]} rotation={[0, 0, 0]}>
      <planeGeometry args={[64, 32]} />
      {/* <meshBasicMaterial map={textureA} /> */}
    </mesh>
  );
}

function CanvasTest() {
  return (
    <Canvas
      pixelRatio={window.devicePixelRatio}
      camera={{ fov: 45, near: 0.001, far: 10 }}
      // @ts-ignore
    >
      <Suspense fallback={null}>
        <mesh></mesh>
        {/* <Background /> */}
      </Suspense>
    </Canvas>
  );
}

export default CanvasTest;
