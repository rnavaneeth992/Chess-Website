import React, { useState } from "react";
import { Modal } from "@mui/material";
import Loading from "./loading";
import MyGrid from "./MyGrid";
import Axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../constants";
import { exportExcel } from "../utils/utilities";

const ViewSignUp = () => {
  const [usrType, setUsrType] = useState(0);
  const [loadingOpen, setLoadingOpen] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);

  const fetchData = async (utype) => {
    try {
      setLoadingOpen(true);
      let response = await Axios.get(`${BASE_URL}/admin/get${utype}Signup`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLoadingOpen(false);

      console.log(response);
      if (response.status == 201) {
        setFetchedData(response.data.result);
      }
    } catch (err) {
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
      <div className="flex flex-col gap-8 w-5/6  h-5/6">
        <div className=" inline-flex flex-row justify-between">
          <span className=" self-center text-7xl font-bold text-primary font-primary">
            Registered<br/>Users
          </span>
        </div>

        <div className="flex flex-col gap-6 items-center mt-10">
          <div className="flex flex-row justify-center gap-5 mb-5">
            <button
              className={`${
                usrType == 1
                  ? "bg-white text-primary "
                  : "text-white bg-primary "
              } w-40 border-primary border-2 hover:bg-accent-tertiary font-bold py-2 px-4 rounded`}
              onClick={() => {
                setUsrType(1);
                fetchData("Parent");
              }}
            >
              Parents
            </button>
            <button
              className={`${
                usrType == 2
                  ? "bg-white text-primary "
                  : "text-white bg-primary "
              } w-40 border-primary border-2 hover:bg-accent-tertiary font-bold py-2 px-4 rounded`}
              onClick={() => {
                setUsrType(2);
                fetchData("Instructor");
              }}
            >
              Instructors
            </button>
          </div>

          {fetchedData.length > 0? (
            <>
              <MyGrid data={fetchedData} />
              <div className="flex flex-row justify-center mt-10 mb-10">
                <button
                  className="text-white w-40 bg-primary  hover:bg-accent-secondary_hover font-bold py-2 px-4 rounded"
                  onClick={() => exportExcel(fetchedData, "registered-users")}
                >
                  Export to excel
                </button>
              </div>
            </>
          ): <div>No record found!!</div>}
        </div>
      </div>
      <Modal open={loadingOpen}>
        <Loading />
      </Modal>
    </div>
  );
};

export default ViewSignUp;
