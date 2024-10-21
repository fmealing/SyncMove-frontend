"use client"; // Required for client-side functionality

import React, { useEffect, useState } from "react";
import {
  FaBellSlash,
  FaTrashAlt,
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import LoadingScreen from "../components/LoadingScreen";

const Notifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch notifications from the backend
  const fetchNotifications = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get(
        "http://localhost:5001/api/notifications",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotifications(response.data.data); // Set notifications from the response
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      setError("Failed to load notifications. Please try again later.");
      setLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5001/api/notifications/${id}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Update local state after marking as read
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  // Clear all notifications
  const clearNotifications = () => setNotifications([]);

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="notification-background w-full min-h-screen flex flex-col items-center p-6 bg-lightGray">
      <div className="notification-content max-w-4xl w-full space-y-6 bg-white rounded-lg shadow-lg p-6">
        {/* Heading */}
        <h1 className="text-h2 font-semibold font-primary text-textPrimary">
          Notifications
        </h1>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Notifications List or No Notifications */}
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center space-y-4 p-10">
            <img
              src="/svg/chatting-illustration.svg"
              alt="No Notifications"
              className="w-1/2 md:w-1/3"
            />
            <p className="text-lg text-textPrimary font-primary">
              No Notifications
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Clear All Button */}
            <button
              onClick={clearNotifications}
              className="flex items-center gap-2 text-textSecondary border-[3px] border-secondary px-4 py-2 rounded-full hover:bg-primary hover:text-lightGray transition font-primary"
            >
              <FaTrashAlt />
              Clear All
            </button>

            {/* List of Notifications */}
            <ul className="space-y-4">
              {notifications.map((notification) => (
                <li
                  key={notification._id}
                  className={`flex items-center justify-between p-4 border rounded-lg ${
                    notification.isRead ? "bg-gray-100" : "bg-blue-50"
                  }`}
                >
                  <div className="flex-1">
                    <p className="text-sm text-textSecondary font-primary">
                      {notification.timestamp}
                    </p>
                    <p className="text-lg text-textPrimary font-primary">
                      {notification.content}
                    </p>
                    <p
                      className={`flex items-center justify-center max-w-32 w-full text-sm font-bold px-3 py-1 rounded-full text-white
                                  ${
                                    notification.type === "match_request"
                                      ? "bg-red-500"
                                      : notification.type === "message"
                                      ? "bg-green-500"
                                      : notification.type === "activity_invite"
                                      ? "bg-yellow-500"
                                      : "bg-gray-500"
                                  }`}
                    >
                      {notification.type.replace("_", " ")}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification._id)}
                        className="text-primary hover:text-green-600 transition"
                      >
                        <FaCheckCircle className="text-xl" />
                      </button>
                    )}
                    <button className="text-primary hover:text-blue-600 transition">
                      <FaEnvelope className="text-xl" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
