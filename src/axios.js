import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // or your backend URL
  withCredentials: true, // 🔑 Send cookies
});

export default axiosInstance;
