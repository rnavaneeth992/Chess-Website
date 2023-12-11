import React, { useEffect } from "react";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import AlertDialog from "./AlertDialog";
import { useState } from "react";

const Module = ({data}) => {
  // const moduleData = [
  //   {
  //     sessionId: 1,
  //     title: "Introduction to chess",
  //     description: "Getting started with chess!!",
  //     status: "In progress",
  //     resources: "https://www.google.com/",
  //     classDetails: [
  //       {
  //         classID: 1,
  //         classDate: "27/11/2023",
  //         classDuration: "90",
  //         instructorFdbk: "Navaneeth sucks at chess",
  //         studentFdbk: "IKR, he does suck at chess...",
  //       },
  //       {
  //         classID: 2,
  //         classDate: "27/11/2023",
  //         classDuration: "90",
  //         instructorFdbk: "Navaneeth sucks at chess",
  //         studentFdbk: "IKR, he does suck at chess...",
  //       },
  //       {
  //         classID: 3,
  //         classDate: "27/11/2023",
  //         classDuration: "90",
  //         instructorFdbk: "Navaneeth sucks at chess",
  //         studentFdbk: "IKR, he does suck at chess...",
  //       },
  //     ],
  //   },
  //   {
  //     sessionId: 2,
  //     title: "Introduction to chess",
  //     description: "Getting started with chess!!",
  //     status: "In progress",
  //     resources: "https://www.google.com/",
  //     classDetails: [
  //       {
  //         classID: 4,
  //         classDate: "27/11/2023",
  //         classDuration: "90",
  //         instructorFdbk: "Navaneeth sucks at chess",
  //         studentFdbk: "IKR, he does suck at chess...",
  //       },
  //       {
  //         classID: 5,
  //         classDate: "27/11/2023",
  //         classDuration: "90",
  //         instructorFdbk: "Navaneeth sucks at chess",
  //         studentFdbk: "IKR, he does suck at chess...",
  //       },
  //       {
  //         classID: 6,
  //         classDate: "27/11/2023",
  //         classDuration: "90",
  //         instructorFdbk: "Navaneeth sucks at chess",
  //         studentFdbk: "IKR, he does suck at chess...",
  //       },
  //     ],
  //   },
  //   {
  //     sessionId: 3,
  //     title: "Introduction to chess",
  //     description: "Getting started with chess!!",
  //     status: "In progress",
  //     resources: "https://www.google.com/",
  //     classDetails: [
  //       {
  //         classID: 7,
  //         classDate: "27/11/2023",
  //         classDuration: "90",
  //         instructorFdbk: "Navaneeth sucks at chess",
  //         studentFdbk: "IKR, he does suck at chess...",
  //       },
  //       {
  //         classID: 8,
  //         classDate: "27/11/2023",
  //         classDuration: "90",
  //         instructorFdbk: "Navaneeth sucks at chess",
  //         studentFdbk: "IKR, he does suck at chess...",
  //       },
  //       {
  //         classID: 9,
  //         classDate: "27/11/2023",
  //         classDuration: "90",
  //         instructorFdbk: "Navaneeth sucks at chess",
  //         studentFdbk: "IKR, he does suck at chess...",
  //       },
  //     ],
  //   },
  // ];

  // const [moduleData, setModuleData] = useState(data)

  const moduleData = data
  return (
    <div className=" w-full mt-8">
      {/* <div>Hellow</div> */}
      {moduleData.map((obj, i) => (
        <Accordion className="w-full">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div className="flex flex-row justify-start gap-2">
              <span>
                Session {obj.sessionId}: {obj.title}
              </span>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div class="m-2 p-5 border-b border-gray-200">
              <p class="mb-2 text-black">{obj.description}</p>
              <div class="flex justify-between mb-2">
                <span class="text-gray-500 italic">Status: {obj.status}</span>
                <a
                  href={obj.resources}
                  class="font-medium text-purple-700 hover:underline"
                >
                  Resources
                </a>
              </div>

              <div className=" flex flex-col gap-2 ">
                {obj.classDetails.map((classObj) => (

                  <div className="flex justify-between gap-2 p-4 rounded-md border-primary border shadow-sm bg-[#fbf7ff]">
                    <div className="flex justify-start ">
                      <span className=" font-primary text-primary">Class ID: {classObj.classID}  &nbsp; &nbsp; </span>
                      <span className=" font-primary text-primary">Date: {new Date(classObj.classDate).toISOString().replace(/T.*/,'').split('-').reverse().join('-')} &nbsp; &nbsp; </span>
                      <span className=" font-primary text-primary">Duration: {classObj.classDuration} min</span>
                    </div>
                  <div className="flex justify-end flex-row gap-2">
                    
                    <AlertDialog
                      className="bg-primary"
                      title="Instructor Feedback"
                      content={classObj.instructorFeedback}
                      allowEdit={false}
                      classID={classObj.id}
                    />
                    <AlertDialog
                      className="bg-primary"
                      title="Parent Feedback"
                      content={classObj.studentFeedback}
                      allowEdit={true}
                      classID={classObj.id}                    
                      />
                  </div>
                  </div>
                ))}
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Module;
