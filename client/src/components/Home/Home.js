import React, { useRef, useState, useEffect } from "react";

// import home data
import { homeData } from "../../data";

//import icons
import { BsArrowRight } from "react-icons/bs";
import { Modal } from "@mui/material";
import SignupLogin from "../Login/SignupLogin";

import "./Home.css";
import BookDemo from "./components/BookDemo";
import Loading from "../loading";

const Home = () => {
  const { title, subtitle, book, login, image, bgimg, logo } = homeData;
  const modalRef = useRef();

  const showDialog = () => {
    console.log("hello");
  };

  const [logOpen, setLogOpen] = useState(false);
  const handleLogClose = () => {
    setLogOpen(false);
  };

  const [loadingOpen, setLoadingOpen] = useState(false);

  //For demo component
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div
      id="home"
      className="bg-cover bg-[url('../src/assets/img/bg.png')]"
      // data-aos="fade-up"
      // data-aos-offset="350"
    >
      <div className="container mx-auto">
        <div className=" rounded-[50px] min-h-screen pb-12 flex flex-col text-center xl:flex-row xl:items-center xl:text-left  xl:gap-x-[60px] xl:pb-0 xl:pl-10">
          {/* text */}

          <div className="flex-1 xl:pr-12">
            <div className="flex items-center justify-center xl:justify-start text-center xl:text-left my-8">
              <img className="w-12 h-12 mr-4" src={logo} alt="Logo" />
              <h1
                className="h2 text-lg md:text-xl lg:text-2xl xl:text-3xl"
                data-aos="fade-down"
                data-aos-delay="400"
              >
                Young Visionaries Chess Club
              </h1>
            </div>
            <h1
              className="h2 mb-4 text-lg md:text-xl lg:text-2xl xl:text-3xl"
              data-aos="fade-down"
              data-aos-delay="400"
            >
              {title}
            </h1>

            <div className="relative space-x-4 flex flex-col items-center md:items-start md:flex-row md:space-x-4">
              <button
                className="btn btn-primary flex items-center gap-x-[20px] group font-bold hover:text-white mb-4 md:mb-0"
                data-aos="fade-up"
                data-aos-delay="600"
                onClick={handleOpen}
              >
                Book a demo
                <BsArrowRight className="text-2xl text-accent-quaternary group-hover:text-primary transition" />
              </button>

              <button
                className="btn btn-primary font-bold hover:text-white"
                data-aos="fade-up"
                data-aos-delay="600"
                onClick={() => setLogOpen(true)}
              >
                {login}
              </button>

              <Modal ref={modalRef} open={logOpen} onClose={handleLogClose}>
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <SignupLogin setLoading={setLoadingOpen} />
                </div>
              </Modal>
            </div>
          </div>

          <BookDemo open={open} setOpen={setOpen} setLoading={setLoadingOpen} />

          {/* image */}

          <div className="flex-1" data-aos="fade-up" data-aos-delay="700">
            <img src={image} alt="" />
          </div>
        </div>
      </div>
      <Modal open={loadingOpen}>
        <Loading />
      </Modal>
    </div>
  );
};
export default Home;
