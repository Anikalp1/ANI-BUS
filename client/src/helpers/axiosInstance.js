import axios from "axios";

export const axiosInstance = axios.create({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    baseURL: 'https://ani-bus.onrender.com',
})