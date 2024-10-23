"use client";

import React, { useState } from "react";
import DatePicker from "../components/onboarding/DatePicker";
import TimeSelector from "../components/onboarding/TimeSelector";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

const ScheduleWorkoutPage = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    console.log("Selected Date:", date); // Store this value in the database later
  };

  return (
    <div className="scheduling-background min-h-screen">
      <div className="scheduling-content">
        <h1 className="text-textPrimary text-h2 font-primary font-semibold p-4">
          Schedule a Workout
        </h1>
        <p className="text-center font-secondary text-gray-600 text-lg mb-6">
          Welcome! Here you can schedule a workout with your partner. Please
          remember to be respectful, arrive on time, and communicate any changes
          to your partner.
        </p>

        <div className="flex flex-col md:flex-row md:items-start md:space-x-8 space-y-6 md:space-y-0 w-full">
          <div className="flex-1">
            <label className="text-lg text-gray-700 font-semibold">
              Choose a Date:
            </label>
            <DatePicker setDate={handleDateChange} />
            {selectedDate && (
              <p className="text-gray-700 mt-2">
                Selected Date: {selectedDate}
              </p>
            )}
          </div>

          <div className="flex-1">
            <label className="text-lg font-primary text-gray-700 font-semibold mb-6">
              Choose a Time:
            </label>
            <TimeSelector />
          </div>
        </div>

        <Link href="/dashboard">
          <button className="flex gap-2 items-center justify-center bg-primary text-white text-xl font-primary px-6 py-3 rounded-full mt-6">
            <FaCheckCircle /> Confirm Activity
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ScheduleWorkoutPage;
