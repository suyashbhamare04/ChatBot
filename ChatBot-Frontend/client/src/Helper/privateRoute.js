import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";

function getItemWithExpiry(key) {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  // console.log(item.googleAuthValue);

  return item.googleAuthValue;
}

const PrivateRoute = ({ children }) => {
  const LocalAuthorized = isAuthenticated();

  return LocalAuthorized ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
