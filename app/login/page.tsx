"use client";
import Link from "next/link";
import { useState } from "react";
import React from "react";
import { FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Left Side - Login Form */}
      <div className="w-full md:w-1/2 bg-lightGray flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md flex flex-col items-center">
          <h1 className="text-4xl font-bold text-textPrimary mb-2 text-center font-primary">
            Welcome back
          </h1>
          <p className="text-lg text-textSecondary mb-6 text-center font-primary">
            Log in to continue your fitness journey
          </p>

          {/* Google Login Button */}
          <button className="w-full max-w-md h-12 px-4 rounded-full border-2 border-textPrimary flex justify-center items-center gap-2 mb-4 hover:bg-actionAmber/5 transition">
            <img
              src="/svg/google-logo.svg"
              alt="Google Logo"
              className="w-12 h-12"
            />
            <span className="font-primary text-center text-textPrimary text-base font-medium leading-tight hover:text-lg transition duration-500">
              Login with Google
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center w-full max-w-md mb-6">
            <hr className="flex-grow border-textPrimary/10" />
            <span className="px-4 text-textSecondary text-xs font-medium font-primary">
              or Sign up with Email
            </span>
            <hr className="flex-grow border-textPrimary/10" />
          </div>

          {/* Email Input */}
          <div className="w-full max-w-md mb-4">
            <label className="block text-textPrimary/75 text-sm font-medium font-primary mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full h-11 px-3 py-[11px] bg-white rounded-full border border-[#cbd2e0] text-[#333333] text-base font-normal font-primary"
            />
          </div>

          {/* Password Input */}
          <div className="w-full max-w-md mb-6">
            <div className="flex justify-between items-center mb-1">
              <label className="text-textPrimary/75 text-sm font-medium font-primary">
                Password
              </label>
              <a
                href="#"
                className="text-[#717d96] text-sm font-normal font-primary"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="min 8 chars"
                className="w-full h-11 px-3 py-[11px] bg-white rounded-full border border-[#cbd2e0] text-[#333333] text-base font-normal font-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#717d96]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <Link href="/dashboard">
            <button className="w-full max-w-md h-12 px-4 bg-primary rounded-btn flex justify-center items-center gap-2 text-white text-base font-medium font-primary leading-tight hover:bg-primaryDark transition">
              <FaSignInAlt className="w-5 h-5 text-white" /> Sign In
            </button>
          </Link>
        </div>
      </div>

      {/* Right Side - Image Section */}
      <div className="hidden md:flex w-1/2 bg-cover bg-center image-section">
        {/* The image section */}
      </div>
    </div>
  );
};

export default Login;
