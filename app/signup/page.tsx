"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [formdata, setFormdata] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateInputs = () => {
    const newErrors = { email: "", password: "", general: "" };
    if (!formdata.email.includes("@")) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (formdata.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }
    if (formdata.password !== formdata.confirmPassword) {
      newErrors.password = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
        {
          fullName: formdata.fullName,
          email: formdata.email,
          password: formdata.password,
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);
      window.location.href = "/onboarding";
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const backendError = error.response.data.error;
        setErrors((prev) => ({ ...prev, general: backendError }));
        toast.error(backendError || "Failed to register. Please try again.");
      } else {
        console.error("Registration error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
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

        {errors.general && (
          <p className="text-red-500 text-center">{errors.general}</p>
        )}

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
          <div className="w-full flex flex-col">
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:border-primary">
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
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="w-full flex flex-col">
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:border-primary">
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
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
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
