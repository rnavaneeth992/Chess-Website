import React, { useState } from "react";
import { Avatar } from "@mui/material";
import Axios from "axios";
import Swal from "sweetalert2";
import validator from "validator";
import Loading from "../components/loading";
import { Modal } from "@mui/material";
import { BASE_URL } from "../constants";
import { NoEncryption } from "@mui/icons-material";

const AddStudent = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loadingOpen, setLoadingOpen] = useState(false);

  const addAdmin = async (e) => {
    e.preventDefault();
    const baseURL =
      process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/";

    try {
      let check = false;

      if (
        userData.name.length > 0 &&
        validator.isEmail(userData.email) &&
        validator.isNumeric(userData.phone) &&
        userData.phone.length == 10
      )
        check = true;

      if (!check) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Invalid/Missing Input",
        });
        return;
      }

      setLoadingOpen(true);
      let response = await Axios.post(`${BASE_URL}/admin/addAdmin`, userData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      // console.log(response)
      if (response.status == 200) {
        setLoadingOpen(false);
        await Swal.fire({
          icon: "success",
          title: "Admin Created Successfully",
        });
      }
    } catch (err) {
      // console.log(err)
      setLoadingOpen(false);
      if (!err.response) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Couldn't reach server",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response.data.message,
        });
      }
    }
  };

  return (
    <div className="bg-[#fbf7ff] w-full min-h-full flex flex-col  items-center p-10">
      <div className="flex flex-col w-5/6 gap-24">
        <div className=" inline-flex flex-row justify-between">
          <span className=" self-center text-7xl font-bold text-primary font-primary">
            Add
            <br />
            Student
          </span>

          <div></div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              for="name"
              className="text-primary font-primary text-[18px] font-semibold"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              className="w-2/6 h-8 appearance-none bg-white focus:border-black focus:ring-0 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              value={userData.name}
              onChange={(e) =>
                setUserData((curr) => {
                  return { ...curr, [e.target.id]: e.target.value };
                })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              for="email"
              className="text-primary font-primary text-[18px] font-semibold"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Email"
              className="w-2/6 h-8 appearance-none bg-white focus:border-black focus:ring-0 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              value={userData.email}
              onChange={(e) =>
                setUserData((curr) => {
                  return { ...curr, [e.target.id]: e.target.value };
                })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              for="phone"
              className="text-primary font-primary text-[18px] font-semibold"
            >
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              className="w-2/6 h-8 appearance-none bg-white focus:border-slate-400 focus:ring-0 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              placeholder="Phone number"
              value={userData.phone}
              onChange={(e) =>
                setUserData((curr) => {
                  return { ...curr, [e.target.id]: e.target.value };
                })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              for="phone"
              className="text-primary font-primary text-[18px] font-semibold"
            >
              Password
            </label>
            <input
              id="password"
              type="text"
              className="w-2/6 h-8 appearance-none bg-white focus:border-slate-400 focus:ring-0 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              placeholder="Password"
              value={userData.password}
              onChange={(e) =>
                setUserData((curr) => {
                  return { ...curr, [e.target.id]: e.target.value };
                })
              }
            />
          </div>
          <div className="flex flex-row justify-center mt-10">
            <button
              className="rounded-md font-inter bg-primary text-white w-32 h-10 hover:bg-accent-primary_hover font-bold hover:text-white"
              onClick={(e) => addAdmin(e)}
            >
              Create Admin
            </button>
          </div>

          {/* <div className="flex flex-col gap-2">
            <label for="name" className="text-primary font-primary text-[18px] font-semibold">Name</label>
            <input id="name" type="text" className="w-2/6 h-8 appearance-none focus:border-black focus:ring-0 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"/>
            </div> */}
        </div>
      </div>
      <Modal open={loadingOpen}>
        <Loading />
      </Modal>
    </div>
  );
};

export default AddStudent;
