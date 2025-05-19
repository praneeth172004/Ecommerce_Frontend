import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ecommerce-backend-zj7x.onrender.com", // or your backend URL
  withCredentials: true, // 🔑 Send cookies
});

export default axiosInstance;
