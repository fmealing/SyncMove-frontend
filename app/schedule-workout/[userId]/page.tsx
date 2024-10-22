// TOFO: Deal with 400 error - status isn't accepted
"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import DatePicker from "@/app/components/onboarding/DatePicker";
import TimeSelector from "@/app/components/onboarding/TimeSelector";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ScheduleWorkoutPage = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize router for accessing the URL
  const params = useParams(); // Get the dynamic route parameter
  const userId = params.userId;

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirmActivity = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both a date and time!");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in to schedule a workout!");
        return;
      }

      const decoded = jwtDecode<{ id: string }>(token);
      const myUserId = decoded.id;

      const response = await axios.post(
        "http://localhost:5001/api/activities", // Replace with your API URL
        {
          activityType: "Workout", // You can modify this to be dynamic
          description: `Scheduled workout with user ${userId}`,
          location: {
            type: "Point",
            coordinates: [-73.935242, 40.73061], // Placeholder for coordinates
          },
          dateString: selectedDate,
          timeOfDay: selectedTime,
          participants: [userId, myUserId], // Include both users in the participants array
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Workout scheduled successfully!");
        router.push("/dashboard");
      } else {
        alert("Failed to schedule workout. Try again later.");
      }
    } catch (error) {
      console.error("Error scheduling activity:", error);
      alert("An error occurred while scheduling the workout.");
    } finally {
      setLoading(false);
    }
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

        {/* Debugging Button TODO: Delete Later */}
        <button
          onClick={() =>
            console.log(
              userId ===
                jwtDecode<{ id: string }>(localStorage.getItem("token")).id // These are the same
            )
          }
          className="text-lg  text-white px-4 py-2 font-primary bg-primary rounded-full mb-10"
        >
          Debugging Button
        </button>

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
            <TimeSelector setTime={handleTimeChange} />
            {selectedTime && (
              <p className="text-gray-700 mt-2">
                Selected Time: {selectedTime}
              </p>
            )}
          </div>
        </div>

        <button
          className={`flex gap-2 items-center justify-center bg-primary text-white text-xl font-primary px-6 py-3 rounded-full mt-6 ${
            loading ? "opacity-50" : ""
          }`}
          onClick={handleConfirmActivity}
          disabled={loading}
        >
          <FaCheckCircle /> {loading ? "Scheduling..." : "Confirm Activity"}
        </button>
      </div>
    </div>
  );
};

export default ScheduleWorkoutPage;
