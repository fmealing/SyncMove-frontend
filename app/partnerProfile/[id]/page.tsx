"use client"; // Required for client-side functionality

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaAward, FaClock, FaHeartbeat } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

const PartnerProfile = ({ params }: { params: { id: string } }) => {
  const [partner, setPartner] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [matchStatus, setMatchStatus] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      // Fetch partner details based on ID
      const fetchPartner = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5001/api/users/${params.id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setPartner(response.data);
        } catch (error) {
          console.error("Failed to fetch partner details", error);
          setError("Failed to load partner details. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
      fetchPartner();
    }
  }, [params.id]);

  // Function to calculate match score
  const calculateMatchScore = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5001/match", {
        location: partner.location.coordinates, // Example: [52.4888835, -1.8952849]
        preferences: [
          partner.activityType, // Example: "Cycling"
          partner.availability.timeOfDay || "Other", // Example: "Other" (fallback value if undefined)
          partner.experienceLevel, // Example: 2
        ],
        includeAI: false,
      });

      return response.data.score; // Assuming the API returns a score
    } catch (error) {
      console.error("Error calculating match score: ", error);
      throw error;
    }
  };

  // Function to start a match
  const startMatch = async () => {
    try {
      const score = await calculateMatchScore(); // First, calculate the match score
      const user2Id = params.id; // Partner's ID

      await axios.post(
        "http://localhost:5001/api/match",
        {
          user2Id,
          score,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMatchStatus("Match started successfully!");
    } catch (error) {
      console.error("Failed to start match: ", error);
      setMatchStatus("Failed to start match.");
    }
  };

  if (loading) {
    return <p>Loading partner details...</p>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()} // Retry on error
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!partner) {
    return <p>Partner not found.</p>;
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
              {partner.age ? `${partner.age} years old` : "Age not available"}
            </p>
          </div>

          {/* Button to start connection */}
          <button
            onClick={startMatch}
            className="px-4 py-2 border-textPrimary rounded-full bg-primary text-h3 font-primary flex gap-2 justify-center items-center"
          >
            <FaMessage />
            Connect Now!
          </button>

          {matchStatus && <p className="text-actionAmber">{matchStatus}</p>}
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

          {/* Debugging button */}
          <button
            onClick={() => console.log("Partner: ", partner)}
            className="px-4 py-2 rounded-full text-white bg-primary text-h3 font-primary"
          >
            Keep for debugging
          </button>

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
              {/* Activity Type Button */}
              <button className="flex items-center justify-center w-[300px] h-[80px] rounded-full border-4 border-gradient-to-r from-blue-400 to-blue-600 text-primary text-h3 font-primary gap-3 shadow-lg hover:shadow-2xl transform hover:scale-105 transition">
                <FaHeartbeat className="text-blue-500 text-2xl" />
                <span>{partner.activityType || "Unknown Activity"}</span>
              </button>

              {/* Experience Level Button */}
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
