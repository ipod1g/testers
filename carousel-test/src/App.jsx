import { useState } from 'react';
import Carousel from './Carousel';
import SwipeTest from './SwipeTest';
import DragTest from './DragTest';
import CarouselASUS from './CarouselASUS';

function App() {
  const CarouselData = [
    // '/assets/company1.svg',
    // '/assets/company1.svg',
    // '/assets/company1.svg',
    // 1, 2, 3,
    'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80',
    'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
    'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80',
  ];

  const carouselContent = [
    {
      title: 'Virtual Job Experience',
      description:
        'Three modes for the integrated microphone array give you greater control over your input. Cardioid mode captures sound from right in front of the laptop, while minimizing input from the back, making it ideal for streaming and gaming. Stereo mode uses right and left channels to record a wider soundscape for live music or other immersive experiences. Omnidirectional mode picks up sound from all directions equally for clearer group conference calls.',
      image: '/assets/images/1.png',
      link: '#',
    },
    {
      title: 'Metaverse Puzzle',
      description:
        'Three modes for the integrated microphone array give you greater control over your input. Cardioid mode captures sound from right in front of the laptop, while minimizing input from the back, making it ideal for streaming and gaming. Stereo mode uses right and left channels to record a wider soundscape for live music or other immersive experiences. Omnidirectional mode picks up sound from all directions equally for clearer group conference calls.',
      image: '/assets/images/1.png',
      link: '#',
    },
    {
      title: 'NFC Business Card',
      description: 'Short',
      image: '/assets/images/1.png',
      link: '#',
    },
  ];

  return (
    <div className="App w-screen h-screen flex justify-center items-center bg-red-300">
      {/* <Carousel content={CarouselData} /> */}
      {/* <SwipeTest content={CarouselData}></SwipeTest> */}
      {/* <DragTest content={CarouselData} /> */}
      <CarouselASUS carouselContent={carouselContent} />
    </div>
  );
}

export default App;
