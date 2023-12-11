import React, {useContext} from "react";
import LogoutIcon from "@mui/icons-material/Logout";

import Swal from "sweetalert2";
import Axios from "axios";
import Modal from "@mui/material/Modal";
import { BASE_URL } from "../constants";
import Loading from "../components/loading";

import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import HistoryIcon from "@mui/icons-material/History";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import SchoolIcon from "@mui/icons-material/School";

import DropDowm from "../components/Input/DropDown";
import PersonIcon from "@mui/icons-material/Person";

import { Box } from "@mui/material";

import { Tooltip } from "@mui/material";

import { useEffect } from "react";


import { ParentContext } from "../context/ParentContext";

const ParentDashboard = () => {
  // animate on scroll initialization

  const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const navigate = useNavigate();


  
  const { currentStudent, setCurrentStudent, userData, setUserData } = useContext(ParentContext);

  const [open, setOpen] = useState(false);
  const [loadingOpen, setLoadingOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("Parent");

  useEffect(() => {
    if(currentStudent == undefined) {
      setOpen(true)
      fetchStudents();
    }
  }, [setCurrentStudent]);

  const fetchName = async () => {
    try {
      setLoadingOpen(true);
      let response = await Axios.get(`${BASE_URL}/parent/getStudentProfile/${currentStudent}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLoadingOpen(false);

      // console.log(response)
      if (response.status == 201) {
        setUserData(response.data.result);
      }
    } catch (err) {
      setLoadingOpen(false);

      if (!err.response) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Couldn't reach server",
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response.data.message,
        });
      }
    }
  };

  const fetchStudents = async () => {
    try {
      setLoadingOpen(true);
      let response = await Axios.get(`${BASE_URL}/parent/getStudents`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLoadingOpen(false)
      // console.log(response)
      if (response.status == 200 || response.status == 304) {
        setStudents(response.data.result);
        
        setOpen(true)
      }
    } catch (err) {
      setLoadingOpen(false);

      if (!err.response) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Couldn't reach server",
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response.data.message,
        });
      }
    }
  };

  const handleClose = async () => {
    
        if(students.length>0) {
          fetchName();
        }
        setOpen(false)
    
  };

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
      <div className="pt-36 font-bold text-primary text-7xl flex flex-col items-center gap-5">
        <div>Hello, {userData.name}</div>
        <div className="flex flex-row justify-between gap-6">
          <div>
            <Tooltip title="Switch User">
              <SwitchAccountIcon
                className="text-primary"
                sx={{ fontSize: "2.5rem !important" }}
                onClick={() => setOpen(true)}
              />
            </Tooltip>
          </div>

          <div>
            <Tooltip title="Add Student">
              <PersonAddIcon
                className="text-primary"
                sx={{ fontSize: "2.5rem !important" }}
                onClick={() => navigate("/parent/addStudent")}
              />
            </Tooltip>
          </div>

          <div>
            <Tooltip title="Logout">
              <LogoutIcon
                className="text-primary"
                sx={{ fontSize: "2.5rem !important" }}
                onClick={logout}
              />
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 grid-rows-2 w-8/12 h-96 mt-20 gap-4">
        <div className="w-full h-full">
          <button
            className="rounded-tl-xl bg-primary text-white w-full h-full hover:bg-[#fbf7ff] hover:text-primary hover:border-primary hover:border-4 hover:rounded-tl-lg"
            onClick={() => navigate("/parent/profile")}
          >
            {" "}
            <PersonIcon sx={{ fontSize: "6rem !important" }} />
            <div>Profile</div>
          </button>
        </div>

        <div className="w-full h-full">
          <button
            className="rounded-tr-xl bg-primary text-white w-full h-full hover:bg-[#fbf7ff] hover:text-primary hover:border-primary hover:border-4 hover:rounded-br-lg"
            onClick={() => navigate("/")}
          >
            <CalendarMonthIcon sx={{ fontSize: "6rem !important" }} />
            <div>My Schedule</div>
          </button>
        </div>

        <div className="w-full h-full">
          <button
            className="rounded-bl-xl bg-primary text-white w-full h-full hover:bg-[#fbf7ff] hover:text-primary hover:border-primary hover:border-4 hover:rounded-tr-lg"
            onClick={() => navigate("/parent/progress")}
          >
            <SchoolIcon sx={{ fontSize: "6rem !important" }} />
            <div>My Progress</div>
          </button>
        </div>

        <div className="w-full h-full">
          <button
            className="rounded-br-xl bg-primary text-white w-full h-full hover:bg-[#fbf7ff] hover:text-primary hover:border-primary hover:border-4 hover:rounded-bl-lg"
            onClick={() => navigate("/parent/history")}
          >
            <HistoryIcon sx={{ fontSize: "6rem !important" }} />
            <div>Class History and Feedbacks</div>
          </button>
        </div>
      </div>

      <Modal open={open}>
        <Box sx={boxStyle} className="flex flex-col items-center">
          <div className="flex flex-row gap-4">
            <div className="font-primary text-primary font-bold text-xl pt-1">
              Select Student
            </div>
            <DropDowm data={students} handleDropChange={setCurrentStudent} />
          </div>

          <button
            className="mt-6 w-24 text-white bg-primary  hover:bg-accent-secondary_hover font-bold py-2 px-4 rounded"
            onClick={handleClose}
          >
            Confirm
          </button>
        </Box>
      </Modal>

      <Modal open={loadingOpen}>
        <Loading />
      </Modal>
    </div>
  );
};

export default ParentDashboard;
