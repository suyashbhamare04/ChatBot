import React from "react";
import IMGError from "../../Assets/404.svg";
import "./error.css";
import { Button } from "@mui/material";
const UnAuthorised = () => {
  return (
    <div className="errormain">
      <img src={IMGError} />
      <h1>404</h1>
      <h3>Opps ! Page Not Found 🤪 </h3>
      <h4>
        Sorry, the page you're looking for doesn't exit or You are not
        Authorized
      </h4>
      <Button variant="outlined" className="errbackbtn" href="/">
        Back to Home
      </Button>
    </div>
  );
};

export default UnAuthorised;
