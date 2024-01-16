import logo from "./logo.svg";
import "./App.css";
import Home from "./Core/Home/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/signup/signup";
import Signin from "./Components/signin/signin";
import PrivateRoute from "./Helper/privateRoute";
import UnAuthorised from "./Components/Error/error";
import { useEffect, useState } from "react";
import { isAuthenticated } from "./Helper/auth";
import Userchat from "./Components/Userchat/Userchat";

function App() {
  const LocalAuthorized = isAuthenticated();

  const [token, setToken] = useState("");

  useEffect(() => {
    if (LocalAuthorized) {
      setToken(LocalAuthorized);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/userchat" element={<Userchat />} />
        <Route path="*" element={<UnAuthorised />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
