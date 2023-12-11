import React from "react";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";

import { IconButton } from "@mui/material";
import { useState } from "react";
import ViewReq from "../components/ViewReq";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";

import { Tooltip } from "@mui/material";

import Swal from "sweetalert2";

const InstructorDashboard = () => {
  // animate on scroll initialization
  const navigate = useNavigate();

  const [viewReq, setViewReq] = useState(false);

  const logout = () => {
    localStorage.clear();
    Swal.fire({
      icon: "success",
      title: "Logout successful",
    });
    navigate("/");
  };

  return (
    <div className="bg-[#fbf7ff]  min-h-screen flex flex-col items-center ">
      <div className="pt-36 font-bold text-primary text-7xl flex justify-center gap-5">
        <div>Hello, Instructor</div>
        <div>
          <Tooltip title="Logout">
            <LogoutIcon className="text-primary text-5xl" onClick={logout} />
          </Tooltip>
        </div>
      </div>

      <div className="grid grid-cols-2 grid-rows-2 w-8/12 h-96 mt-20 gap-4">
        <div className="w-full h-full">
          <button
            className="rounded-tl-xl bg-primary text-white w-full h-full hover:bg-[#fbf7ff] hover:text-primary hover:border-primary hover:border-4 hover:rounded-tl-lg"
            onClick={() => navigate("/instructor/home")}
          >
            {" "}
            <PersonIcon sx={{ fontSize: '6rem !important' }} />
            <div>Profile</div>
          </button>
        </div>
        <div className="w-full h-full">
          <button
            className="rounded-tr-xl bg-primary text-white w-full h-full hover:bg-[#fbf7ff] hover:text-primary hover:border-primary hover:border-4 hover:rounded-tr-lg"
            onClick={() => navigate("/")}
          >
            <SchoolIcon sx={{ fontSize: '6rem !important' }} />
            <div>My Students</div>
          </button>
        </div>
        <div className="w-full h-full">
          <button
            className="rounded-bl-xl bg-primary text-white w-full h-full hover:bg-[#fbf7ff] hover:text-primary hover:border-primary hover:border-4 hover:rounded-bl-lg"
            onClick={() => navigate("/")}
          >
            <NotificationsIcon sx={{ fontSize: '6rem !important' }} />
            <div>Notifications</div>
          </button>
        </div>
        <div className="w-full h-full">
          <button
            className="rounded-br-xl bg-primary text-white w-full h-full hover:bg-[#fbf7ff] hover:text-primary hover:border-primary hover:border-4 hover:rounded-br-lg"
            onClick={() => navigate("/")}
          >
            <CalendarMonthIcon sx={{ fontSize: '6rem !important' }} />
            <div>My Schedule</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
