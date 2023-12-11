import React, { useState, useEffect } from "react";

// import animate on scroll
import Aos from "aos";
import "aos/dist/aos.css";

// import components
import Home from "../Home/Home";
import About from "../About/About";
import Benefits from "../Benefits/Benefits";
//import Courses from "../Courses/Courses";
import CoursesNew from "../Courses/CoursesNew";
import Coaches from "../Coaches/Coaches";
import Contact from "../Contact/Contact";

import "../../Nav.css";
import Testimonials from "../../features/testimonials/index";

const Landing = () => {
  // animate on scroll initialization

  useEffect(() => {
    Aos.init({
      duration: 800,
      offset: 0,
    });
  }, []);

  return (
    <section style={{ margin: 0, padding: 0, boxSizing: 'border-box', overflow: 'hidden' }}>
      {/* <div>
        <Navbar />
      </div> */}

      {/* <div className="right"> */}
      <Home />
      <Benefits />
      <About />
      <CoursesNew />
      <Coaches />
      <Testimonials />
      <Contact />
      {/* <Students /> */}
      {/* <Footer /> */}
      {/* </div> */}
    </section>
  );
};

export default Landing;
