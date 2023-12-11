import React, { useEffect } from "react";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";

import { Tooltip } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";

import Swal from "sweetalert2";
import Axios from "axios";
import Modal from "@mui/material/Modal";
import Loading from "../components/loading";
import { BASE_URL } from "../constants";

const AdminDashboard = () => {
  // animate on scroll initialization
  const navigate = useNavigate();

  const [loadingOpen, setLoadingOpen] = useState(false);
  const [name, setName] = useState("Admin")

  useEffect(() => {
    fetchName();
  }, []);

  const fetchName = async () => {
    try {
      setLoadingOpen(true);
      let response = await Axios.get(`${BASE_URL}/admin/profile`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLoadingOpen(false);

      // console.log(response)
      if (response.status == 201) {
        setName(response.data.result.name)
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

  const logout = () => {
    localStorage.clear();
    Swal.fire({
      icon: "success",
      title: "Logout successful",
    });
    navigate("/");
  };

  return (
    <div className="bg-[#fbf7ff] min-h-screen flex flex-col items-center ">
      <div className="pt-36 font-bold text-primary text-7xl flex justify-center gap-5">
        <div>Hello, {name}</div>
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
            onClick={() => navigate("/admin/demo-request")}
          >
            {" "}
            <ContactPhoneIcon sx={{ fontSize: "6rem !important" }} />
            <div>Demo requests</div>
          </button>
        </div>
        <div className="w-full h-full">
          <button
            className="rounded-tr-xl bg-primary text-white w-full h-full hover:bg-[#fbf7ff] hover:text-primary hover:border-primary hover:border-4 hover:rounded-tr-lg"
            onClick={() => navigate("/admin/profile")}
          >
            <PersonIcon sx={{ fontSize: "6rem !important" }} />
            <div>My Profile</div>
          </button>
        </div>
        <div className="w-full h-full">
          <button
            className="rounded-bl-xl bg-primary text-white w-full h-full hover:bg-[#fbf7ff] hover:text-primary hover:border-primary hover:border-4 hover:rounded-bl-lg"
            onClick={() => navigate("/admin/registration")}
          >
            <PeopleIcon sx={{ fontSize: "6rem !important" }} />
            <div>Registered Users</div>
          </button>
        </div>
        <div className="w-full h-full">
          <button
            className="rounded-br-xl bg-primary text-white w-full h-full hover:bg-[#fbf7ff] hover:text-primary hover:border-primary hover:border-4 hover:rounded-br-lg"
            onClick={() => navigate("/admin/addAdmin")}
          >
            <PersonAddIcon sx={{ fontSize: "6rem !important" }} />
            <div>Add Admin</div>
          </button>
        </div>
      </div>


      <Modal open={loadingOpen}>
        <Loading />
      </Modal>
    </div>
  );
};

export default AdminDashboard;
