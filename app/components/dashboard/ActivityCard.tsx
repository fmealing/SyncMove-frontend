"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";
import Link from "next/link";
import { FaRegMessage } from "react-icons/fa6";

const ActivityCard: React.FC = () => {
  const [activities, setActivities] = useState<any[]>([]); // State to store activities
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [activityToCancel, setActivityToCancel] = useState<string | null>(null); // Activity to cancel

  // Fetch activities on component mount
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

        setActivities(
          response.data.activities.filter(
            (activity: any) => activity.status !== "cancelled"
          )
        ); // Filter out cancelled activities
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      }
    };

    fetchActivities(); // Fetch activities when the component mounts
  }, []);

  // Show the confirmation modal
  const openModal = (activityId: string) => {
    setActivityToCancel(activityId); // Store the ID of the activity to cancel
    setShowModal(true); // Show the modal
  };

  // Close the confirmation modal
  const closeModal = () => {
    setActivityToCancel(null); // Reset the activity to cancel
    setShowModal(false); // Hide the modal
  };

  // Cancel an activity
  const cancelActivity = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !activityToCancel) {
        toast.error("You must be logged in to cancel activities.");
        return;
      }

      await axios.put(
        `http://localhost:5001/api/activities/${activityToCancel}`,
        { status: "cancelled" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Remove the cancelled activity from the state
      setActivities((prevActivities) =>
        prevActivities.filter((activity) => activity._id !== activityToCancel)
      );

      toast.success("Activity cancelled successfully.");
      closeModal(); // Close the modal after cancellation
    } catch (error) {
      console.error("Failed to cancel activity:", error);
      toast.error("Failed to cancel activity. Please try again.");
      closeModal(); // Close the modal even if there's an error
    }
  };

  return (
    <div className="p-6">
      {activities.length !== 0 && (
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Your Activities
        </h2>
      )}

      {activities.length !== 0 && (
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

                <div className="flex items-center justify-center gap-4">
                  {/* Message User Button */}
                  <button className="bg-primary text-white px-4 py-2 text-lg rounded-full hover:bg-primaryDark transition-colors duration-300">
                    <Link
                      href="/messaging"
                      className="flex items-center justify-center gap-2"
                    >
                      <FaRegMessage />
                      Message User
                    </Link>
                  </button>

                  {/* Cancel Activity Button */}
                  <button
                    onClick={() => openModal(activity._id)}
                    className="border-2 border-red-500 text-red-500 px-4 py-2 text-lg rounded-full hover:border-red-600 hover:text-red-600 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <FaTimesCircle />
                    Cancel Activity
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-2xl text-textPrimary font-semibold mb-4 font-['Roboto']">
              Confirm Cancellation
            </h3>
            <p className="text-gray-700 mb-6 font-['Roboto']">
              Are you sure you want to cancel this activity? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400 transition-colors duration-300 font-['Roboto']"
              >
                No, Go Back
              </button>
              <button
                onClick={cancelActivity}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-300 font-['Roboto']"
              >
                Yes, Cancel Activity
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityCard;
