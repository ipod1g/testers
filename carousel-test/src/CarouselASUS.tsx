import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import WindowSize from '../utils/WindowSize';
import SimpleBarReact from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

interface Carousel {
  carouselContent: {
    title: string;
    description: string;
    image: string;
    link: string;
  }[];
}

const CarouselASUS = (props: Carousel) => {
  const [width, height] = WindowSize();

  const textAreaHeight = () => {
    if (height < 719) {
      return 80;
    } else if (width > 640) {
      return height * 0.22;
    } else {
      return 120;
    }
  };

  return (
    <div className="relative text-center w-[650px] h-[370px]">
      <div className="pt-[16%] sm:pt-[6%] overflow-hidden w-full max-h-[55vh] max-w-full min-h-0 min-w-0 flex ">
        <Swiper
          grabCursor={true}
          // autoplay={{
          //   delay: 3000,
          //   disableOnInteraction: false,
          // }}
          pagination={{ clickable: true }}
          loop
          centeredSlides
          modules={[Autoplay, Pagination, Navigation]}
          className={`overflow-visible w-full max-w-7xl mx-auto ${
            height < 719 ? 'w-[67vw] h-[48svh]' : 'w-full h-[45svh]'
          }
            `}
        >
          <AnimatePresence>
            {props.carouselContent.map((item, i) => {
              return (
                <SwiperSlide key={'slide-' + i}>
                  <div className="relative w-full h-full flex justify-end">
                    <div className="border-solid border-[1px] border-black/10 bg-[#1A1C21]">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          transition: { duration: 1 },
                        }}
                        className={`flex flex-col ${
                          height > 700 && width > 640 ? 'sm:flex-row' : ''
                        }`}
                      >
                        <div className="absolute left-auto top-0 right-10 bottom-auto m-2 sm:m-3 ml-0 text-xs text-white/60 font-mono">
                          {'0' + (i + 1)}
                        </div>
                        <motion.img
                          // sizes="(max-width: 479px) 100vw, 440px"
                          sizes="(max-width: 479px) 100vw, (max-width: 767px) 26vw, 440px"
                          src="https://dlcdnwebimgs.asus.com/files/media/C29CCD6D-9F8B-403F-AFB6-AA0C8680F397/v1/images/carousel-audio-01.jpg"
                          srcSet="https://dlcdnwebimgs.asus.com/files/media/C29CCD6D-9F8B-403F-AFB6-AA0C8680F397/v1/images/carousel-audio-01-p-500.jpg 500w, https://dlcdnwebimgs.asus.com/files/media/C29CCD6D-9F8B-403F-AFB6-AA0C8680F397/v1/images/carousel-audio-01.jpg 880w"
                          loading="lazy"
                          height="Auto"
                          // src={props.carouselContent[i].image}
                          alt="Front and rear view of the M16, with icons adding emphasis to the locations of the 3D mic array."
                          className="relative flex-grow-0 h-36 sm:h-52 w-full max-h-72 rounded-tl-xl transition-all m-auto pointer-events-none max-w-sm sm:max-w-xs px-5 py-2 mt-6 sm:my-auto"
                        />
                        <div className="sm:h-[350px] relative gap-1 z-10 flex flex-col p-5 pt-3 sm:pt-12 justify-start items-start transition-all sm:w-[300px] h-48">
                          <h4 className="w-full my-0 text-xl text-white font-semibold text-left">
                            {item.title}
                          </h4>
                          <div
                            // overflow-y-scroll
                            className="text-sm w-full overflow-hidden
                              "
                          >
                            <SimpleBarReact
                              forceVisible={true}
                              style={{
                                maxHeight: textAreaHeight(),
                                opacity: 1,
                              }}
                              autoHide={false}
                            >
                              <p className="relative w-full pr-2 flex flex-shrink-0 text-left text-sm">
                                {item.description}
                              </p>
                            </SimpleBarReact>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    <div className="w-8 h-3/4 my-auto bg-gradient-to-l from-slate-900 to-slate-700 flex flex-col">
                      <div className="text-xs text-white/60 font-mono py-3">
                        {props.carouselContent[i + 1] ? '0' + (i + 2) : '01'}
                      </div>
                      <div
                        // style={{ writingMode: 'vertical-lr' }}
                        className="[writing-mode:vertical-lr] text-start tracking-wider text-gray-300 pb-3"
                      >
                        {props.carouselContent[i + 1]
                          ? props.carouselContent[i + 1].title
                          : props.carouselContent[0].title}
                      </div>
                    </div>
                  </div>

                  <a
                    href={props.carouselContent[i].link}
                    className="absolute z-30 bottom-1 right-10 m-2 sm:m-3 text-xs text-white/60 font-mono"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill="#d3b089"
                        d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03L9.28 7.78a.751.751 0 0 1-1.042-.018a.751.751 0 0 1-.018-1.042l3.75-3.75l-1.543-1.543A.25.25 0 0 1 10.604 1Z"
                      />
                    </svg>
                  </a>
                </SwiperSlide>
              );
            })}
          </AnimatePresence>
        </Swiper>
        {/* <div className="absolute pointer-events-none z-10 w-6 -right-4 h-full bg-gradient-to-l from-black to-transparent" /> */}
      </div>
    </div>
  );
};

export default CarouselASUS;
