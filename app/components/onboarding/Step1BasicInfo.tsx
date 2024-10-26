"use client";
import React, { useState } from "react";
import { FaUser, FaCalendar } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const Step1BasicInfo: React.FC<{ onComplete: () => void }> = ({
  onComplete,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "prefer not to say",
    location: {
      type: "Point", // Default type for GeoJSON
      coordinates: [0, 0], // Default coordinates (will be updated)
    },
  });
  const [locationPermission, setLocationPermission] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to request location access and save coordinates
  const handleLocationAccess = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            location: {
              type: "Point", // Ensure this is set
              coordinates: [
                position.coords.longitude, // Longitude first
                position.coords.latitude, // Latitude second
              ],
            },
          }));
          setLocationPermission(true); // User granted location access
          toast.success("Location access granted!");
        },
        () => {
          setLocationPermission(false); // User denied location access
          toast.error("Location access denied.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5001/api/users/onboarding/basic-info",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Basic information saved!");
      onComplete(); // Move to the next step
    } catch (error) {
      console.error("Failed to save basic info:", error);
      toast.error("Failed to save basic info. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-textPrimary text-center">
        Basic Information
      </h2>

      {/* Full Name Field */}
      <div className="w-full flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:border-primary">
        <FaUser className="text-textSecondary mr-3" />
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="w-full focus:outline-none text-textPrimary"
          value={formData.fullName}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* DOB Field */}
      <div className="w-full flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:border-primary">
        <FaCalendar className="text-textPrimary mr-3" />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          className="w-full focus:outline-none text-textSecondary"
          value={formData.dob}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Gender Field */}
      <div className="w-full flex items-center border border-gray-300 rounded-full px-4 py-2 focus-within:border-primary">
        <select
          name="gender"
          className="w-full focus:outline-none text-textPrimary"
          value={formData.gender}
          onChange={handleInputChange}
        >
          <option value="prefer not to say">Prefer not to say</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-binary</option>
        </select>
      </div>

      {/* Location Permission Button */}
      <div className="w-full flex items-center justify-center mt-4">
        {!locationPermission ? (
          <button
            type="button"
            onClick={handleLocationAccess}
            className="w-full bg-secondary text-white rounded-full py-2 font-semibold"
          >
            Allow Location Access
          </button>
        ) : (
          <p className="text-sm text-green-500 text-center w-full">
            Location access granted
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-primary text-white rounded-full py-2 mt-4 font-semibold"
      >
        Continue
      </button>
    </form>
  );
};

export default Step1BasicInfo;
