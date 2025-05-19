import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loder from "../Components/Loder";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function Signup() {
  // Use a single state object for all form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  // Generic change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = useCallback(async () => {
    // Basic validation
    const { name, email, password, phone } = formData;
    if (!name || !email || !password || !phone) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/user/signup`, formData,{
        withCredentials:true
      });
      console.log("Signup success:", res.data);

      setSuccessMessage("Signup successful! Redirecting to login...");
      // Wait 2 seconds and then redirect
      timeoutRef.current = setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      setLoading(false);
      alert("Signup failed! Please try again.");
    }
  }, [formData, navigate]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <main className="h-screen flex justify-center items-center">
      {loading ? (
        <div className="text-center">
          <Loder />
          {successMessage && (
            <p className="text-green-500 mt-4 text-lg">{successMessage}</p>
          )}
        </div>
      ) : (
        <div className="h-[500px] flex flex-col items-center justify-center">
          <div className="flex justify-center items-center w-full border-b-2">
            <h3 className="text-2xl font-semibold md:text-[50px] text-[35px]">
              Create your Account
            </h3>
          </div>

          <div className="text-[20px] pt-[20px] space-y-4">
            {/** Using one generic handler and 'name' attribute on inputs */}
            <div className="flex flex-col space-y-2">
              <label className="text-[28px]">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                className="border-2 rounded-sm w-[300px] p-2"
                placeholder="Enter Name"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[28px]">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="border-2 rounded-sm w-[300px] p-2"
                placeholder="Enter Email"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[28px]">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                className="border-2 rounded-sm w-[300px] p-2"
                placeholder="Enter Password"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[28px]">Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                className="border-2 rounded-sm w-[300px] p-2"
                placeholder="Enter Phone"
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-center mt-[10px]">
              <button
                className="border-2 px-6 py-2 rounded-sm bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300"
                onClick={handleSignup}
                disabled={loading}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
