import React, { useState, useEffect, createContext, useContext } from "react";
import { Routes, Route, Switch } from "react-router-dom";

// import animate on scroll
import Aos from "aos";
import "aos/dist/aos.css";

// import components

//import Courses from "./components/Courses/Courses";
import Landing from "./components/Landing/Landing";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./components/Login/components/NotFound";
import Protected from "./components/Login/components/Protection";
import InstructorDashboard from "./pages/InstructorDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import Navbar from "./components/Navbar/Navbar";
import ViewSignUp from "./components/ViewSignUp";
import ViewReq from "./components/ViewReq";
import InstructorProfile from "./pages/profile/InstructorProfile";
import AdminProfile from "./pages/profile/AdminProfile";
import ParentProfile from "./pages/profile/ParentProfile";

import CourseComp from "./features/studentDetails/CourseComp";
import CourseProgress from "./pages/CourseProgress";
import ClassHistory from "./pages/ClassHistory";
import Schedule from "./pages/Schedule";
import AddAdmin from "./pages/AddAdmin";
import AddStudent from "./pages/AddStudent";

// Contexts
import { ParentContextProvider } from "./context/ParentContext";
import ParentContextLayout from "./context/ParentContextLayout";

const App = () => {
  // animate on scroll
  const [userType, setUserType] = useState(localStorage.getItem("utype"));
  // const [ready, setReady] = useState(true)

  // const LoadingContext = createContext();

  Aos.init({
    duration: 800,
    offset: 0,
  });

  return (
    <div className="relative">
      <div>
        <Navbar utype={userType} />
      </div>
      <div className="right h-full font-primary">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/err-404" element={<NotFound />} />
          {/* <Route path="/admin/home" element={<Protected isSignedIn={isSignedIn}>
            <AdminDashboard />
          </Protected>} /> */}
          {/* <Route
            path="/parent/home"
            element={
              <Protected isSignedIn={isSignedIn}>
                <ParentDashboard />
              </Protected>
            }
          /> */}
          {/* <Route path="/instructor-home" element={<Protected isSignedIn={isSignedIn}>
          <InstructorDashboard />
        </Protected>} /> */}

          <Route path="/admin" element={<Protected reqType={"admin"} />}>
            <Route path="home" element={<AdminDashboard />} />
            <Route path="demo-request" element={<ViewReq />} />
            <Route path="registration" element={<ViewSignUp />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="addAdmin" element={<AddAdmin />} />
          </Route>

          <Route
            path="/instructor"
            element={<Protected reqType={"instructor"} />}
          >
            <Route path="home" element={<InstructorDashboard />} />
            <Route path="profile" element={<InstructorProfile />} />
          </Route>

          <Route path="/parent" element={<Protected reqType={"parent"} />}>
            <Route element={<ParentContextLayout />}>
              <Route path="home" element={<ParentDashboard />} />
              <Route path="profile" element={<ParentProfile />} />
              <Route path="progress" element={<CourseProgress />} />
              <Route path="history" element={<ClassHistory />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="addStudent" element={<AddStudent />} />
              <Route path="coursecomp" element={<CourseComp />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
