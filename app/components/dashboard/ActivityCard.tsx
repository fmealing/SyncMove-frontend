"use client"; // Ensure this runs in the browser environment

import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import Link from "next/link";
import { FaRegMessage } from "react-icons/fa6";

const ActivityCard: React.FC = () => {
  const [activities, setActivities] = useState<any[]>([]); // State to store activities

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem("token"); // Fetch token from localStorage
        if (!token) {
          toast.error("You must be logged in to view activities.");
          return;
        }

        const decoded = jwtDecode<{ id: string }>(token); // Decode the token to get the user ID
        const userId = decoded.id;

        // Make GET request to fetch user activities
        const response = await axios.get(
          `http://localhost:5001/api/activities/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setActivities(response.data.activities); // Assuming the data contains activities
      } catch (error) {
        console.error("Failed to fetch activities:", error);
        toast.error("Failed to fetch activities.");
      }
    };

    fetchActivities(); // Fetch activities when the component mounts
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Activities</h2>

      {activities.length === 0 ? (
        <p className="text-gray-600">No activities found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activities.map((activity) => (
            <div
              key={activity._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div className="p-6">
                {/* Activity Type */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-primary">
                  {activity.activityType}
                </h3>

                {/* Description */}
                <p className="text-gray-700 text-xl mb-4 font-primary">
                  {activity.description}
                </p>

                {/* Date */}
                <div className="flex items-center text-gray-500 mb-2">
                  <FaCalendarAlt className="mr-2 w-6 h-6 text-secondary" />
                  <p className="text-lg">{activity.dateString}</p>
                </div>

                {/* Time */}
                <div className="flex items-center text-gray-500 mb-2">
                  <FaClock className="mr-2 w-6 h-6 text-secondary" />
                  <p className="text-lg">{activity.timeOfDay}</p>
                </div>

                {/* Location */}
                <div className="flex items-center text-gray-500 mb-4">
                  <FaMapMarkerAlt className="mr-2 w-6 h-6 text-secondary" />
                  <p className="text-lg">{activity.location}</p>
                </div>

                <button className="bg-primary text-white px-4 py-2 text-lg rounded-full hover:bg-primaryDark transition-colors duration-300">
                  <Link
                    href="/messaging"
                    className="flex items-center justify-center gap-2"
                  >
                    <FaRegMessage />
                    Message User
                  </Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityCard;
