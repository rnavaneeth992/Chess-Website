import React, { useState } from "react";

import "../../testimonials.css";
// import swiper react components
import { Swiper, SwiperSlide } from "swiper/react";

// import swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./slider.css";
import TestimonialCard from "../../components/TestimonialCard";
// import required modules
import { Pagination } from "swiper";
import { testimonialData } from "../../data";

const RatingStars = ({ count }) => {
  const stars = Array.from({ length: count }, (_, index) => (
    <svg
      key={index}
      className="w-5 h-5 text-[#FDB241]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ));

  return <div className="flex items-center">{stars}</div>;
};

export default function Testimonials() {
  const [cardOpt, setCardOpt] = useState(1);

  let studentData = testimonialData.studentData

  let parentData = testimonialData.parentData;
  
  return (
    <section
      id="testimonials"
      data-aos="fade-up"
      className="py-12 bg-gray-50 sm:py-16 lg:py-20"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl xl:text-5xl font-pj">
              Our Happy Clients say about us
            </h2>

            <div className="flex flex-row mt-10 justify-center gap-20">
              <button
                class="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group"
                onClick={() => setCardOpt(1)}
              >
                <span
                  class={`absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out  ${
                    cardOpt == 1 ? "bg-white" : "bg-primary"
                  } rounded-md group-hover:mt-0 group-hover:ml-0`}
                ></span>
                <span
                  class={`absolute inset-0 w-full h-full  ${
                    cardOpt == 1 ? "bg-primary" : "bg-white"
                  } rounded-md `}
                ></span>
                <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-primary rounded-md opacity-0 group-hover:opacity-100 "></span>
                <span
                  class={`relative ${
                    cardOpt == 1 ? "text-white" : "text-primary"
                  } transition-colors duration-200 ease-in-out delay-100 group-hover:text-white`}
                >
                  Students
                </span>
              </button>

              <button
                class="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group"
                onClick={() => setCardOpt(2)}
              >
                <span
                  class={`absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out ${
                    cardOpt == 2 ? "bg-white" : "bg-primary"
                  } rounded-md group-hover:mt-0 group-hover:ml-0`}
                ></span>
                <span
                  class={`absolute inset-0 w-full h-full ${
                    cardOpt == 2 ? "bg-primary" : "bg-white"
                  } rounded-md`}
                ></span>
                <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-primary rounded-md opacity-0 group-hover:opacity-100 "></span>
                <span
                  class={`relative ${
                    cardOpt == 2 ? "text-white" : "text-primary"
                  } transition-colors duration-200 ease-in-out delay-100 group-hover:text-white`}
                >
                  Parents
                </span>
              </button>
            </div>
          </div>
          {cardOpt == 1 && (
            <div className="relative mt-10 md:mt-24 md:order-2">
              <div className="absolute  -inset-x-1 inset-y-12 md:-inset-x-2 md:-inset-y-6">
                {/* <div
                  className="w-4/6 h-4/6 max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter"
                  style={{
                    background:
                      "linear-gradient(90deg, #E5B8F4 -0.55%, #E5B8F4 22.86%, #E5B8F4 48.36%, #E5B8F4 73.33%, #E5B8F4 99.34%)",
                  }}
                /> */}
              </div>
              <div className="relative w-5/6 grid max-w-md grid-cols-1 gap-2 mx-auto md:max-w-none lg:gap-10 md:grid-cols-1">
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
                  {studentData.map((obj, index) => {
                    // destructure slide
                    return (
                      // slide
                      <SwiperSlide
                        key={index}
                        className="bg-white  xl:max-w-[600px] max-h-[330px] flex flex-col items-center xl:flex-row gap-x-[30px] shadow-xl"
                      >
                        <TestimonialCard
                          name={obj.name}
                          avatar={obj.avatar}
                          comment={obj.comment}
                          title={obj.title}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          )}

          {cardOpt == 2 && (
            <div className="relative mt-10 md:mt-24 md:order-2">
              {/* <div className="absolute inset-0">
              <div
                className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter"
                style={{
                  background:
                    "linear-gradient(90deg, #E5B8F4 -0.55%, #E5B8F4 22.86%, #E5B8F4 48.36%, #E5B8F4 73.33%, #E5B8F4 99.34%)",
                }}
              />
            </div> */}
             <div className="relative w-5/6 grid max-w-md grid-cols-1 gap-2 mx-auto md:max-w-none lg:gap-10 md:grid-cols-1">
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
                  {parentData.map((obj, index) => {
                    // destructure slide
                    return (
                      // slide
                      <SwiperSlide
                        key={index}
                        className="bg-white xl:max-w-[600px] max-h-[330px] flex flex-col items-center xl:flex-row gap-x-[30px] shadow-xl"
                      >
                        <TestimonialCard
                          name={obj.name}
                          avatar={obj.avatar}
                          comment={obj.comment}
                          title={obj.title}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
