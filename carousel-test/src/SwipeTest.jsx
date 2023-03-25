// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import { Autoplay, EffectCoverflow, Pagination, Navigation } from 'swiper';

const SwipeTest = (props) => {
  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        slidesPerView={1.5}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          // modifier: 2.5,
          modifier: 2,
        }}
        pagination={{ clickable: true }}
        modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
        className="h-[300px] w-[500px]"
      >
        <SwiperSlide className="bg-white w-[90%]  mx-auto">hi</SwiperSlide>
        <SwiperSlide className="bg-green-300 w-[90%] mx-auto">hi</SwiperSlide>
        <SwiperSlide className="bg-red-600 w-[90%] mx-auto">hi</SwiperSlide>
        <SwiperSlide className="bg-purple-300 w-[90%] mx-auto">hi</SwiperSlide>
      </Swiper>
    </>
  );
};

export default SwipeTest;
