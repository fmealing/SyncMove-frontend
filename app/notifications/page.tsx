// TO IMPLEMENT using DaisyUI and TailwindCSS
// Heading that says "Notifications"
// 2 possible states: no notifications and notifications
// No notifications: display a message that says "No notifications" along side an illustration
// Notifications:
// - Secondary button in textPrimary that says "Clear all" with an icon
// - List of notifications with the following structure:
//   - Timestamp
//   - Notification message
//   - Mark as read button
//   - Message user button

"use client";
import React, { useState } from "react";
import {
  FaBellSlash,
  FaTrashAlt,
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";

const NotificationsPage = () => {
  // Dummy data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      timestamp: "5 minutes ago",
      message: "New message from Alice",
      read: false,
    },
    {
      id: 2,
      timestamp: "2 hours ago",
      message: "Bob wants to go running",
      read: false,
    },
    {
      id: 3,
      timestamp: "1 day ago",
      message: "Charlie sent you a friend request",
      read: false,
    },
  ]);

  const clearNotifications = () => setNotifications([]);

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="notification-background w-full min-h-screen flex flex-col items-center p-6 bg-lightGray">
      <div className="notification-content max-w-4xl w-full space-y-6 bg-white rounded-lg shadow-lg p-6">
        {/* Heading */}
        <h1 className="text-h2 font-semibold font-primary text-textPrimary">
          Notifications
        </h1>

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
                  key={notification.id}
                  className={`flex items-center justify-between p-4 border rounded-lg ${
                    notification.read ? "bg-gray-100" : "bg-blue-50"
                  }`}
                >
                  <div className="flex-1">
                    <p className="text-sm text-textSecondary font-primary">
                      {notification.timestamp}
                    </p>
                    <p className="text-lg text-textPrimary font-primary">
                      {notification.message}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
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

export default NotificationsPage;
