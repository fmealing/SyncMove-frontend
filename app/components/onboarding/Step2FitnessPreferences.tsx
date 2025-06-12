"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Step2FitnessPreferences: React.FC<{ onComplete: () => void }> = ({
  onComplete,
}) => {
  const [preferences, setPreferences] = useState({
    activityType: "running",
    fitnessGoals: "General Fitness",
    experienceLevel: 1,
    preferredTime: ["Morning"],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token is missing. Please log in.");
      return;
    }

    try {
      await axios.put(
        "https://syncmove-backend.onrender.com/api/users/onboarding/fitness-preferences",
        {
          activityType: preferences.activityType,
          experienceLevel: preferences.experienceLevel,
          fitnessGoals: preferences.fitnessGoals,
          availability: { timeOfDay: preferences.preferredTime },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Fitness preferences saved!");
      onComplete(); // Move to the next step
    } catch (error) {
      console.error("Failed to save fitness preferences:", error);
      toast.error("Failed to save fitness preferences. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 max-w-md mx-auto p-8 rounded-xl transition-all duration-300 hover:shadow-xl"
    >
      <h2 className="text-h2 font-semibold text-center font-primary text-textPrimary mb-8">
        Fitness Preferences
      </h2>

      {/* Activity Type */}
      <div className="w-full flex flex-col space-y-2">
        <label className="font-primary text-textPrimary">Activity Type</label>
        <select
          name="activityType"
          value={preferences.activityType}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-lg px-4 py-3 font-primary text-textPrimary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-shadow duration-200 hover:shadow-md"
        >
          <option value="running">Running</option>
          <option value="cycling">Cycling</option>
          <option value="weightlifting">Weightlifting</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Fitness Goals */}
      <div className="w-full flex flex-col space-y-2">
        <label className="font-primary text-textPrimary">Fitness Goals</label>
        <select
          name="fitnessGoals"
          value={preferences.fitnessGoals}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-lg px-4 py-3 text-textPrimary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-shadow duration-200 hover:shadow-md"
        >
          <option value="Weight Loss">Weight Loss</option>
          <option value="Endurance">Endurance</option>
          <option value="Muscle Gain">Muscle Gain</option>
          <option value="General Fitness">General Fitness</option>
        </select>
      </div>

      {/* Experience Level */}
      <div className="w-full flex flex-col space-y-2">
        <label className="font-primary text-textPrimary">
          Experience Level (1-5)
        </label>
        <input
          type="number"
          name="experienceLevel"
          value={preferences.experienceLevel}
          onChange={handleInputChange}
          min="1"
          max="5"
          className="border border-gray-300 rounded-lg px-4 py-3 text-textPrimary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-shadow duration-200 hover:shadow-md"
        />
      </div>

      {/* Preferred Time */}
      <div className="w-full flex flex-col space-y-2">
        <label className="font-primary text-textPrimary">Preferred Time</label>
        <select
          name="preferredTime"
          value={preferences.preferredTime[0]}
          onChange={(e) =>
            setPreferences({
              ...preferences,
              preferredTime: [e.target.value],
            })
          }
          className="border border-gray-300 rounded-lg px-4 py-3 text-textPrimary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-shadow duration-200 hover:shadow-md"
        >
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-primary text-white rounded-full py-3 font-semibold hover:bg-primaryDark transition duration-150 shadow-lg hover:shadow-xl"
      >
        Continue
      </button>
    </form>
  );
};

export default Step2FitnessPreferences;
