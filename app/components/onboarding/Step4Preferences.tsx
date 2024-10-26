"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Step4Preferences: React.FC<{ onComplete: () => void }> = ({
  onComplete,
}) => {
  const [privacyPreferences, setPrivacyPreferences] = useState({
    visibility: "public",
    shareLocation: true,
    shareActivity: true,
  });

  const [notificationPreferences, setNotificationPreferences] = useState({
    notifications: true,
    messages: true,
    activityReminders: true,
    notificationType: "email",
  });

  const handlePrivacyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setPrivacyPreferences((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNotificationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setNotificationPreferences((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.post(
        "http://localhost:5001/api/users/onboarding/preferences",
        { privacyPreferences, notificationPreferences },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Preferences saved!");
      onComplete(); // Proceed to the next step or dashboard
    } catch (error) {
      console.error("Failed to save preferences:", error);
      toast.error("Failed to save preferences. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <h2 className="text-3xl font-bold font-primary text-center text-primary mb-4">
        Privacy & Notifications
      </h2>

      {/* Privacy Settings */}
      <div className="space-y-4 p-4 rounded-lg shadow-md border border-gray-200 bg-white">
        <h3 className="text-lg font-semibold text-primary mb-2 font-primary">
          Privacy Settings
        </h3>

        <div className="flex flex-col space-y-2">
          <label className="font-medium text-textPrimary font-primary">
            Profile Visibility:
            <select
              name="visibility"
              value={privacyPreferences.visibility}
              onChange={handlePrivacyChange}
              className="block w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary font-primary"
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </label>

          <label className="flex items-center gap-2 font-medium font-primary text-textPrimary">
            <input
              type="checkbox"
              name="shareLocation"
              checked={privacyPreferences.shareLocation}
              onChange={handlePrivacyChange}
              className="form-checkbox h-4 w-4 text-primary"
            />
            Share Location
          </label>

          <label className="flex items-center gap-2 font-medium font-primary text-textPrimary">
            <input
              type="checkbox"
              name="shareActivity"
              checked={privacyPreferences.shareActivity}
              onChange={handlePrivacyChange}
              className="form-checkbox h-4 w-4 text-primary"
            />
            Share Activity
          </label>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="space-y-4 p-4 rounded-lg shadow-md border border-gray-200 bg-white">
        <h3 className="text-lg font-semibold font-primary text-primary mb-2">
          Notification Settings
        </h3>

        <label className="flex items-center gap-2 font-medium font-primary text-textPrimary">
          <input
            type="checkbox"
            name="notifications"
            checked={notificationPreferences.notifications}
            onChange={handleNotificationChange}
            className="form-checkbox h-4 w-4 text-primary"
          />
          Enable Notifications
        </label>

        <label className="flex items-center gap-2 font-medium font-primary text-textPrimary">
          <input
            type="checkbox"
            name="messages"
            checked={notificationPreferences.messages}
            onChange={handleNotificationChange}
            className="form-checkbox h-4 w-4 text-primary"
          />
          Message Notifications
        </label>

        <label className="flex items-center gap-2 font-medium font-primary text-textPrimary pb-4">
          <input
            type="checkbox"
            name="activityReminders"
            checked={notificationPreferences.activityReminders}
            onChange={handleNotificationChange}
            className="form-checkbox h-4 w-4 text-primary"
          />
          Activity Reminders
        </label>

        <label className="font-medium font-primary text-textPrimary">
          Notification Type:
          <select
            name="notificationType"
            value={notificationPreferences.notificationType}
            onChange={handleNotificationChange}
            className="block w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
          >
            <option value="email">Email</option>
            <option value="push">Push</option>
          </select>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-primary hover:bg-primaryDark text-white rounded-full py-3 font-semibold transition-all duration-200 ease-in-out font-primary"
      >
        Finish Onboarding
      </button>
    </form>
  );
};

export default Step4Preferences;
