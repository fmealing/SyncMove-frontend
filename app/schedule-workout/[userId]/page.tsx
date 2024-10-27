"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import LoadingScreen from "@/app/components/LoadingScreen";
import DatePicker from "@/app/components/DatePicker";
import TimeSelector from "@/app/components/TimeSelector";

interface Partner {
  fullName: string;
  dateString: string;
  activityType: string;
  location?: {
    type: string;
    coordinates: [number, number];
  };
}

interface statusError {
  response: {
    status: number;
  };
}

const ScheduleWorkoutPage = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<string>(""); // For manually inputted location
  const [customMessage, setCustomMessage] = useState<string>(""); // For custom description
  const router = useRouter();
  const params = useParams();
  const userId = params?.userId;

  if (!userId) {
    toast.error("User ID not found. Please try again.");
    return null;
  }

  // Fetch partner data on mount
  useEffect(() => {
    const fetchPartnerData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/users/${userId}`
        );
        setPartner(response.data);
      } catch (error) {
        console.error("Error fetching partner data:", error);
        toast.error("Failed to fetch partner data. Please try again.");
      }
    };
    fetchPartnerData();
  }, [userId]);

  // Confirm activity submission
  const handleConfirmActivity = async () => {
    if (!selectedDate || !selectedTime || !location || !customMessage) {
      toast.error("Please select a date, time, location, and enter a message.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("User not authenticated. Please log in and try again.");
        return;
      }

      const decoded = jwtDecode<{ id: string }>(token);
      const myUserId = decoded.id;

      const response = await axios.post(
        "http://localhost:5001/api/activities",
        {
          activityType: "Workout",
          description: `${customMessage} - Scheduled ${selectedTime} workout with ${partner?.fullName} at ${location}`,
          dateString: selectedDate,
          timeOfDay: selectedTime,
          participants: [userId, myUserId],
          location,
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
      const err = error as statusError;
      if (err.response.status === 400) {
        toast.error(
          "Users haven't matched yet. Wait for the other person to accept the match"
        );
      } else {
        toast.error("An error occurred while scheduling the workout.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!partner) {
    return <LoadingScreen />;
  }

  return (
    <div className="scheduling-background min-h-screen">
      <div className="scheduling-content">
        <h1 className="text-textPrimary text-h2 font-primary font-semibold p-4">
          Schedule a Workout
        </h1>
        <p className="text-center font-secondary text-textSecondary text-lg mb-6">
          Welcome! Here you can schedule a workout with your partner. Please
          remember to be respectful, arrive on time, and communicate any changes
          to your partner.
        </p>

        <div className="flex flex-col md:flex-row md:items-start md:space-x-8 space-y-6 md:space-y-0 w-full">
          <div className="flex-1 pb-4">
            <DatePicker
              selectedDate={selectedDate}
              handleDateChange={setSelectedDate}
            />
          </div>

          <div className="flex-1">
            <TimeSelector
              selectedTime={selectedTime || ""}
              handleTimeSelect={setSelectedTime}
            />
          </div>
        </div>

        {/* Input Field For Location String */}
        <div className="flex-1 mt-4">
          <label className="text-lg text-textPrimary font-semibold font-primary">
            Enter Location:
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full mt-2 px-4 py-2 font-primary border border-textSecondary rounded-md focus:outline-none focus:border-primary"
            placeholder="Enter location (e.g., Gym Group, Selly Oak)"
          />
        </div>

        {/* Input Field For Custom Message */}
        <div className="flex-1 mt-4">
          <label className="text-lg text-textPrimary font-semibold font-primary">
            Enter a Message to Your Partner:
          </label>
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className="w-full mt-2 px-4 py-2 font-primary border border-textSecondary rounded-md focus:outline-none focus:border-primary"
            placeholder="Enter a custom message..."
          />
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
