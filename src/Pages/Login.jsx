import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loder from "../Components/Loder";

export default function Login() {
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE_URL}/api/user/login`, {
        email,
        password,
      },{
        withCredentials:true
      });

      console.log("Login successful:", res.data);

      // Delay navigation for UX + loader display
      timeoutRef.current = setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert("Login failed. Please check credentials.");
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <main className="h-screen flex justify-center items-center">
      {loading ? (
        <Loder />
      ) : (
        <div className="h-[500px] flex flex-col items-center justify-center">
          <div className="flex justify-center items-center w-full border-b-2">
            <h3 className="text-2xl font-semibold md:text-[50px] text-[35px]">
              Login
            </h3>
          </div>

          <div className="text-[20px] pt-[20px] space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-[28px]">Email:</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="border-2 rounded-sm w-[300px] p-2 text-black"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[28px]">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="border-2 rounded-sm w-[300px] p-2 text-black"
              />
            </div>

            <div className="flex justify-center mt-[10px]">
              <button
                className="border-2 px-6 py-2 rounded-sm bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300"
                onClick={handleLogin}
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
