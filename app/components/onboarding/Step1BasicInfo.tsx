"use client";
import React, { useState } from "react";
import { FaUser, FaCalendar, FaSpinner } from "react-icons/fa"; // Added FaSpinner for loading
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
      type: "Point",
      coordinates: [0, 0],
    },
  });
  const [locationPermission, setLocationPermission] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationAccess = () => {
    if (navigator.geolocation) {
      setIsFetchingLocation(true); // Show loading indicator
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            location: {
              type: "Point",
              coordinates: [
                position.coords.longitude,
                position.coords.latitude,
              ],
            },
          }));
          setLocationPermission(true);
          setIsFetchingLocation(false); // Hide loading indicator
          toast.success("Location access granted!");
        },
        () => {
          setLocationPermission(false);
          setIsFetchingLocation(false); // Hide loading indicator
          toast.error(
            "Location access denied. Location is required to use this website."
          );
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!locationPermission) {
      toast.error("Location access is required to continue.");
      return;
    }

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
      onComplete();
    } catch (error) {
      console.error("Failed to save basic info:", error);
      toast.error("Failed to save basic info. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto p-8 rounded-xl transition-all duration-300 hover:shadow-xl"
    >
      <h2 className="text-h2 font-semibold text-textPrimary font-primary text-center mb-6">
        Basic Information
      </h2>

      <p className="text-sm text-red-600 text-center mb-4 font-primary">
        Location access is required to use SyncMove. Please allow access to
        proceed.
      </p>

      <div className="w-full flex items-center border border-gray-300 rounded-full px-4 py-3 mb-4 focus-within:border-primary shadow-sm hover:shadow-md transition-shadow duration-200">
        <FaUser className="text-mediumGray mr-3" />
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="w-full focus:outline-none text-textPrimary placeholder-gray-500 font-primary"
          value={formData.fullName}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="w-full flex items-center border border-gray-300 rounded-full px-4 py-3 mb-4 focus-within:border-primary shadow-sm hover:shadow-md transition-shadow duration-200">
        <FaCalendar className="text-mediumGray mr-3" />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          className="w-full focus:outline-none text-textSecondary font-primary"
          value={formData.dob}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="w-full flex items-center border border-gray-300 rounded-full px-4 py-3 mb-4 focus-within:border-primary shadow-sm hover:shadow-md transition-shadow duration-200">
        <select
          name="gender"
          className="w-full focus:outline-none text-textPrimary font-primary"
          value={formData.gender}
          onChange={handleInputChange}
        >
          <option value="prefer not to say">Prefer not to say</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-binary</option>
        </select>
      </div>

      <div className="w-full flex justify-center mt-6 mb-4">
        {!locationPermission ? (
          <button
            type="button"
            onClick={handleLocationAccess}
            className="w-full bg-secondary text-white rounded-full py-2 font-primary font-semibold hover:bg-secondaryDark transition duration-150"
          >
            {isFetchingLocation ? (
              <span className="flex items-center justify-center gap-2 font-primary">
                <FaSpinner className="animate-spin" />
                Fetching Location...
              </span>
            ) : (
              "Allow Location Access"
            )}
          </button>
        ) : (
          <p className="text-sm text-success text-center w-full font-primary">
            Location access granted
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white rounded-full py-2 font-semibold hover:bg-primaryDark transition duration-150 mt-6 font-primary"
      >
        Continue
      </button>
    </form>
  );
};

export default Step1BasicInfo;
