"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Step3Availability: React.FC<{ onComplete: () => void }> = ({
  onComplete,
}) => {
  const [availability, setAvailability] = useState({
    date: "",
    timeOfDay: [] as string[],
  });

  // Handle date input
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvailability((prev) => ({ ...prev, date: e.target.value }));
  };

  // Handle time of day selection
  const handleTimeToggle = (time: string) => {
    setAvailability((prev) => ({
      ...prev,
      timeOfDay: prev.timeOfDay.includes(time)
        ? prev.timeOfDay.filter((t) => t !== time)
        : [...prev.timeOfDay, time],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!availability.date || availability.timeOfDay.length === 0) {
      toast.error("Please select both date and time of day.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5001/api/users/onboarding/availability",
        availability,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Availability saved!");
      onComplete(); // Move to the next step
    } catch (error) {
      console.error("Failed to save availability:", error);
      toast.error("Failed to save availability. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center font-primary text-textPrimary">
        Set Your Availability
      </h2>

      {/* Date Selector */}
      <div className="w-full flex flex-col space-y-2">
        <label className="font-primary text-textPrimary">
          Availability Date
        </label>
        <input
          type="date"
          value={availability.date}
          onChange={handleDateChange}
          className="border border-textSecondary rounded px-4 py-2 text-textPrimary"
        />
      </div>

      {/* Time of Day Selector */}
      <div className="w-full flex flex-col space-y-2">
        <label className="font-primary text-textPrimary">
          Preferred Time of Day
        </label>
        <div className="flex gap-2">
          {["morning", "afternoon", "evening"].map((time) => (
            <button
              type="button"
              key={time}
              onClick={() => handleTimeToggle(time)}
              className={`px-4 py-2 rounded-full ${
                availability.timeOfDay.includes(time)
                  ? "bg-primary text-white"
                  : "border border-textSecondary text-textPrimary"
              }`}
            >
              {time.charAt(0).toUpperCase() + time.slice(1)}
            </button>
          ))}
        </div>
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

export default Step3Availability;
