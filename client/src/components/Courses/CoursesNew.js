import React, { useState } from "react";

import { coursesData } from "../../data";
import BookDemo from "../Home/components/BookDemo";

const CoursesNew = () => {
  const { subtitle1, subtitle2, list } = coursesData;
  const baseURL =
    process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/";
  //const baseURL = "http://localhost:5000"
  console.log(baseURL);

  //For demo component
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    // <section className="relative">
    //   <div className="container-fluid mx-auto">
    //     <div
    //       className="bg-tertiary min-h-[600px]"
    //       data-aos="fade-up"
    //       data-aos-offset="300"
    //     >
    <section id="courses" className="relative">
      <div className="absolute inset-0 flex flex-col">
        <div className="flex-1"></div>
        {/* <div className="flex-1 bg-tertiary"></div> */}
      </div>
      <h2 className="h2 text-center" data-aos="fade-down" data-aos-delay="300">
        Courses We Offer
      </h2>
      <br />
      <h3
        className="h3card text-center m-4 md:m-6 lg:m-8 xl:m-10"
        data-aos="fade-down"
        data-aos-delay="300"
      >
        {subtitle1}
        <br />
        {subtitle2}
      </h3>

      <div className="mx-auto grid max-h-2xl max-w-4xl lg:grid-cols-2 gap-16 lg:gap-16 py-24 px-4 sm:px-6 lg:px-8 ">
        {list.map((course, index) => (
          <div
            key={index}
            className="flex-1 cursor-pointer transform transition duration-500 hover:scale-110 md:m-0 sm:m-7"
          >
            <div
              key={course.title}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg flex flex-col text-center"
              data-aos="fade-up"
              data-aos-delay={course.delay}
            >
              <h2 className="h2card text-xl sm:text-2xl">{course.title}</h2>
              <p className="mt-2 text-50% leading-6 text-primary text-sm sm:text-base">
                {course.description}
              </p>

              {/* Price details */}
              <div className="-mx-4 mt-4 rounded-lg bg-tertiary p-4 sm:-mx-6 sm:p-6">
                <p className="items-center font-semibold text-primary text-sm sm:text-base">
                  <span>{course.currency}</span>
                  <span className="ml-2 h3card">${course.price}</span>
                  <span className="ml-1">{course.classes}</span>
                  <br />
                  <span className="ml-1">${course.sessionPrice} per class</span>
                </p>
              </div>

              {/*Features*/}
              <ul className="mt-6 space-y-4 flex-1">
                {course.features.map((feature) => (
                  <li key={feature} className="flex leading-6 text-primary">
                    <svg
                      className="h-5 w-5 text-primary shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-check"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                    </svg>

                    <span className="ml-3">{feature}</span>
                  </li>
                ))}
              </ul>

              {/*Book*/}
              <a
                href="#_"
                className="h3card mt-4 sm:mt-8 block rounded-lg bg-tertiary px-4 py-2 text-center text-sm text-primary shadow-md hover:bg-primary hover:text-tertiary sm:p-2"
                onClick={handleOpen}
              >
                {course.cta}
              </a>
              <a
                target="_blank"
                href={`${baseURL}/files/${course.syllabus}`}
                className="h3card mt-4 sm:mt-8 block rounded-lg bg-tertiary px-4 py-2 text-center text-sm text-primary shadow-md hover:bg-primary hover:text-tertiary sm:p-2"
              >
                Download syllabus
              </a>
            </div>
          </div>
        ))}
      </div>

      <BookDemo open={open} setOpen={setOpen} />
    </section>
  );
};
export default CoursesNew;
