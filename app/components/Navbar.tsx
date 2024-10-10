import React from "react";
import { FaUser, FaUserPlus } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-lightGray shadow-sm">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="SyncMove Logo" className="h-[63px]" />
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-4">
        {["Help/FAQ", "Contact", "Pricing", "Features", "Home"].map((text) => (
          <div
            key={text}
            className="h-9 px-2 rounded-full border-2 border-secondary justify-center items-center gap-2 inline-flex"
          >
            <div className="text-center text-secondary text-lg font-bold font-primary leading-[17.50px]">
              {text}
            </div>
          </div>
        ))}
      </div>

      {/* Login/Sign Up Buttons */}
      <div className="flex space-x-2">
        <button className="flex items-center px-4 py-2 bg-primary text-lightGray rounded-full font-bold font-secondary text-lg">
          <FaUser className="mr-2" /> Login
        </button>
        <button className="flex items-center px-4 py-2 bg-primary text-lightGray rounded-full font-bold font-secondary text-lg">
          <FaUserPlus className="mr-2" /> Signup
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
