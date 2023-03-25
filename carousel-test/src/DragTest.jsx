import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

const items = [
  <div className=" w-[300px]" data-value="1">
    <div className="bg-[url('/assets/timeline1.svg')] bg-no-repeat bg-cover w-2/3 rounded-xl h-auto aspect-[267/288] bg-slate-800 before:absolute before:content-[''] before:w-[10000px] before:bg-slate-50 before:h-1 before:top-1/4 before:mt-1 before:left-6 before:z-50"></div>
  </div>,
  <div className=" w-[300px]" data-value="2">
    <div className="bg-[url('/assets/timeline1.svg')] bg-no-repeat bg-cover w-2/3 rounded-xl h-auto aspect-[267/288] bg-slate-800"></div>
  </div>,
  <div className="item" data-value="3">
    3
  </div>,
  <div className="item" data-value="4">
    4
  </div>,
  <div className="item" data-value="5">
    5
  </div>,
];

const DragTest = () => (
  <div className="w-[500px]">
    <AliceCarousel
      mouseTracking
      autoWidth
      autoHeight
      items={items}
      paddingLeft={50}
      paddingRight={50}
      responsive={responsive}
      disableButtonsControls
    />
  </div>
);

export default DragTest;
