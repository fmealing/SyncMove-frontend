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
    preferredTime: ["Morning"], // Include time preferences if applicable
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
    if (!token) return;

    try {
      await axios.put(
        "http://localhost:5001/api/users/onboarding/fitness-preferences",
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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center font-primary text-textPrimary">
        Fitness Preferences
      </h2>

      {/* Activity Type */}
      <div className="w-full flex flex-col space-y-2">
        <label className="font-primary text-textPrimary">Activity Type</label>
        <select
          name="activityType"
          value={preferences.activityType}
          onChange={handleInputChange}
          className="border border-textSecondary rounded px-4 py-2 font-primary text-textPrimary"
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
          className="border border-textSecondary rounded px-4 py-2 text-textSecondary"
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
          className="border border-textSecondary rounded px-4 py-2 text-textSecondary"
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
          className="border border-textSecondary rounded px-4 py-2 text-textSecondary"
        >
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>
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

export default Step2FitnessPreferences;
