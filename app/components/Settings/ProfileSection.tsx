import React, { useEffect, useState } from "react";
import { FaEdit, FaUpload } from "react-icons/fa";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface UserData {
  fullName: string;
  email: string;
  profilePicture: string;
}

const ProfileSection: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const decoded = jwtDecode(token) as { id: string };
      console.log(decoded);

      try {
        const response = await axios.get(
          `http://localhost:5001/api/users/${decoded.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData({
          fullName: response.data.fullName,
          email: response.data.email,
          profilePicture:
            response.data.profilePicture || "/avatars/avatar-1.jpg",
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <section id="profile" className="space-y-4">
      <h2 className="text-h2 font-semibold text-textPrimary font-primary">
        Profile
      </h2>
      <div className="flex items-center space-x-4">
        <img
          src={userData?.profilePicture}
          alt="Profile"
          className="w-28 h-28 rounded-full border-2 border-textPrimary object-cover"
        />
        <button className="flex items-center gap-2 px-4 py-2 bg-primary rounded-full hover:bg-primaryDark transition font-primary">
          <FaUpload />
          Upload Image
        </button>
      </div>
      <div className="space-y-4">
        {userData && (
          <>
            {/* Full Name */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={userData.fullName}
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary font-primary text-textPrimary"
              />
              <button className="text-primary hover:text-primaryDark transition">
                <FaEdit className="text-2xl" />
              </button>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={userData.email}
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary font-primary text-textPrimary"
              />
              <button className="text-primary hover:text-primaryDark transition">
                <FaEdit className="text-2xl" />
              </button>
            </div>

            {/* Password */}
            <div className="flex items-center space-x-2">
              <input
                type="password"
                value="********"
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary font-primary text-textPrimary"
              />
              <button className="text-primary hover:text-primaryDark transition">
                <FaEdit className="text-2xl" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProfileSection;
