import React, { useEffect, useContext } from "react";
import Module from "../features/studentDetails/components/Module";
import ScrollBar from "../features/studentDetails/components/ScrollBar";
import "../StudentDetails.css";
import { useState } from "react";

import Swal from "sweetalert2";
import Axios from "axios";
import Modal from "@mui/material/Modal";
import { BASE_URL } from "../constants";
import Loading from "../components/loading";

import { ParentContext } from "../context/ParentContext";


const ClassHistory = () => {

  const [selectedModule, setSelectedModule] = useState(1)
  const [loadingOpen, setLoadingOpen] = useState(true);
  const [classHistory, setClassHistory] = useState();

  const { currentStudent } = useContext(ParentContext);


  useEffect(() => {
    fetchHistory()
  }, []);


  const fetchHistory = async () => {

    try {
      setLoadingOpen(true);
      let response = await Axios.get(`${BASE_URL}/parent/classHistory/1`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLoadingOpen(false);

      // console.log(response)
      if (response.status == 201) {
        console.log(response.data.result)
        setClassHistory(response.data.result);
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

  }


  return (
    <div className="bg-[#fbf7ff] w-full min-h-full flex flex-col  items-center p-10">
      <div className="flex flex-col w-5/6 gap-24">
        <div className=" inline-flex flex-row justify-between">
          <span className=" self-center text-7xl font-bold text-primary font-primary">
            Class
            <br />
            History
          </span>
        </div>
        <div className="flex flex-col w-full items-center">
          <div className=" w-full">
            <ScrollBar setSelectedModule={setSelectedModule} />
          </div>
          {
            loadingOpen? <></> :  <Module data={classHistory[selectedModule-1]} />
          }
        </div>
      </div>

      <Modal open={loadingOpen}>
        <Loading />
      </Modal>
    </div>
  );
};

export default ClassHistory;
