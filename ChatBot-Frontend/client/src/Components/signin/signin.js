import React, { useState, useEffect } from "react";
import "./signin.css";
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
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  signin,
  isAuthenticated,
  authenticate,
  GoogleAuthChecker,
} from "../../Helper/auth";
import { SyncLoader } from "react-spinners";
import { API } from "../../backend";

const Signin = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    loading: false,
    error: "",
    didRedirect: false,
  });

  const { user } = isAuthenticated();

  const { username, password, loading, error, didRedirect } = values;

  useEffect(() => {
    window.history.forward();
    if (error !== "") {
      toast.error(error);
    }
  }, [values]);

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
    if (username === "" && password === "") {
      setValues({ ...values, error: "please enter username and password" });
    } else {
      setValues({ ...values, error: "", loading: true });
      signin({ username, password })
        .then((data) => {
          console.log(data);
          // console.log(data.error);
          if (data.error) {
            setValues({
              ...values,
              error: data.error,
              loading: false,
              username: "",
              password: "",
            });
          } else {
            authenticate(data, () => {
              setValues({
                ...values,
                loading: false,
                didRedirect: true,
                username: "",
                password: "",
              });
            });
          }
        })
        .catch((err) => {
          console.log("signin request failed" + err);
        });
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

  if (isAuthenticated() && didRedirect) {
    return <Navigate to={`/userchat`} />;
  }
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
      <div className="mainsignin">
        <div className="signinImg"></div>
        <div className="signinForm">
          <div className="signindetail">
            <h5>Happy to see you again !</h5>
            <h2>Welcome back</h2>

            <h6>
              Not A Member? <span></span>
              <a href="/signup">Signup</a>
            </h6>
          </div>

          <TextField
            id="outlined-basic"
            label="username"
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

          <Stack spacing={2} direction="column">
            <Button
              variant="contained"
              className="signinInputBtn1"
              onClick={onSubmit}
            >
              signin
            </Button>
            <Button
              variant="contained"
              className="signinInputBtn2"
              // onClick={googleauthhandle}
            >
              <p>
                {" "}
                <Google sx={{ color: red[200] }} />
                &nbsp; Signin with google
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

export default Signin;
