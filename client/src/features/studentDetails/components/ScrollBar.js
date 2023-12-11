import React from "react";
import { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import ModuleBtn from "./ModuleBtn";

import Swal from "sweetalert2";
import Axios from "axios";
import Modal from "@mui/material/Modal";
import { BASE_URL } from "../../../constants";
import Loading from "../../../components/loading";

const ScrollBar = ({setSelectedModule}) => {

  let scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);
  const [loadingOpen, setLoadingOpen] = useState(true);
  const [data, setData] = useState()

  // let data = [
  //   { name: "module 1", status: "progress" },
  //   { name: "module 2", status: "progress" },
  //   { name: "module 3", status: "progress" },
  //   { name: "module 4", status: "progress" },
  //   { name: "module 5", status: "progress" },
  //   { name: "module 6", status: "progress" },
  // ];


  useEffect(() => {
    fetchModules()
  }, []);


  const fetchModules = async () => {

    try {
        let response = await Axios.get(`${BASE_URL}/parent/moduleHistory/1`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLoadingOpen(false);

      // console.log(response)
      if (response.status == 201) {
        // console.log(response.data.result)
        setData(response.data.result);
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
  //Slide click
  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);
  };

 

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
  };

  return (
    <div className="hscroll h-fit">
      <button
        type="button"
        className="text-white bg-primary hover:border hover:bg-accent-primary_hover hover:outline-purple-700 hover:text-white font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center ml-2 mr-2"
        onClick={() => slide(-50)}
      >
        {/* <i className="fa fa-angle-left"></i> */}
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <ul className="hscroll-ul" ref={scrl} onScroll={scrollCheck}>
        {!loadingOpen? data.map((d, i) => (
          // <li className='hscroll-li'><button className='btn'>{d}</button></li>
          <ModuleBtn name={"Module " + d.moduleId} status={d.status} myIndex={i+1} selectModule={setSelectedModule} />
        )) : <></>}
      </ul>

      <button
        type="button"
        className="text-white bg-primary hover:border hover:bg-accent-primary_hover  hover:outline-purple-700 hover:text-white font-medium rounded-lg text-sm p-2.5 ml-2.5 text-center inline-flex items-center mr-2"
        onClick={() => slide(+50)}
      >
        {/* <i className="fa fa-angle-left"></i> */}
        <FontAwesomeIcon icon={faAngleRight} />
      </button>

      <Modal open={loadingOpen}>
        <Loading />
      </Modal>
    </div>
  );
};

export default ScrollBar;
