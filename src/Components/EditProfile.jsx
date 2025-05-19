import axios from "axios";
import React, { useState, useEffect } from "react";

export default function EditProfile() {
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/user/getuser`, {
          withCredentials: true, //
        });
        console.log(response.data)
        const info=response.data.user
        console.log(info.name)
        setProfile(info); // ✅ Fix: extract user from response
      } catch (error) {
        console.error("Error fetching user data:", error);
        setProfile(null);
      }
    }

    fetchProfile();
  }, [API_BASE_URL]);
  console.log(profile);
  
  return (
    <div className="w-full h-fit p-4 md:p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-10">
        <h4 className="text-red-500 font-semibold text-2xl mb-6">
          My Profile
        </h4>

        {profile ? (
          <div className="space-y-4 text-black">
            <div>
              <h5 className="text-gray-600 font-medium">Name</h5>
              <p className="text-lg text-black">{profile.name }</p>
            </div>

            <div>
              <h5 className="text-gray-600 font-medium">Email</h5>
              <p className="text-lg">{profile.email || "N/A"}</p>
            </div>

            <div>
              <h5 className="text-gray-600 font-medium">Phone</h5>
              <p className="text-lg">{profile.phone || "N/A"}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Loading profile...</p>
        )}
      </div>
    </div>
  );
}
