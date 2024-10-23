"use client";

import React, { useEffect, useState } from "react";
import {
  FaTrashAlt,
  FaEnvelope,
  FaCheckCircle,
  FaCalendarAlt,
  FaTimesCircle,
} from "react-icons/fa";
import axios from "axios";
import LoadingScreen from "../components/LoadingScreen";
import Link from "next/link";
import toast from "react-hot-toast";

interface ErrorMessage {
  response: {
    status: number;
  };
}

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
      setNotifications(response.data.data);
      setLoading(false);
    } catch (error) {
      const err = error as ErrorMessage;
      if (err.response && err.response.status === 404) {
        setNotifications([]);
      } else {
        setError("Failed to load notifications. Please try again later.");
      }
      setLoading(false);
    }
  };

  // Delete notification
  const deleteNotification = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5001/api/notifications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification._id !== id)
      );
    } catch (error) {
      toast.error("Failed to delete notification. Please try again.");
    }
  };

  // Accept match request
  const acceptMatch = async (notificationId: string, matchId: string) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5001/api/match/${matchId}/accept`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      deleteNotification(notificationId); // Delete the notification after accepting
      toast.success("Match request accepted!");
    } catch (error) {
      toast.error("Failed to accept match request. Please try again.");
    }
  };

  // Decline match request
  const declineMatch = async (notificationId: string, matchId: string) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5001/api/match/${matchId}/decline`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      deleteNotification(notificationId); // Delete the notification after declining
      toast.success("Match request declined.");
    } catch (error) {
      toast.error("Failed to decline match request. Please try again.");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="notification-background w-full min-h-screen flex flex-col items-center p-6 bg-lightGray">
      <div className="notification-content max-w-4xl w-full space-y-6 bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-h2 font-semibold font-primary text-textPrimary">
          Notifications
        </h1>

        {/* Button for Debugging */}
        <button
          onClick={() => console.log("Notifications:", notifications)}
          className="text-lg font-primary text-white px-4 py-2 bg-primary rounded-full"
        >
          For Debugging. Delete later
        </button>

        {error && <p className="text-red-500">{error}</p>}

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
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li
                key={notification._id}
                className={`flex flex-col md:flex-row justify-between p-4 border rounded-lg ${
                  notification.isRead ? "bg-gray-100" : "bg-blue-50"
                }`}
              >
                <div className="flex-1 mb-4 md:mb-0">
                  <p className="text-sm text-textSecondary font-primary">
                    {notification.timestamp}
                  </p>
                  <p className="text-lg text-textPrimary font-primary mb-4">
                    {notification.content}
                  </p>
                  <p
                    className={`flex items-center justify-center max-w-32 w-full text-sm font-bold px-3 py-1 rounded-full text-white ${
                      notification.type === "match_request"
                        ? "bg-red-500"
                        : notification.type === "message"
                        ? "bg-green-500"
                        : notification.type === "activity_invite"
                        ? "bg-yellow-500"
                        : "bg-blue-900"
                    }`}
                  >
                    {notification.type.replace("_", " ")}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  {notification.type === "match_request" && (
                    <>
                      <div className="flex flex-col items-center">
                        <button
                          onClick={() =>
                            acceptMatch(notification._id, notification.matchId)
                          }
                          className="text-primary hover:text-green-600 transition"
                        >
                          <FaCheckCircle className="text-xl" />
                        </button>
                        <span className="text-base text-textPrimary font-primary hover:text-textSecondary transition">
                          Accept Match
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <button
                          onClick={() =>
                            declineMatch(notification._id, notification.matchId)
                          }
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <FaTimesCircle className="text-xl" />
                        </button>
                        <span className="text-base text-textPrimary font-primary hover:text-textSecondary transition">
                          Decline Match
                        </span>
                      </div>
                    </>
                  )}

                  <div className="flex flex-col items-center">
                    {notification.type !== "rejected" || (
                      <>
                        <Link href={"/messaging"}>
                          <button className="text-primary hover:text-blue-600 transition">
                            <FaEnvelope className="text-xl" />
                          </button>
                        </Link>
                        <span className="text-base text-textPrimary font-primary hover:text-textSecondary transition">
                          Message User
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notifications;
