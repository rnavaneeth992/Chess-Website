import React, { useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

import validator from "validator";

const SignupLogin = ({ setLoading }) => {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [usrType, setUsrType] = useState("parent");
  const [signUpCred, setSignUpCred] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    confPass: "",
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    const baseURL =
      process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/";
    //let baseURL = "http://localhost:5000/";
    // let url = "http://localhost:5000/api/admin/login"

    try {
      // console.log(credentials)
      // console.log(usrType)
      // console.log(signUpCred)

      let check = false;

      // console.log(signUpCred)

      if (
        signUpCred.name.length > 0 &&
        validator.isEmail(signUpCred.email) &&
        validator.isNumeric(signUpCred.phone) &&
        signUpCred.phone.length == 10 &&
        usrType !== "admin"
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

      if (signUpCred.password !== signUpCred.confPass) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Passwords didn't match",
        });
        return;
      }

      setLoading(true);
      let response = await Axios.post(
        `${baseURL}api/${usrType}/signup`,
        signUpCred
      );

      // console.log(response)
      if (response.status == 200) {
        setLoading(false);
        await Swal.fire({
          icon: "success",
          title: "Signup successful",
        });

        Cookies.set("token", response.data.token, { expires: 1 });
        localStorage.setItem("token", response.data.token);
        
        localStorage.setItem("utype", usrType);

        // console.log(localStorage.getItem("token"));

        // const token = createContext(response.data.token)

        if (usrType === "admin") {
          navigate("/admin/home");
        } else if (usrType === "parent") {
          navigate("/parent/home");
        } else if (usrType === "instructor") {
          navigate("/instructor/home");
        }
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
  };

  const signUpBtn = () => {
    setSignUp(true);
  };
  const loginBtn = () => {
    setSignUp(false);
  };

  const handleChange = (e) => {
    if (isLoginForm) {
      let field = e.target.name;
      let value = e.target.value;
      credentials[field] = value;
      setCredentials(credentials);
      // console.log(credentials)
    } else {
      let field = e.target.name;
      let value = e.target.value;
      signUpCred[field] = value;

      setSignUpCred(signUpCred);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    const baseURL =
      process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/";
    //let baseURL = "http://localhost:5000/";
    //let url = "http://localhost:5000/api/admin/login";

    let check = false;

    if (credentials.email.length > 0 && validator.isEmail(credentials.email))
      check = true;

    if (!check) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Missing/Invalid Inputs",
      });

      return;
    }
    try {
      // console.log(credentials)
      // console.log(usrType)
      setLoading(true);
      let response = await Axios.post(
        `${baseURL}api/${usrType}/login`,
        credentials
      );
      setLoading(false);
      // console.log(response)
      if (response.status == 200) {
        await Swal.fire({
          icon: "success",
          title: "Login successful",
        });

        Cookies.set("token", response.data.token, { expires: 1 });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("utype", usrType);

        // console.log(localStorage.getItem("token"));
        if (usrType === "admin") {
          navigate("/admin/home");
        } else if (usrType === "parent") {
          navigate("/parent/home");
        } else if (usrType === "instructor") {
          navigate("/instructor/home");
        }
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
  };
  const [isLoginForm, setLoginForm] = useState(false);

  const switchForm = () => {
    setLoginForm(!isLoginForm);
  };
  return (
    <div>
      <div class="form-structor">
        <div class={`signup ${!isLoginForm ? "" : "slide-up"}`}>
          <h2
            class="form-title"
            id="signup"
            onClick={() => {
              switchForm();
            }}
          >
            <span>or</span>Sign up
          </h2>
          <div class="form-holder">
            <input
              name="name"
              type="text"
              class="input"
              placeholder="Name"
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              class="input"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              name="phone"
              type="text"
              class="input"
              placeholder="Ph Number"
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              class="input"
              placeholder="Password"
              onChange={handleChange}
            />
            <input
              name="confPass"
              type="password"
              class="input"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
            <select
              onChange={(e) => setUsrType(e.target.value)}
              className="input"
              style={{
                height: "39px",
              }}
            >
              <option value="parent">Parent</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>
          <button class="submit-btn" onClick={handleSignUp}>
            Sign up
          </button>
        </div>
        <div class={`login ${isLoginForm ? "" : "slide-up"}`}>
          <div class="center">
            <h2
              class="form-title"
              id="login"
              onClick={() => {
                switchForm();
              }}
            >
              <span>or</span>Log in
            </h2>
            <div class="form-holder">
              <input
                name="email"
                type="email"
                class="input"
                placeholder="Email"
                onChange={handleChange}
              />

              <input
                name="password"
                type="password"
                class="input"
                placeholder="Password"
                onChange={handleChange}
              />
              <select
                onChange={(e) => setUsrType(e.target.value)}
                class="input"
                style={{
                  height: "39px",
                }}
              >
                <option value="parent">Parent</option>
                <option value="admin">Admin</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>
            <button class="submit-btn" onClick={login}>
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupLogin;
