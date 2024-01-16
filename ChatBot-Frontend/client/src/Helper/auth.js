const { API } = require("../backend");

export const signup = (user) => {
  return fetch(`${API}/auth/addNewUser`, {
    method: "POST",
    // credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  return fetch(`${API}/auth/generateToken`, {
    method: "POST",
    // credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("userData", JSON.stringify(data));
    localStorage.setItem("token", JSON.stringify(data.token));
    next();
  }
};

export const signout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("token")) {
    return JSON.parse(localStorage.getItem("token"));
  } else {
    return false;
  }
};

export const GoogleAuthChecker = () => {
  return fetch(`${API}/googleauthcookiechecker`, {
    method: "GET",
    credentials: "include",
  })
    .then((res) => {
      // console.log(res);
      return res.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
