// components/SettingsPage/ProfileSection.tsx

import React from "react";
import { FaEdit, FaUpload } from "react-icons/fa";

const ProfileSection: React.FC = () => {
  return (
    <section id="profile" className="space-y-4">
      <h2 className="text-h2 font-semibold text-textPrimary font-primary">
        Profile
      </h2>
      <div className="flex items-center space-x-4">
        <img
          src="/avatars/avatar-1.jpg"
          alt="Profile"
          className="w-28 h-28 rounded-full border-2 border-textPrimary object-cover"
        />
        <button className="flex items-center gap-2 px-4 py-2 bg-primary rounded-full hover:bg-primaryDark transition font-primary">
          <FaUpload />
          Upload Image
        </button>
      </div>
      <div className="space-y-4">
        {["Full Name", "Email", "Password"].map((label) => (
          <div key={label} className="flex items-center space-x-2">
            <input
              type={label === "Password" ? "password" : "text"}
              placeholder={label}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary font-primary"
            />
            <button className="text-primary hover:text-primaryDark transition">
              <FaEdit className="text-2xl" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfileSection;
