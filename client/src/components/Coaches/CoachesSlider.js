import React from "react";

// import testimonials data
import { coachesData } from "../../data";

// import swiper react components
import { Swiper, SwiperSlide } from "swiper/react";

// import swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./slider.css";

// import required modules
import { Pagination } from "swiper";

const CoachesSlider = () => {
  return (
    <Swiper
      slidesPerView={"auto"}
      centeredSlides={true}
      spaceBetween={20}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {coachesData.map((slide, index) => {
        // destructure slide
        const { image, message, name, web, delay } = slide;
        return (
          // slide
          <SwiperSlide
            key={index}
            className="bg-white rounded-[20px] border border-accent-primary xl:max-w-[500px] max-h-[330px] pt-[60px] px-[20px] xl:px-[70px] pb-[50px] flex flex-col items-center xl:flex-row gap-x-[30px] shadow-xl"
          >
            {/* avatar image */}
            <img src={image} width="120px" height="120px" alt="" />

            {/* text */}
            <div className="text-center xl:text-left">
              <div className="text-lg text-primary font-bold">{name}</div>
              <div className="mb-4 font-semibold text-accent-primary">{web}</div>
              <p className="max-w-[240px]">{message}</p>
            </div>
          </SwiperSlide>

        );
      })}
    </Swiper>
  );
};

export default CoachesSlider;
