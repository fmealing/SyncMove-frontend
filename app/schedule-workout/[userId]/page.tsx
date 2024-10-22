"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import DatePicker from "@/app/components/onboarding/DatePicker";
import TimeSelector from "@/app/components/onboarding/TimeSelector";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

interface Partner {
  fullName: string;
  dateString: string;
  activityType: string;
  location?: {
    type: string;
    coordinates: [number, number];
  };
  description: string;
}

const ScheduleWorkoutPage = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize router for accessing the URL
  const params = useParams(); // Get the dynamic route parameter
  const userId = params?.userId;

  if (!userId) {
    toast.error("User ID not found. Please try again.");
    return null;
  }

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  // Async function to fetch partner data
  const fetchPartnerData = async () => {
    try {
      console.log("partnerResponse called. User ID: ", userId);
      const response = await axios.get(
        `http://localhost:5001/api/users/${userId}`
      );
      setPartner(response.data);
    } catch (error) {
      console.error("Error fetching partner data:", error);
      toast.error("Failed to fetch partner data. Please try again.");
    }
  };

  // UseEffect to load partner data on page load
  useEffect(() => {
    // Calling the async function inside useEffect
    fetchPartnerData();
  }, [userId]);

  const handleConfirmActivity = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both a data and a time!");
      return;
    }

    try {
      if (!partner) {
        toast.error("Partner data not found. Please try again.");
        return;
      }

      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You must be logged in to schedule a workout.");
        return;
      }

      const decoded = jwtDecode<{ id: string }>(token);
      const myUserId = decoded.id;

      const response = await axios.post(
        "http://localhost:5001/api/activities",
        {
          activityType: "Workout", // For this version workout meetup only
          description: `Scheduled ${selectedTime} workout with ${partner.fullName}`,
          location: {
            type: "Point",
            coordinates: partner.location?.coordinates, // Placeholder for coordinates
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
        toast.success("Workout scheduled successfully!");
        router.push("/dashboard");
      } else {
        toast.error("Failed to schedule the workout. Please try again.");
      }
    } catch (error) {
      console.error("Error scheduling activity:", error);
      toast.error("An error occurred while scheduling the workout.");
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
