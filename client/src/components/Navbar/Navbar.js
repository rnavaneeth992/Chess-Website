import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Aos from "aos";
import "aos/dist/aos.css";

import { BsWhatsapp } from "react-icons/bs";

import "../../Nav.css";
import { navigationData, menuData } from "../../data";

import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

const Navbar = ({ utype }) => {
  const menuName = menuData["instructor"];

  const userName = "John Doe"; // Used as a prop

  useEffect(() => {
    Aos.init({
      duration: 800,
      offset: 0,
    });
  }, []);
  const menus = navigationData;

  const [displayText, setDisplayText] = useState("none");

  const [menuBox, setMenuBox] = useState(false);
  const [hover, setHover] = useState(false);
  const handleClick = () => {
    setMenuBox(!menuBox);
  };

  return (
    <div>
      <div
        className="hamburger-menu"
        onClick={() => {
          setDisplayText((prevState) =>
            prevState === "block" ? "none" : "block"
          );
        }}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <div className="chat-menu">
        <BsWhatsapp
          onClick={() =>
            window.open(
              "https://wa.me/917448408684?text=Hey%20Young%20Visionaries.%20I%27m%20interested%20to%20avail%20your%20services.",
              "_blank"
            )
          }
          size={30}
          style={{ color: '#9370DB' }}
        />
      </div>
      <nav
        className="navbar"
        style={{ display: window.innerWidth > 600 ? "block" : displayText }}
        data-aos="fade-right"
        data-aos-offset="450"
        onMouseLeave={() => setMenuBox(false)}
      >
        <ul className="navbar-nav">
          <div className="col">
            <li className="logo">
              <HashLink to="/#home" className="nav-link-first rounded-xl">
                <div className="link-text logo-text">Young Visionaries</div>
                <div className="display-logo">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fad"
                    data-icon="angle-double-right"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
                  >
                    <g className="fa-group">
                      <path
                        fill="#E5B8F4"
                        d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                        className="fa-secondary"
                      ></path>
                      <path
                        fill="#E5B8F4"
                        d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                        className="fa-primary"
                      ></path>
                    </g>
                  </svg>
                </div>
              </HashLink>
            </li>
            <li>
              <div
                className="hamburger-navbar"
                onClick={() => {
                  setDisplayText((prevState) =>
                    prevState === "block" ? "none" : "block"
                  );
                }}
              >
                <div className="navbar-bar"></div>
                <div className="navbar-bar"></div>
                <div className="navbar-bar"></div>
              </div>
            </li>

            {/* <div className="display-line w-full">
              <Tooltip title={userName}>
                <Avatar
                  sx={{
                    bgcolor: "#E5B8F4",
                    color: "#2D033B",
                    width: 56,
                    height: 56,
                  }}
                  onClick={handleClick}
                >
                  {userName.split(" ")[0][0] + userName.split(" ")[1][0]}
                </Avatar>
              </Tooltip>
            </div> */}
            <div
              className={` ${
                menuBox ? "block" : "hidden"
              } bg-tertiary flex flex-col mt-2 p-3 rounded-lg`}
            >
              {menuName.map((name, i) => (
                <div className="text-secondary font-bold text-base ml-3">
                  {name}
                </div>
              ))}
            </div>
            {menus.map((menu, i) => (
              <HashLink
                to={menu.link}
                key={i}
                onClick={() => {
                  setDisplayText((prevState) =>
                    prevState === "block" ? "none" : "block"
                  );
                }}
                className="nav-link group flex items-center text-sm font-medium text-tertiary hover:bg-tertiary rounded-xl hover:text-primary"
              >
                <div>{React.createElement(menu.icon, { size: "20" })}</div>
                <div className="link-text text-lg font-bold duration-500 overflow-hidden">
                  {menu.name}
                </div>
              </HashLink>
            ))}
          </div>
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
