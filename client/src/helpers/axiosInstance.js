import axios from "axios";

export const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token") || " "}`,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  },
  baseURL: "https://ani-bus.onrender.com",
});
