import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";

import Swal from "sweetalert2";
import Axios from "axios";
import Modal from "@mui/material/Modal";
import Loading from "./loading";
import { BASE_URL } from "../constants";


import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";

import DropDowm from "./Input/DropDown";
import { exportExcel } from "../utils/utilities";


export default function ViewReq() {
  const [ready, setReady] = useState(false);
  const [requests, setRequests] = useState([]);
  const [open, setOpen] = useState(false);
  const [reqIndex, setreqIndex] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [insID, setInsID] = useState("");
  const [loadingOpen, setLoadingOpen] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [demoOpt, setDemoOpt] = useState(1)

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

  let instructorsD = [
    {
      id: "1233",
      name: "navanneth",
    },
    {
      id: "1233",
      name: "navanneth",
    },
    {
      id: "1233",
      name: "navanneth",
    },
    {
      id: "1233",
      name: "navanneth",
    },
  ];

  useEffect(() => {
    fetchReq();
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      setLoadingOpen(true);
      let response = await Axios.get(`${BASE_URL}/admin/getInstructorIds`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLoadingOpen(false);

      // console.log(response)
      if (response.status == 201) {
        setInstructors(response.data.result);
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

  const fetchReq = async () => {
    try {
      setLoadingOpen(true);
      let response = await Axios.get(`${BASE_URL}/admin/demos`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      // console.log(response)
      if (response.status == 201) {
        // console.log(response.data.result);

        // let filteredData = [];
        // filteredData.push(data.filter((obj) => obj.status == 0));
        // filteredData.push(data.filter((obj) => obj.status == 1));
        // filteredData.push(data.filter((obj) => obj.status == 2));

        // console.log(filteredData);
        setRequests(response.data.result);
        // console.log(response.data.result);
        // setLoadingOpen(false);
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

  const openMyDialog = (index) => {
    // console.log(index);
    setreqIndex(index);
    handleOpen();
  };

  const bookInstructor = async (insID) => {
    try {
      setLoadingOpen(true);
      let response = await Axios.put(
        `${BASE_URL}/admin/instructorDemo/${reqIndex}`,
        { instructorId: insID },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setLoadingOpen(false);

      // console.log(response)
      if (response.status == 201) {
        let requestObj = requests.find((obj) => obj.id == reqIndex);
        // console.log(requestObj);

        console.log(requestObj);
        console.log(instructors);
        requestObj = {
          ...requestObj,
          status: 1,
          instructorId: insID,
          instructor: {
            name:
              instructors[instructors.findIndex((obj) => obj.id == insID)].name,
          },
        };

        setRequests((curr) => {
          let updatedCurr = curr.filter((obj) => obj.id != reqIndex);
          // console.log(updatedCurr)
          return [...updatedCurr, requestObj];
        });

        // setRequests(filteredData);
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
    handleClose();
  };

  const markCompleted = async (id) => {
    try {
      setLoadingOpen(true);
      let response = await Axios.put(
        `${BASE_URL}/admin/instructorDemo/${id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setLoadingOpen(false);

      // console.log(response)
      if (response.status == 201) {
        let selectedIdx = requests.findIndex((obj) => obj.id == id);
        let selectedObj = requests[selectedIdx];

        setRequests((curr) => {
          let updatedCurr = curr.filter((obj) => obj.id != selectedObj.id);
          return [...updatedCurr, { ...selectedObj, status: 2 }];
        });

        // setRequests(filteredData);
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

  return (
    <div className="bg-[#fbf7ff] w-full min-h-full flex flex-col  items-center p-10">
      <div className="flex flex-col w-5/6 gap-24">
        <div className=" inline-flex flex-row justify-between">
          <span className=" self-center text-7xl font-bold text-primary font-primary">
            Demo
            <br />
            Requests
          </span>

        
        </div>
      <div className="flex flex-col w-full items-center">
        <div class="inline-flex rounded-lg shadow-sm">
          <button
            type="button"
            className="rounded-l-lg border-r-2 border-white text-white py-2 px-4 bg-primary  hover:bg-accent-secondary_hover font-bold "
            onClick={()=> setDemoOpt(1)}
          >
            Pending
          </button>
          <button
            type="button"
            className=" text-white  border-r-2 border-white  bg-primary py-2 px-4  hover:bg-accent-secondary_hover font-bold "
            onClick={()=> setDemoOpt(2)}
          >
            Assigned
          </button>
          <button
            type="button"
            onClick={()=> setDemoOpt(3)}
            className="rounded-r-lg  text-white py-2 px-4 bg-primary  hover:bg-accent-secondary_hover font-bold "
          >
            Completed
          </button>
        </div>
        {requests && requests.length>0 && demoOpt==1 && (
          <>
             <div className="w-full flex flex-col mt-12 pt-8 pl-20 pb-20 bg-white border-gray-200 border rounded-md shadow-sm">
            <div className="flex flex-row w-full mb-10  justify-center">
                <legend class="mx-auto px-4 text-primary text-3xl  font-semibold">
                  Pending Demos
                </legend>
            </div>
              {requests != null &&
                requests
                  .filter((obj) => obj.status == 0)
                  .map((obj, id) => (
                    <Accordion className="w-4/6">
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div className="flex flex-row justify-start gap-2">
                          <span className="font-bold text-xl text-slate-500">
                            {obj.id}
                          </span>
                          <span className="h3card">{obj.name}</span>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="flex flex-col">
                          <span className="font-primary text-primary text-xl">
                            Email:{" "}
                            <span className="text-slate-700">{obj.email}</span>
                          </span>
                          <span className="font-primary text-primary text-xl">
                            Contact:{" "}
                            <span className="text-slate-700">
                              {obj.contact}
                            </span>
                          </span>
                          <span className="font-primary text-primary text-xl">
                            Skill Level:{" "}
                            <span className="text-slate-700">{obj.level}</span>
                          </span>
                          <span className="font-primary text-primary text-xl">
                            Inspiration:{" "}
                            <span className="text-slate-700">
                              {obj.inspiration.length > 0
                                ? obj.inspiration
                                : "N/A"}
                            </span>
                          </span>
                          <span className="font-primary text-primary text-xl">
                            Experience:{" "}
                            <span className="text-slate-700">
                              {obj.experience.length > 0
                                ? obj.experience
                                : "N/A"}
                            </span>
                          </span>
                          <span className="font-primary text-primary text-xl">
                            Experience Year:{" "}
                            <span className="text-slate-700">
                              {obj.experienceYear.length > 0
                                ? obj.experienceYear
                                : "N/A"}
                            </span>
                          </span>
                          <span className="font-primary text-primary text-xl">
                            Insterest Level:{" "}
                            <span className="text-slate-700">
                              {obj.interest}
                            </span>
                          </span>
                          <span className="font-primary text-primary text-xl">
                            Grade:{" "}
                            <span className="text-slate-700">{obj.grade}</span>
                          </span>
                          <span className="font-primary text-primary text-xl">
                            Preferred Demo time:{" "}
                            <span className="text-slate-700">
                              {obj.demoTime}
                            </span>
                          </span>
                          <span className="font-primary text-primary text-xl">
                            Preferred Contact Time:{" "}
                            <span className="text-slate-700">
                              {obj.contactTime}
                            </span>
                          </span>
                          <span className="font-primary text-primary text-xl">
                            Request Created At:{" "}
                            <span className="text-slate-700">
                              {obj.createdAt}
                            </span>
                          </span>
                          <span className="font-primary text-primary text-xl">
                            Last Updated:{" "}
                            <span className="text-slate-700">
                              {obj.updatedAt}
                            </span>
                          </span>
                        </div>
                        <div className="flex justify-center">
                          <button
                            className="text-white w-40 bg-primary  hover:bg-accent-secondary_hover font-bold py-2 px-4 rounded"
                            onClick={() => openMyDialog(obj.id)}
                          >
                            Assign instructor
                          </button>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  ))}
            </div>
          </>
        )}

        {requests && requests.length>0 && demoOpt==2 && (
          <>
              <div className="w-full flex flex-col mt-12 pt-8 pl-20 pb-20 bg-white border-gray-200 border rounded-md shadow-sm">
            <div className="flex flex-row w-full mb-10  justify-center">
                <legend class="mx-auto px-4 text-primary text-3xl  font-semibold">
                  Assigned Demos
                </legend>
            </div>
              {requests
                .filter((obj) => obj.status == 1)
                .map((obj, id) => (
                  <Accordion className="w-4/6">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <div className="flex flex-row justify-start gap-2">
                        <span className="font-bold text-xl text-slate-500">
                          {obj.id}
                        </span>
                        <span className="h3card">{obj.name}</span>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="flex flex-col">
                        <span className="font-primary text-primary text-xl">
                          Email:{" "}
                          <span className="text-slate-700">{obj.email}</span>
                        </span>
                        <span className="font-primary text-primary text-xl">
                          Contact:{" "}
                          <span className="text-slate-700">{obj.contact}</span>
                        </span>
                        <span className="font-primary text-primary text-xl">
                          Skill Level:{" "}
                          <span className="text-slate-700">{obj.level}</span>
                        </span>
                        <span className="font-primary text-primary text-xl">
                          Inspiration:{" "}
                          <span className="text-slate-700">
                            {obj.inspiration.length > 0
                              ? obj.inspiration
                              : "N/A"}
                          </span>
                        </span>
                        <span className="font-primary text-primary text-xl">
                          Experience:{" "}
                          <span className="text-slate-700">
                            {obj.experience.length > 0 ? obj.experience : "N/A"}
                          </span>
                        </span>
                        <span className="font-primary text-primary text-xl">
                          Experience Year:{" "}
                          <span className="text-slate-700">
                            {obj.experienceYear.length > 0
                              ? obj.experienceYear
                              : "N/A"}
                          </span>
                        </span>
                        <span className="font-primary text-primary text-xl">
                          Insterest Level:{" "}
                          <span className="text-slate-700">{obj.interest}</span>
                        </span>
                        <span className="font-primary text-primary text-xl">
                          Grade:{" "}
                          <span className="text-slate-700">{obj.grade}</span>
                        </span>
                        <span className="font-primary text-primary text-xl">
                          Preferred Demo time:{" "}
                          <span className="text-slate-700">{obj.demoTime}</span>
                        </span>
                        <span className="font-primary text-primary text-xl">
                          Preferred Contact Time:{" "}
                          <span className="text-slate-700">
                            {obj.contactTime}
                          </span>
                        </span>
                        <span className="font-primary text-primary text-xl">
                          Request Created At:{" "}
                          <span className="text-slate-700">
                            {obj.createdAt}
                          </span>
                        </span>
                        <span className="font-primary text-primary text-xl">
                          Last Updated:{" "}
                          <span className="text-slate-700">
                            {obj.updatedAt}
                          </span>
                        </span>
                      </div>

                      <div className="flex flex-col mt-4 mb-4">
                        <span className="font-primary font-semibold text-primary text-xl">
                          Instructor ID:
                          <span className="text-slate-700">
                            {obj.instructorId}
                          </span>
                        </span>

                        <span className="font-primary  font-semibold text-primary text-xl">
                          Instructor Name:
                          <span className="text-slate-700">
                            {obj.instructor.name}
                          </span>
                        </span>
                      </div>
                      <div className="flex justify-center">
                        <button
                          className="text-white w-40 bg-primary  hover:bg-accent-secondary_hover font-bold py-2 px-4 rounded"
                          onClick={() => markCompleted(obj.id)}
                        >
                          Mark As completed
                        </button>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </div>
          </>
        )}

        {requests && requests.length>0 && demoOpt==3 && (
          <>
           

            <div className="w-full flex flex-col mt-12 pt-8 pl-20 pb-20 bg-white border-gray-200 border rounded-md shadow-sm">
            <div className="flex flex-row w-full mb-10  justify-center">
                <legend class="mx-auto px-4 text-primary text-3xl  font-semibold">
                  Completed Demos
                </legend>
            </div>
              {requests
                .filter((obj) => obj.status == 2)
                .map((obj, id) => (
                  <Accordion className="w-4/6">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <div className="flex flex-row justify-start gap-2">
                        <span className="font-bold text-xl text-slate-500">
                          {obj.id}
                        </span>
                        <span className="h3card">{obj.name}</span>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="flex flex-col">
                        <span className="font-primary text-primary text-xl">
                          Email:{" "}
                          <span className="text-slate-700">{obj.email}</span>
                        </span>
                        <span className="font-primary text-primary text-xl">
                          Contact:{" "}
                          <span className="text-slate-700">{obj.contact}</span>
                        </span>
                        <span className="font-primary text-primary text-xl">
                          Skill Level:{" "}
                          <span className="text-slate-700">{obj.level}</span>
                        </span>
                        <span className="font-primary text-primary text-xl">
                          Inspiration:{" "}
                          <span className="text-slate-700">
                            {obj.inspiration.length > 0
                              ? obj.inspiration
                              : "N/A"}
                          </span>
                        </span>
                        <span className="font-primary text-primary text-xl">
                          Experience:{" "}
                          <span className="text-slate-700">
                            {obj.experience.length > 0 ? obj.experience : "N/A"}
                          </span>
                        </span>
                        <span className="font-primary text-primary text-xl">
                          Experience Year:{" "}
                          <span className="text-slate-700">
                            {obj.experienceYear.length > 0
                              ? obj.experienceYear
                              : "N/A"}
                          </span>
                        </span>
                        <span className="font-primary text-primary text-xl">
                          Insterest Level:{" "}
                          <span className="text-slate-700">{obj.interest}</span>
                        </span>
                        <span className="font-primary text-primary text-xl">
                          Grade:{" "}
                          <span className="text-slate-700">{obj.grade}</span>
                        </span>
                        <span className="font-primary text-primary text-xl">
                          Preferred Demo time:{" "}
                          <span className="text-slate-700">{obj.demoTime}</span>
                        </span>
                        <span className="font-primary text-primary text-xl">
                          Preferred Contact Time:{" "}
                          <span className="text-slate-700">
                            {obj.contactTime}
                          </span>
                        </span>
                        <span className="font-primary text-primary text-xl">
                          Request Created At:{" "}
                          <span className="text-slate-700">
                            {obj.createdAt}
                          </span>
                        </span>
                        <span className="font-primary text-primary text-xl">
                          Last Updated:{" "}
                          <span className="text-slate-700">
                            {obj.updatedAt}
                          </span>
                        </span>
                      </div>

                      <div className="flex flex-col mt-4 mb-4">
                        <span className="font-primary font-semibold text-primary text-xl">
                          Instructor ID:
                          <span className="text-slate-700">
                            {obj.instructorId}
                          </span>
                        </span>

                        <span className="font-primary  font-semibold text-primary text-xl">
                          Instructor Name:
                          <span className="text-slate-700">
                            {obj.instructor.name}
                          </span>
                        </span>
                      </div>

                      <div className="flex justify-center">
                        <button
                          className="text-primary w-40 bg-tertiary font-bold py-2 px-4 rounded"
                          disabled
                        >
                          Demo completed
                        </button>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </div>
          </>
        )}
      </div>
        <div className="flex flex-row justify-center mt-10 mb-10">
          <button
            className="text-white w-40 bg-primary  hover:bg-accent-secondary_hover font-bold py-2 px-4 rounded"
            onClick={() => exportExcel(requests, "demo-requests")}
          >
            Export to excel
          </button>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={boxStyle} className="flex flex-col items-center">
          <div className="flex flex-row gap-4">
            <div className="font-primary text-primary font-bold text-xl pt-1">
              Select instructor
            </div>
            <DropDowm data={instructors} handleDropChange={setInsID} />
          </div>

          <button
            className="mt-6 w-24 text-white bg-primary  hover:bg-accent-secondary_hover font-bold py-2 px-4 rounded"
            onClick={() => bookInstructor(insID)}
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
}
