"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserPlus,
  FaCalendar,
} from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [formdata, setFormdata] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "", // Add dob field to the formdata
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (formdata.password !== formdata.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // Make POST request to register endpoint
      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
        {
          fullName: formdata.fullName,
          email: formdata.email,
          password: formdata.password,
          dob: formdata.dob, // Ensure dob is passed here
        }
      );

      // Set token in local storage
      const token = response.data.token;
      localStorage.setItem("token", token);

      // Redirect to onboarding or login page after successful registration
      window.location.href = "/onboarding";
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Failed to register. Please try again.");
    }
  };

  return (
    <div className="signup-background flex flex-col items-center justify-center min-h-screen p-6 bg-lightGray">
      <div className="signup-content w-full max-w-md bg-white rounded-lg p-8 space-y-6">
        <h1 className="text-h2 font-primary text-textPrimary text-center font-semibold">
          Sign Up
        </h1>
        <p className="text-center text-textSecondary font-primary">
          Create your account to get started
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col items-center justify-center"
        >
          {/* Full Name Field */}
          <div className="w-full flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:border-primary">
            <FaUser className="text-gray-400 mr-3" />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full focus:outline-none text-textPrimary font-primary"
              value={formdata.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Email Field */}
          <div className="w-full flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:border-primary">
            <FaEnvelope className="text-gray-400 mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full focus:outline-none text-textPrimary font-primary"
              value={formdata.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* DOB Field */}
          <div className="w-full flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:border-primary">
            <FaCalendar className="text-gray-400 mr-3" />
            <input
              type="date" // Use date input type for DOB
              name="dob"
              placeholder="Date of Birth"
              className="w-full focus:outline-none text-textPrimary font-primary"
              value={formdata.dob}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Password Field */}
          <div className="w-full flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:border-primary">
            <FaLock className="text-gray-400 mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full focus:outline-none text-textPrimary font-primary"
              value={formdata.password}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="focus:outline-none text-gray-400 ml-2"
            >
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="w-full flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:border-primary">
            <FaLock className="text-gray-400 mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full focus:outline-none text-textPrimary font-primary"
              value={formdata.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="focus:outline-none text-gray-400 ml-2"
            >
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </button>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-1/2 flex items-center justify-center gap-2 text-white bg-primary rounded-full px-4 py-2 hover:bg-primaryDark transition"
          >
            <FaUserPlus />
            Sign Up
          </button>

          {/* Link to Login */}
          <Link href="/login">
            <p className="text-center text-textSecondary font-primary">
              Already have an account?{" "}
              <span className="text-primary hover:underline font-semibold">
                Log In
              </span>
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
