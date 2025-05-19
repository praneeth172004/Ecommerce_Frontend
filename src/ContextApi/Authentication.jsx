import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from '../axios'; // Your axios instance

const Auth = createContext();

export default function Authentication({ children }) {
  const [user, setUser] = useState(null);

  // 🔁 Check user on refresh
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/getuser");
        setUser(res.data.user);
      } catch (err) {
        setUser(null); // Token invalid or expired
      }
    };

    fetchUser();
  }, []);

  return (
    <Auth.Provider value={{ user, setUser }}>
      {children}
    </Auth.Provider>
  );
}

export const useAuth = () => useContext(Auth);
