"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaAward, FaCalendarAlt, FaClock, FaHeartbeat } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { jwtDecode } from "jwt-decode";
import LoadingScreen from "@/app/components/LoadingScreen";
import { calculateAgeFromDob } from "@/app/utils/calculateAgeFromDob";
import toast from "react-hot-toast";

// Calculate age from date of birth
const calculateAge = (dob: string) => {
  if (!dob) return null;
  const birthDate = new Date(dob);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const PartnerProfile = ({ params }: { params: { id: string } }) => {
  const [partner, setPartner] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [matchStatus, setMatchStatus] = useState<string | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [age, setAge] = useState<number | null>(null); // Add age state

  useEffect(() => {
    const fetchLoggedInUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode<{ id: string }>(token);
          const userId = decoded.id;
          const response = await axios.get(
            `http://localhost:5001/api/users/${userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setLoggedInUser(response.data);
        } catch (error) {
          console.error("Failed to fetch logged-in user profile", error);
        }
      }
    };

    const fetchPartner = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/users/${params.id}`
        );
        setPartner(response.data);

        // Calculate and set the age based on the partner's DOB
        const calculatedAge = calculateAge(response.data.dob);
        setAge(calculatedAge); // Set age in state
      } catch (error) {
        console.error("Failed to fetch partner details", error);
        setError("Failed to load partner details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    // Fetch both logged-in user profile and partner's details
    fetchLoggedInUserProfile();
    fetchPartner();
  }, [params.id]);

  // Fetch match score based on partner and logged-in user
  const fetchMatchScore = async () => {
    if (!loggedInUser || !partner || !age) return null; // Ensure age is available

    try {
      const response = await axios.post("http://127.0.0.1:5001/match", {
        location: loggedInUser.location.coordinates,
        preferences: [
          loggedInUser.activityType,
          loggedInUser.fitnessGoals,
          loggedInUser.experienceLevel,
          age, // Use age here
        ],
        includeAI: false,
      });

      const match = response.data.matches.find(
        (m: any) => m.user_id === params.id
      );

      if (match) {
        setMatchScore(match.score);
        return match.score;
      } else {
        setMatchScore(null);
        return null;
      }
    } catch (error) {
      console.error("Error fetching match score: ", error);
      return null;
    }
  };

  useEffect(() => {
    if (loggedInUser && partner && age !== null) {
      // Wait for age to be defined
      fetchMatchScore();
    }
  }, [loggedInUser, partner, age]);

  const startMatch = async () => {
    const user2Id = params.id;
    const score = await fetchMatchScore();
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode<{ id: string }>(token);
    const senderId = decoded.id;

    try {
      const matchResponse = await axios.post(
        "http://localhost:5001/api/match/create",
        { user2Id, score },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (matchResponse.status === 201) {
        try {
          const notificationResponse = await axios.post(
            "http://localhost:5001/api/notifications",
            {
              userId: user2Id,
              senderId: senderId,
              matchId: matchResponse.data.match._id,
              type: "match_request",
              content: `${loggedInUser.fullName} wants to Workout with you.`,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (notificationResponse.status === 201) {
            toast.success("Match and notification created successfully!");
          }
        } catch (notificationError) {
          toast.error("Match created, but notification failed.");
        }
      } else {
        toast.error("Failed to create match.");
      }
    } catch (error) {
      setMatchStatus("Failed to create match or send notification.");
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!partner) {
    toast.error("Partner not found. Please try again later.");
  }

  return (
    <div className="p-6 space-y-8 min-h-screen">
      {/* Bio Section */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 flex flex-col items-center space-y-4">
          <img
            src={partner.profilePicture || "/default-avatar.png"}
            alt="Profile"
            className="w-80 h-80 rounded-full object-cover border-2 border-textPrimary"
          />
          <div className="text-center">
            <h2 className="text-2xl font-bold text-textPrimary font-primary">
              {partner.fullName || "Unknown Partner"}
            </h2>
            <p className="text-textSecondary font-primary">
              Match: {matchScore}%
            </p>
            <p className="text-textSecondary font-primary">
              {partner.dob
                ? `${calculateAgeFromDob(partner.dob)} years old`
                : "Age not available"}
            </p>
          </div>

          {/* Connect Button */}
          <button
            onClick={startMatch}
            className="px-4 py-2 border-textPrimary rounded-full bg-primary text-h3 font-primary flex gap-2 justify-center items-center"
          >
            <FaMessage />
            Connect Now!
          </button>

          {/* Schedule Workout Button */}
          <button
            onClick={() =>
              (window.location.href = `/schedule-workout/${partner._id}`)
            }
            className="px-6 py-3 mt-4 border border-primary text-primary rounded-full flex gap-2 items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300"
          >
            <FaCalendarAlt />
            Schedule Workout
          </button>
        </div>

        <div className="md:w-2/3 space-y-6 px-10">
          {/* Bio */}
          <div>
            <h3 className="text-h3 font-semibold text-textPrimary font-primary">
              Bio
            </h3>
            <div className="divider"></div>
            <p className="text-textPrimary font-primary text-lg mb-6">
              {partner.bio || "No bio available."}
            </p>
          </div>

          {/* Fitness Goal */}
          <div>
            <h3 className="text-h3 font-semibold text-textPrimary font-primary">
              Fitness Goal
            </h3>
            <div className="divider"></div>
            <p className="text-textPrimary font-primary text-lg">
              {partner.fitnessGoals || "No fitness goal provided."}
            </p>
          </div>

          {/* Activity Preference Section */}
          <div className="space-y-6 p-8 bg-gray-50 rounded-lg shadow-lg">
            <h3 className="text-h2 font-semibold text-textPrimary font-primary text-center">
              Activity Preference
            </h3>
            <div className="divider"></div>
            <div className="grid grid-cols-2 gap-8 justify-items-center">
              <button className="flex items-center justify-center w-[300px] h-[80px] rounded-full border-4 border-gradient-to-r from-blue-400 to-blue-600 text-primary text-h3 font-primary gap-3 shadow-lg hover:shadow-2xl transform hover:scale-105 transition">
                <FaHeartbeat className="text-blue-500 text-2xl" />
                <span>{partner.activityType || "Unknown Activity"}</span>
              </button>

              <button className="flex items-center justify-center w-[300px] h-[80px] rounded-full border-4 border-gradient-to-r from-yellow-400 to-yellow-600 text-primary text-h3 font-primary gap-3 shadow-lg hover:shadow-2xl transform hover:scale-105 transition">
                <FaAward className="text-yellow-500 text-2xl" />
                <span>
                  {partner.experienceLevel
                    ? partner.experienceLevel >= 4
                      ? "Advanced"
                      : partner.experienceLevel >= 2
                      ? "Intermediate"
                      : "Beginner"
                    : "No Experience Level"}
                </span>
              </button>
            </div>
          </div>

          {/* Availability Section */}
          <div className="space-y-6 flex flex-col items-center p-8 bg-gray-50 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold text-gray-800 font-primary text-center">
              Availability
            </h3>
            <div className="divider w-full"></div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {partner.availability?.timeOfDay?.map(
                (time: string, index: number) => (
                  <div
                    key={index}
                    className={`flex items-center justify-start gap-4 w-[280px] h-[120px] rounded-lg shadow-lg p-4 transition transform hover:scale-105 ${
                      time === "Morning"
                        ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white"
                        : time === "Evening"
                        ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    <div className="bg-white rounded-full p-3 flex items-center justify-center">
                      <FaClock
                        className={
                          time === "Morning"
                            ? "text-blue-600"
                            : "text-purple-600"
                        }
                        size={24}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold font-primary">
                        {time}
                      </span>
                      <span className="text-lg text-gray-200 font-primary">
                        {partner.activityType || "Unknown Activity"}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerProfile;
