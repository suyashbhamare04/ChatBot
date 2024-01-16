import React, { useEffect, useState } from "react";
import "./signup.css";
import {
  Stack,
  Button,
  TextField,
  Input,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import {
  signup,
  authenticate,
  isAuthenticated,
  GoogleAuthChecker,
  // GoogleAuth,
} from "../../Helper/auth";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Navigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { API } from "../../backend";

const Signup = () => {
  const { user, token } = isAuthenticated();
  let userroles = ["ROLE_USER", "ROLE_ADMIN", "ROLE_SUPPORT"];
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    loading: false,
    success: false,
    error: "",
    didRedirect: false,
    roles: userroles[0],
  });

  const {
    roles,
    username,
    email,
    password,
    confirmPassword,
    loading,
    success,
    error,
    didRedirect,
  } = values;

  useEffect(() => {
    window.history.forward();
    if (error !== "") {
      toast.error(error);
    }
  }, [values]);

  console.log(values);

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      loading: false,
      error: "",
      [name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      toast.error("Please fill all the fields");
    } else {
      if (password !== confirmPassword) {
        setValues({
          ...values,
          password: "",
          confirmPassword: "",
          loading: false,
          error: "password not match",
        });
      } else {
        setValues({
          ...values,

          success: false,
          loading: true,
          didRedirect: false,
        });

        signup({
          username,
          email,
          password,
          roles,
        })
          .then((data) => {
            console.log(data);
            if (data.status === 500) {
              setValues({
                ...values,
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                loading: false,
                error: "",
              });

              toast.error(data.message, {
                onClose: () => {
                  window.location.href = "/signup";
                },
                autoClose: 1000,
                limit: 1,
                hideProgressBar: false,
              });
            } else {
              // authenticate(data, () => {
              toast.success(data.message, {
                onClose: () => {
                  window.location.href = "/signin";
                },
                autoClose: 1000,
                limit: 1,
                hideProgressBar: false,
              });
              setValues({
                ...values,
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                error: "",
                loading: false,
                success: true,
                didRedirect: true,
              });
              // });
            }
          })
          .catch((err) => {
            console.log("Error in signup" + err);
          });
      }
    }
  };

  if (loading) {
    return (
      <div className="loader">
        {" "}
        <SyncLoader type="TailSpin" color="#FFFFFF" height={100} width={60} />
      </div>
    );
  }
  // if (isAuthenticated() && didRedirect && success) {
  //   const id = user._id;
  //   toast.success("Account created successfully", {
  //     closeButton: false,
  //   });
  //   return <Navigate to={`/nlp-processor`} />;
  // }

  // function setWithExpiry(key, value, ttl = 14400000) {
  //   const now = new Date();
  //   const item = {
  //     googleAuthValue: value,
  //     expiry: now.getTime() + ttl,
  //   };
  //   console.log(item.expiry);
  //   localStorage.setItem(key, JSON.stringify(item));
  // }

  // const googleauthhandle = () => {
  //   window.open(`${API}/auth/google`, "_self");
  //   // window.localStorage.setItem("googleAuthorised", "true");
  //   GoogleAuthChecker().then((res) => {
  //     console.log(res);
  //     // window.localStorage.setItem("googleAuthorised", res.googleAuthorised);
  //     setWithExpiry("googleAuthorised", res.googleAuthorised);
  //   });
  // };

  return (
    <div>
      <div className="main">
        <div className="signupImg"></div>
        <div className="signupForm">
          <div className="detail">
            <h5>START FOR FREE</h5>
            <h2>Create new account</h2>

            <h6>
              Already A Member? <span></span>
              <a href="/signin">Log in</a>
            </h6>
          </div>

          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            className="input"
            size="small"
            value={email}
            onChange={handleChange("email")}
          />
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            className="input"
            size="small"
            value={username}
            onChange={handleChange("username")}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            className="input"
            size="small"
            type="password"
            value={password}
            onChange={handleChange("password")}
          />
          <TextField
            id="outlined-basic"
            label="ConfirmPassword"
            variant="outlined"
            className="input"
            size="small"
            type="password"
            value={confirmPassword}
            onChange={handleChange("confirmPassword")}
          />

          <Stack spacing={2} direction="column">
            <Button
              variant="contained"
              className="inputBtn1"
              onClick={onSubmit}
            >
              signup
            </Button>
            <Button
              variant="contained"
              className="inputBtn2"
              // onClick={googleauthhandle}
            >
              <p>
                {" "}
                <Google sx={{ color: red[200] }} />
                &nbsp; Continue with google
              </p>
            </Button>
          </Stack>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
        transition={Zoom}
        closeButton={false}
      />
    </div>
  );
};

export default Signup;
