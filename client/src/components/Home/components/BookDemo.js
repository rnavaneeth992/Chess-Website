import React, { useState, useEffect, useContext, createContext } from "react";
import MyDialog from "./MyDialog";
import MyStepper from "./MyStepper";

import Axios from "axios";
import Swal from "sweetalert2";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChess } from "@fortawesome/fontawesome-free-solid";

import { Modal } from "@mui/material";
import { faChessQueen } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../../constants";
import Loading from "../../loading";

const BookDemo = ({ open, setOpen, setLoading }) => {
  // const LoadingContext = createContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    level: "",
    inspiration: "",
    experience: "",
    experienceYear: "0",
    interest: "0",
    demoTime: "",
    contactTime: "",
    grade: "",
  });
  const [interest, setInterest] = useState(0);

  const [stepCount, setStepCount] = useState(1);
  const [grade, setGrade] = useState("");

  // const setReady = useContext(LoadingContext)

  const marks = [
    {
      value: 1,
      label: "Less",
    },

    {
      value: 10,
      label: "Very much",
    },
  ];

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 500);
    };

    // Initial check on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const iconToShow = isSmallScreen ? faChessQueen : faChess;
  const iconSize = isSmallScreen ? "4x" : "6x";

  const handleDataChange = (field, value) => {
    // formData[field] = value;
    // setFormData(formData);
    console.log(formData)
    setFormData((curr) => ({...curr, [field]: value}))
  };

  const handleClose = () => {
    setStepCount(1);
    setOpen(false);
  };

  const setLevel = (field, usrLevel, event) => {
    // formData[field] = usrLevel
    let stepSize = 1;

    if (field === "inspiration") stepSize = 2;

    // console.log(field)
    // console.log(usrLevel)
    formData[field] = String(usrLevel);

    setFormData(formData);

    setStepCount((stepCount) => stepCount + stepSize);
  };

  const submitDemo = async (e) => {
    // console.log(formData)
    // console.log("Demo booked")

    e.preventDefault();
    setLoading(true);

    // console.log(formData)
    try {
      // console.log(credentials)
      // console.log(usrType)
      let response = await Axios.post(`${BASE_URL}/demo/book`, formData);

      // console.log(response)
      if (response.status == 201) {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: response.data.message,
        });
      }
    } catch (err) {
      // console.log(err)
      setLoading(false);
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

    handleClose();
  };

  // if (ready == false) {
  //     return (
  //         <Loading />
  //     )
  // }

  return (
    <Modal open={open} onClose={handleClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "95%", // Adjust the width as needed
          height: "90%", // Adjust the height as needed
          maxWidth: "600px", // Add max width for larger screens
          maxHeight: "700px", // Add max height for larger screens
        }}
      >
        <div className="h-full w-full bg-white flex flex-row rounded-lg">
          <div className="h-full w-4/12 bg-primary grid place-items-center rounded-l-lg">
            <FontAwesomeIcon
              className="text-white"
              icon={iconToShow}
              bounce
              size={iconSize}
            />
          </div>
          <div className="w-8/12 h-full flex flex-col items-center">
            <div className="h-1 w-3/4 mt-5 bg-neutral-200">
              <div
                className="h-1 bg-primary"
                style={{ width: `${(100 * stepCount) / 7}%` }}
              ></div>
            </div>

            {stepCount == 1 && (
              <div className="mt-16 h-full w-full flex flex-col items-center">
                <label
                  class="block text-slate-700 text-2xl md:text-lg lg:text-xl font-semibold mb-2 text-base"
                  for="name"
                >
                  Select skill level
                </label>
                <div className="mt-8 md:mt-16 w-full flex flex-col items-center">
                  <button
                    name="level"
                    class="block w-full md:w-6/12 mx-2 my-2 px-4 py-2 text-base md:text-lg lg:text-xl font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-300 rounded-lg hover:border-primary hover:bg-accent-tertiary active:bg-accent-primary active:text-white focus:outline-none focus:shadow-none"
                    onClick={(e) => setLevel("level", "beginner", e)}
                  >
                    Beginner
                  </button>
                  <button
                    name="level"
                    class="block w-full md:w-6/12 mx-2 my-2 px-4 py-2 text-base md:text-lg lg:text-xl font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-300 rounded-lg hover:border-primary hover:bg-accent-tertiary active:bg-accent-primary active:text-white focus:outline-none focus:shadow-none"
                    onClick={(e) => setLevel("level", "intermediate", e)}
                  >
                    Intermediate
                  </button>
                  <button
                    name="level"
                    class="block w-full md:w-6/12 mx-2 my-2 px-4 py-2 text-base md:text-lg lg:text-xl font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-300 rounded-lg hover:border-primary hover:bg-accent-tertiary active:bg-accent-primary active:text-white focus:outline-none focus:shadow-none"
                    onClick={(e) => setLevel("level", "advanced", e)}
                  >
                    Advanced
                  </button>
                </div>
              </div>
            )}

            {stepCount == 2 &&
              (formData.level === "intermediate" ||
                formData.level === "advanced") && (
                <div class="mt-8 md:mt-16 h-full w-full flex flex-col items-center">
                  <label
                    class="block text-slate-700 text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-center"
                    for="message"
                  >
                    How did you/your child begin learning chess?
                  </label>

                  <div class="mt-8 md:mt-16 w-full flex flex-col items-center">
                    <button
                      name="experience"
                      class="block w-full md:w-6/12 mx-2 my-2 px-4 py-2 text-sm md:text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-300 rounded-lg hover:border-primary hover:bg-accent-tertiary active:bg-accent-primary active:text-white focus:outline-none focus:shadow-none"
                      onClick={(e) =>
                        setLevel("experience", "School/chess club", e)
                      }
                    >
                      School/chess club
                    </button>
                    <button
                      name="experience"
                      class="block w-full md:w-6/12 mx-2 my-2 px-4 py-2 text-sm md:text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-300 rounded-lg hover:border-primary hover:bg-accent-tertiary active:bg-accent-primary active:text-white focus:outline-none focus:shadow-none"
                      onClick={(e) => setLevel("experience", "Self-taught", e)}
                    >
                      Self-taught
                    </button>
                    <button
                      name="experience"
                      class="block w-full md:w-6/12 mx-2 my-2 px-4 py-2 text-sm md:text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-300 rounded-lg hover:border-primary hover:bg-accent-tertiary active:bg-accent-primary active:text-white focus:outline-none focus:shadow-none"
                      onClick={(e) =>
                        setLevel("experience", "Mentored by family/coach", e)
                      }
                    >
                      Mentored by family/coach
                    </button>
                  </div>

                  <div class="mt-8 md:mt-16 flex flex-row justify-between w-full md:w-11/12">
                    <IconButton
                      aria-label="previous"
                      onClick={(e) =>
                        setStepCount((stepCount) => stepCount - 1)
                      }
                    >
                      <ArrowBackIosIcon />
                    </IconButton>
                    <div></div>
                  </div>
                </div>
              )}

            {stepCount == 2 && formData.level === "beginner" && (
              <div className="mt-9 h-full w-full flex flex-col items-center">
                <label
                  class="block text-slate-700 text-2xl md:text-lg lg:text-xl font-semibold mb-2 text-center"
                  for="message"
                >
                  What inspired you/your child to learn chess?
                </label>

                <div className="mt-8 md:mt-16 w-full flex flex-col items-center">
                  <button
                    name="inspiration"
                    class="block w-full md:w-6/12 mx-2 my-2 px-4 py-2 text-base md:text-lg lg:text-xl font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-300 rounded-lg hover:border-primary hover:bg-accent-tertiary active:bg-accent-primary active:text-white focus:outline-none focus:shadow-none"
                    onClick={(e) =>
                      setLevel("inspiration", "Inspired by family/friend", e)
                    }
                  >
                    Inspired by family/friend
                  </button>
                  <button
                    name="inspiration"
                    class="block w-full md:w-6/12 mx-2 my-2 px-4 py-2 text-base md:text-lg lg:text-xl font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-300 rounded-lg hover:border-primary hover:bg-accent-tertiary active:bg-accent-primary active:text-white focus:outline-none focus:shadow-none"
                    onClick={(e) =>
                      setLevel("inspiration", "Chess in movies/TV", e)
                    }
                  >
                    Chess in movies/TV
                  </button>
                  <button
                    name="inspiration"
                    class="block w-full md:w-6/12 mx-2 my-2 px-4 py-2 text-base md:text-lg lg:text-xl font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-300 rounded-lg hover:border-primary hover:bg-accent-tertiary active:bg-accent-primary active:text-white focus:outline-none focus:shadow-none"
                    onClick={(e) =>
                      setLevel("inspiration", "Improve cognitive skills", e)
                    }
                  >
                    Improve cognitive skills
                  </button>
                </div>

                <div className="mt-8 md:mt-16 flex flex-row justify-between items-center w-full md:w-11/12">
                  <IconButton
                    aria-label="previous"
                    onClick={(e) => setStepCount((stepCount) => stepCount - 1)}
                  >
                    <ArrowBackIosIcon />
                  </IconButton>
                  <div></div>
                </div>
              </div>
            )}

            {stepCount == 3 &&
              (formData.level === "intermediate" ||
                formData.level === "advanced") && (
                <div className="mt-16 h-full w-full flex flex-col items-center">
                  <label
                    class="block text-slate-700 text-2xl md:text-lg lg:text-xl font-semibold mb-2 text-center"
                    for="message"
                  >
                    When did you/your child start playing chess?
                  </label>

                  <div className="mt-5 w-full flex flex-col items-center">
                    <button
                      name="inspiration"
                      class="block w-full md:w-6/12 mx-2 my-2 px-4 py-2 text-base md:text-lg lg:text-xl font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-300 rounded-lg hover:border-primary hover:bg-accent-tertiary active:bg-accent-primary active:text-white focus:outline-none focus:shadow-none"
                      onClick={(e) =>
                        setLevel("experienceYear", "less than 2", e)
                      }
                    >
                      &lt;2 years ago
                    </button>
                    <button
                      name="inspiration"
                      class="block w-full md:w-6/12 mx-2 my-2 px-4 py-2 text-base md:text-lg lg:text-xl font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-300 rounded-lg hover:border-primary hover:bg-accent-tertiary active:bg-accent-primary active:text-white focus:outline-none focus:shadow-none"
                      onClick={(e) => setLevel("experienceYear", "2 to 5", e)}
                    >
                      2-5 years ago
                    </button>
                    <button
                      name="inspiration"
                      class="block w-full md:w-6/12 mx-2 my-2 px-4 py-2 text-base md:text-lg lg:text-xl font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-300 rounded-lg hover:border-primary hover:bg-accent-tertiary active:bg-accent-primary active:text-white focus:outline-none focus:shadow-none"
                      onClick={(e) =>
                        setLevel("experienceYear", "more than 5", e)
                      }
                    >
                      &gt;5 years ago
                    </button>
                  </div>

                  <div className="mt-8 md:mt-16 flex flex-row justify-between items-center w-full md:w-11/12">
                    <IconButton
                      aria-label="previous"
                      onClick={(e) =>
                        setStepCount((stepCount) => stepCount - 1)
                      }
                    >
                      <ArrowBackIosIcon />
                    </IconButton>
                    <div></div>
                  </div>
                </div>
              )}

            {stepCount == 4 && (
              <div className="mt-16 h-full w-full flex flex-col items-center">
                <label
                  className="block text-slate-700 text-2xl font-semibold mb-2 text-center"
                  htmlFor="message"
                >
                  On a scale of 1-10 how passionate are you/your child about
                  chess?
                </label>

                <div
                  className="mt-8 md:mt-16 w-full flex flex-col items-center"
                  style={{
                    width: "65%",
                  }}
                >
                  <Slider
                    aria-label="Interest"
                    defaultValue={5}
                    getAriaValueText={() => interest}
                    valueLabelDisplay="auto"
                    step={1}
                    marks={marks}
                    min={1}
                    max={10}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full md:w-9/12 mt-6 mx-2 sm:mx-10 md:mx-10 lg:mx-10"
                    sx={{
                      "& .MuiSlider-thumb": {
                        color: "white",
                        "& .MuiSlider-valueLabelOpen": {
                          backgroundColor: "white",
                          border: 1,
                          borderColor: "gray",
                        },
                        "& .MuiSlider-valueLabel": {
                          backgroundColor: "white",
                          border: 1,
                          borderColor: "gray",
                        },
                      },
                    }}
                  />
                </div>

                <div className="mt-8 md:mt-16 flex flex-row justify-between items-center w-full md:w-11/12">
                  <IconButton
                    aria-label="previous"
                    onClick={(e) => {
                      if (formData.level === "beginner") {
                        setStepCount((stepCount) => stepCount - 2);
                      } else {
                        setStepCount((stepCount) => stepCount - 1);
                      }
                    }}
                  >
                    <ArrowBackIosIcon />
                  </IconButton>
                  <IconButton
                    name="interest"
                    aria-label="next"
                    onClick={(e) => setLevel("interest", interest, e)}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                </div>
              </div>
            )}
            {stepCount == 5 && (
              <div className="mt-16 h-full w-full flex flex-col items-center">
                <label
                  class="block text-slate-700 text-2xl font-semibold mb-2 text-center"
                  for="message"
                >
                  Which grade/standard is your student currently in?
                </label>

                <div className="mt-16 flex flex-col gap-5 w-9/12 items-center">
                  <div class="mb-4 w-9/12">
                    {/* <label class="block text-slate-700 text-sm font-bold mb-2" for="name">
                        Grade
                      </label> */}
                    {/* <input value={grade} class="appearance-none focus:border-black focus:ring-0 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="grade" type="text" placeholder="Grade" onChange={(e) => setGrade(e.target.value)} /> */}

                    <input value={formData.grade} class="appearance-none focus:border-black focus:ring-0 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="grade" type="text" placeholder="Grade" onChange={(e) => handleDataChange(e.target.id, e.target.value)} />
                  </div>
                </div>
                <div className="mt-20 flex flex-row justify-between w-11/12">
                  <IconButton
                    aria-label="previous"
                    onClick={(e) => setStepCount((stepCount) => stepCount - 1)}
                  >
                    <ArrowBackIosIcon />
                  </IconButton>
                  <IconButton
                    name="interest"
                    aria-label="next"
                    onClick={(e) => setLevel("interest", interest, e)}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                </div>
              </div>
            )}

            {stepCount == 6 && (
              <div className="mt-8 md:mt-16 h-full w-full flex flex-col items-center">
                <label
                  class="block text-slate-700 text-2xl font-semibold mb-2 text-center"
                  for="message"
                >
                  Please share your demo preferences
                </label>
                <div className="w-full px-4 mt-4">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        value={formData.demoTime}
                        label="Demo date and Time"
                        onChange={(value) =>
                          handleDataChange("demoTime", value)
                        }
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div className="w-full px-4 mt-4">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker"]}>
                      <TimePicker
                        value={formData.contactTime}
                        label="Preferred time to contact"
                        onChange={(value) =>
                          handleDataChange("contactTime", value)
                        }
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div className="mt-8 sm:mt-20 flex flex-row justify-between w-11/12">
                  <IconButton
                    aria-label="previous"
                    onClick={(e) => setStepCount((stepCount) => stepCount - 1)}
                  >
                    <ArrowBackIosIcon />
                  </IconButton>
                  <IconButton
                    name="interest"
                    aria-label="next"
                    onClick={() => setStepCount((stepCount) => stepCount + 1)}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                </div>
              </div>
            )}

            {stepCount == 7 && (
              <div className="mt-4 sm:mt-8 md:mt-16 h-full w-full flex flex-col items-center">
                <label
                  class="block text-slate-700 text-2xl font-semibold mb-2 text-center"
                  for="message"
                >
                  Please share your contact details
                </label>
                <div className="mt-4 sm:mt-8 md:mt-16 flex flex-col gap-5 w-9/12 items-center">
                  <div class="mb-4 w-9/12">
                    <input
                      value={formData.name}
                      class="appearance-none  focus:border-black focus:ring-0 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      id="name"
                      type="text"
                      placeholder="Name"
                      onChange={(e) =>
                        handleDataChange(e.target.id, e.target.value)
                      }
                    />
                  </div>
                  <div class="mb-4 w-9/12">
                    <input
                      value={formData.email}
                      class="appearance-none  focus:border-black focus:ring-0 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      id="email"
                      type="text"
                      placeholder="Email"
                      onChange={(e) =>
                        handleDataChange(e.target.id, e.target.value)
                      }
                    />
                  </div>
                  <div class="mb-4 w-9/12">
                    <input
                      value={formData.contact}
                      class="appearance-none  focus:border-black focus:ring-0 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      id="contact"
                      type="text"
                      placeholder="Contact"
                      onChange={(e) =>
                        handleDataChange(e.target.id, e.target.value)
                      }
                    />
                  </div>
                </div>
                <a
                  href="#_"
                  class="relative mt-2 sm:mt-4 h-12 inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-primary rounded-full shadow-md group"
                  onClick={submitDemo}
                >
                  <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-primary group-hover:translate-x-0 ease">
                    <svg
                      class="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span class="absolute flex items-center justify-center w-full h-full text-primary transition-all duration-300 transform group-hover:translate-x-full ease">
                    Book my demo
                  </span>
                  <span class="relative invisible">Book my demo</span>
                </a>
                <div className="mt-4 sm:mt-8 md:mt-12 flex flex-row justify-between w-11/12">
                  <IconButton
                    aria-label="previous"
                    onClick={(e) => setStepCount((stepCount) => stepCount - 1)}
                  >
                    <ArrowBackIosIcon />
                  </IconButton>
                  <div></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BookDemo;
