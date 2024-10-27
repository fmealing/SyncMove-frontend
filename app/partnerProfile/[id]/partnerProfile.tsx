"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaAward,
  FaCalendarAlt,
  FaClock,
  FaHeartbeat,
  FaRocket,
} from "react-icons/fa";
import { FaMessage, FaRegCircleXmark } from "react-icons/fa6";
import { jwtDecode } from "jwt-decode";
import LoadingScreen from "@/app/components/LoadingScreen";
import { calculateAgeFromDob } from "@/app/utils/calculateAgeFromDob";
import toast from "react-hot-toast";
import Link from "next/link";
import { deleteMatch, getMatchId } from "@/app/utils/match";

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
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [matchId, setMatchId] = useState<string | null>(null);

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

    const fetchMatchId = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const foundMatchId = await getMatchId(params.id, token);
        setMatchId(foundMatchId);
      }
    };

    // Fetch both logged-in user profile and partner's details
    fetchLoggedInUserProfile();
    fetchPartner();
    fetchMatchId();
  }, [params.id]);

  const checkConnectionLimitAndMatch = async () => {
    // if (loggedInUser.connections.length >= loggedInUser.connectionLimit) {
    if (loggedInUser.connections.length >= 10) {
      setShowLimitModal(true);
    } else {
      startMatch();
    }
  };

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

      console.log("Match response: ", matchResponse.data.match._id);
      setMatchId(matchResponse.data.match._id);

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

  const handleDeleteMatch = async () => {
    if (partner && matchId) {
      // Ensure partner and matchId exist
      try {
        await deleteMatch(matchId);
        setMatchStatus(null); // Update match status or any other state as needed
      } catch (error) {
        toast.error("Failed to delete match.");
      }
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
    <div className="p-6 space-y-8 min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      {/* Header Section */}
      <div className="relative">
        <div className="relative z-10 flex flex-col items-center py-8 space-y-6">
          <img
            src={partner.profilePicture || "/default-avatar.png"}
            alt="Profile"
            className="w-80 h-80 rounded-full object-cover shadow-xl border-4 border-white transition-transform duration-300 hover:scale-105"
          />
          <h2 className="text-5xl font-extrabold text-textPrimary font-primary tracking-wide">
            {partner.fullName || "Unknown Partner"}
          </h2>
          <div className="flex space-x-6 text-base text-gray-200 font-medium">
            <span className="bg-gray-800 bg-opacity-75 px-4 py-1 rounded-full text-lg">
              {age} years
            </span>
            <span className="bg-gray-800 bg-opacity-75 px-4 py-1 rounded-full capitalize text-lg">
              {partner.gender}
            </span>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-white shadow-2xl rounded-3xl p-10 mx-8 space-y-6 border-t-4 border-primary">
        <h3 className="text-2xl font-semibold text-textPrimary flex items-center gap-3">
          <FaMessage className="text-actionAmber text-xl" /> Bio
        </h3>
        <p className="text-lg text-gray-600 font-light leading-relaxed tracking-wide">
          {partner.bio || "No bio available."}
        </p>
      </div>

      {/* Fitness Goals & Activity Preferences */}
      <div className="grid md:grid-cols-2 gap-8 px-8 mt-10">
        {/* Fitness Goal */}
        <div className="bg-white rounded-2xl shadow-lg p-10 transition duration-300 hover:scale-105 border border-textPrimary">
          <h3 className="text-2xl font-bold text-textPrimary flex items-center gap-3">
            <FaHeartbeat className="text-actionAmber text-3xl" /> Fitness Goal
          </h3>
          <p className="text-xl text-textSecondary mt-3">
            {partner.fitnessGoals || "No fitness goal provided."}
          </p>
        </div>

        {/* Activity Preference */}
        <div className="bg-white rounded-2xl shadow-lg p-10 transition duration-300 hover:scale-105 border border-textPrimary">
          <h3 className="text-2xl font-bold text-textPrimary flex items-center gap-3">
            <FaAward className="text-blue-400 text-3xl" /> Activity Preference
          </h3>
          <p className="text-xl text-textSecondary mt-3">
            {partner.activityType || "Unknown Activity"}
          </p>
        </div>
      </div>

      {/* Availability Section */}
      <div className="px-8 py-14">
        <h3 className="text-h2 font-bold font-primary text-textPrimary text-center mb-6">
          Availability
        </h3>
        <div className="flex items-center justify-center">
          {partner.availability?.timeOfDay?.map((time, index) => (
            <div
              key={index}
              className={`flex flex-col w-1/2 items-center p-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 ${
                time === "morning"
                  ? "bg-gradient-to-r from-yellow-300 to-yellow-500 text-yellow-900"
                  : time === "evening"
                  ? "bg-gradient-to-r from-purple-500 to-purple-700 text-purple-100"
                  : "bg-gradient-to-r from-blue-400 to-blue-600 text-blue-100"
              }`}
            >
              <FaClock className="text-3xl mb-4" />
              <p className="text-xl font-semibold capitalize tracking-wide">
                {time}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row justify-center gap-6 mt-8">
        <button
          onClick={checkConnectionLimitAndMatch}
          className="flex justify-center items-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-full hover:bg-primaryDark transition-shadow duration-300 text-xl"
        >
          <FaMessage /> Connect Now
        </button>
        <Link
          href={`/schedule-workout/${partner._id}`}
          className="flex items-center justify-center gap-2 border border-secondary text-secondary font-semibold px-8 py-4 rounded-full hover:bg-lightGray hover:text-secondaryDark transition duration-300 text-xl bg-white"
        >
          <FaCalendarAlt /> Schedule Workout
        </Link>
        {partner && matchId && (
          <button
            onClick={handleDeleteMatch}
            // onClick={() => console.log("Delete match")}
            className="flex justify-center items-center gap-2 bg-red-600 text-white font-semibold px-4 py-2 rounded-full hover:bg-red-700 transition-shadow duration-300 text-xl"
          >
            <FaRegCircleXmark /> Delete Match
          </button>
        )}
      </div>
      {/* Modal for Connection Limit */}
      {showLimitModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center space-y-6 transform transition-all duration-300 ease-in-out">
            <p className="text-2xl font-bold text-gray-800 font-primary">
              Max Connections Reached!
            </p>
            <p className="text-lg text-gray-600 font-primary">
              Unlock unlimited connections and join our community of premium
              members!
            </p>
            <p className="text-sm text-gray-500 font-primary italic">
              Many users are prepared to unlock extra features. Don’t miss out
              on the perks that come with upgrading!
            </p>

            {/* Call-to-action Buttons */}
            <div className="flex items-center justify-center gap-4 mt-4">
              {/* Close Button */}
              <button
                onClick={() => setShowLimitModal(false)}
                className="px-4 py-2 text-lg border border-gray-400 text-gray-500 rounded-full flex items-center justify-center gap-2"
              >
                <FaRegCircleXmark /> Not Now
              </button>

              {/* Upgrade Button */}
              <Link
                href="/pricing"
                className="px-5 py-3 text-lg font-bold text-white bg-gradient -to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center justify-center gap-2 transition-all duration-200 ease-in-out"
              >
                <FaRocket className="animate-bounce" />
                Unlock Premium Access
              </Link>
            </div>

            {/* Limited Time Offer */}
            <p className="text-sm text-red-600 font-primary">
              <strong>Limited Time Offer:</strong> Get 20% off your first year!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerProfile;
