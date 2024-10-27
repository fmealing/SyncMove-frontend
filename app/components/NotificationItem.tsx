"use client";
import React from "react";
import Link from "next/link";
import { FaCheckCircle, FaEnvelope, FaTimesCircle } from "react-icons/fa";
import { acceptMatch, declineMatch } from "../utils/notificationApi";
import toast from "react-hot-toast";

interface NotificationProps {
  notification: any;
  token: string;
  onDelete: (id: string) => void;
}

const NotificationItem: React.FC<NotificationProps> = ({
  notification,
  token,
  onDelete,
}) => {
  const handleAccept = async () => {
    try {
      await acceptMatch(notification.matchId, token);
      onDelete(notification._id);
      toast.success("Match request accepted!");
    } catch {
      toast.error("Failed to accept match request. Please try again.");
    }
  };

  const handleDecline = async () => {
    try {
      await declineMatch(notification.matchId, token);
      onDelete(notification._id);
      toast.success("Match request declined.");
    } catch {
      toast.error("Failed to decline match request. Please try again.");
    }
  };

  return (
    <li
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
            <button
              onClick={handleAccept}
              className="text-primary hover:text-green-600 transition"
            >
              <FaCheckCircle className="text-xl" />
            </button>
            <button
              onClick={handleDecline}
              className="text-red-500 hover:text-red-700 transition"
            >
              <FaTimesCircle className="text-xl" />
            </button>
          </>
        )}
        {notification.type === "activity_invite" && (
          <Link href="/messaging">
            <FaEnvelope className="text-xl text-primary hover:text-blue-600 transition" />
          </Link>
        )}
      </div>
    </li>
  );
};

export default NotificationItem;
