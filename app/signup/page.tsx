"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";

const SignupPage = () => {
  const [formdata, setFormdata] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formdata);
    // TODO: Send the form data to the server
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

          <button
            type="submit"
            className="w-1/2 text-center text-white bg-primary rounded-full px-4 py-2 hover:bg-primaryDark transition"
          >
            Sign Up
          </button>

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