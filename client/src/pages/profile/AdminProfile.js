import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";


import Swal from "sweetalert2";
import Axios from "axios";
import Modal from "@mui/material/Modal";
import Loading from "../../components/loading";
import { BASE_URL } from "../../constants";


const AdminProfile = () => {

  const [edit, setEdit] = useState(false);

  let data = {
    name: "Sanjith",
    email: "sanjtih@gmail.com",
    phone: "929923892",
  };

  
  const [loadingOpen, setLoadingOpen] = useState(false);

  const [userData, setUserData] = useState({name: "", email: "", phone: ""})


  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
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
        setUserData(response.data.result)
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


  const getInitials = (data) => {

    console.log(data)
    let names = data.split(' ')
    console.log(names)
    if (names.length > 1) {
      return (names[0][0] + names[1][0]).toUpperCase()
    } else {
      return (names[0][0] + names[0][1]).toUpperCase()
    }
    
  }
  return ( 
    <div className="bg-[#fbf7ff] w-full min-h-full flex flex-col  items-center p-10">
      <div className="flex flex-col w-5/6 gap-24">
        <div className=" inline-flex flex-row justify-between">
          <span className=" self-center text-7xl font-bold text-primary font-primary">
            My<br/>Profile
          </span>

          <div>
            <Avatar
              sx={{
                bgcolor: "#E5B8F4",
                color: "#2D033B",
                width: 128,
                height: 128,
              }}
            >
              <span className="font-semibold text-5xl">
                {userData.name.length>1 && getInitials(userData.name)}
              </span>
            </Avatar>
          </div>
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
              className="w-2/6 h-8 appearance-none bg-white focus:border-black focus:ring-0 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              disabled
              value={userData.name}
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
              className="w-2/6 h-8 appearance-none bg-white focus:border-black focus:ring-0 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              disabled
              value={userData.email}
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
              // disabled={edit? "false": "true"}
              disabled={edit? false: true}
              value={userData.phone}
              onChange={(e) => setUserData(curr => {return {...curr, [e.target.id]: e.target.value}})}
            />
          </div>

          <div className="flex flex-row justify-center  mt-10">
            <button
              className="rounded-md font-inter bg-primary text-white w-32 h-10 hover:bg-accent-primary_hover font-bold hover:text-white"
              onClick={() => setEdit(curr => !curr)}
            >
              {edit==0? "Edit": "Save changes"}
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

export default AdminProfile;
