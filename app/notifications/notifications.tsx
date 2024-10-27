"use client";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import NotificationItem from "../components/NotificationItem";
import {
  fetchNotifications,
  deleteNotification,
} from "../utils/notificationApi";
import toast from "react-hot-toast";

const Notifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  const handleDeleteNotification = async (id: string) => {
    try {
      await deleteNotification(id, token as string);
      setNotifications((prev) =>
        prev.filter((notification) => notification._id !== id)
      );
    } catch {
      toast.error("Failed to delete notification. Please try again.");
    }
  };

  useEffect(() => {
    if (!token) return;
    const fetchAllNotifications = async () => {
      try {
        const data = await fetchNotifications(token);
        setNotifications(data);
        setLoading(false);
      } catch {
        setError("Failed to load notifications. Please try again later.");
        setLoading(false);
      }
    };
    fetchAllNotifications();
  }, [token]);

  if (loading) return <LoadingScreen />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="notification-background w-full min-h-screen flex flex-col items-center p-6 bg-lightGray">
      <div className="notification-content max-w-4xl w-full space-y-6 bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-h2 font-semibold font-primary text-textPrimary">
          Notifications
        </h1>
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
              <NotificationItem
                key={notification._id}
                notification={notification}
                token={token as string}
                onDelete={handleDeleteNotification}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notifications;
