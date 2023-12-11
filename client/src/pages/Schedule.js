import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import Modal from "@mui/material/Modal";
import { BASE_URL } from "../constants";
import Loading from "../components/loading";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const Schedule = () => {
  // let events = [
  //   {
  //     start: moment().toDate(),
  //     end: moment().add(1, "days").toDate(),
  //     title: "Some title",
  //   },
  // ];

  const [loadingOpen, setLoadingOpen] = useState(true);
  const [events, setEvents] = useState()

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoadingOpen(true);
      let response = await Axios.get(`${BASE_URL}/parent/calenderSchedule/1`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLoadingOpen(false);

      // console.log(response)
      if (response.status == 201) {
        // console.log(response.data.result);
        // setClassHistory(response.data.result);
        setEvents(response.data.result)
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
            Class
            <br />
            Schedule
          </span>
        </div>
        <div className="flex flex-col w-full items-center">
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={events}
            style={{
              height: "100vh",
              width: "100%",
            }}
          />
        </div>
      </div>

      <Modal open={loadingOpen}>
        <Loading />
      </Modal>
    </div>
  );
};

export default Schedule;
