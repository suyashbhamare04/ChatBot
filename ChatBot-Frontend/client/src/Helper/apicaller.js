import { API } from "../backend";

export const getQuestions = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token);
  return fetch(`${API}/api/questions`, {
    method: "GET",
    // credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getQuestionsByCategory = (category) => {
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token);
  return fetch(`${API}/api/questions/${category}`, {
    method: "GET",
    // credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAllCategories = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token);
  return fetch(`${API}/api/categories`, {
    method: "GET",
    // credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAnswerByQuestionId = (questionId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token);
  return fetch(`${API}/api/answers/${questionId}`, {
    method: "GET",
    // credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};
