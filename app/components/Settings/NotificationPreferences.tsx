import React, { useEffect, useState } from "react";
import { FaEnvelope, FaBell } from "react-icons/fa";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

type NotificationSettingKey = "notifications" | "messages" | "reminders";

type NotificationSettings = {
  notifications: boolean;
  messages: boolean;
  reminders: boolean;
  notificationType: "email" | "push";
};

const NotificationPreferences: React.FC = () => {
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      notifications: true,
      messages: false,
      reminders: true,
      notificationType: "email", // Default notification type
    });

  // Fetch the user's current notification preferences
  useEffect(() => {
    const fetchNotificationSettings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, user is not authenticated");
          return;
        }

        const decodedToken: { id: string } = jwtDecode(token);
        const userId = decodedToken.id;

        const response = await axios.get(
          `http://localhost:5001/api/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data.notificationPreferences;

        // Set the fetched notification settings
        setNotificationSettings({
          notifications: data.notifications,
          messages: data.messages,
          reminders: data.activityReminders,
          notificationType: data.notificationType || "email",
        });
      } catch (error) {
        console.error("Failed to fetch notification preferences:", error);
      }
    };

    fetchNotificationSettings();
  }, []);

  // Toggle individual notification settings
  const toggleSetting = (setting: NotificationSettingKey) => {
    setNotificationSettings((prevSettings) => ({
      ...prevSettings,
      [setting]: !prevSettings[setting],
    }));
  };

  // Set the notification type (email or push)
  const selectNotificationType = (type: "email" | "push") => {
    setNotificationSettings((prev) => ({
      ...prev,
      notificationType: type,
    }));
  };

  // Save the updated notification preferences
  const savePreferences = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, user is not authenticated");
        return;
      }

      const decodedToken: { id: string } = jwtDecode(token);
      const userId = decodedToken.id;

      await axios.put(
        `http://localhost:5001/api/users/${userId}`,
        {
          notificationPreferences: {
            notifications: notificationSettings.notifications,
            messages: notificationSettings.messages,
            activityReminders: notificationSettings.reminders,
            notificationType: notificationSettings.notificationType,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Notification preferences saved successfully");
      toast.success("Notification preferences saved successfully");
    } catch (error) {
      console.error("Failed to save notification preferences:", error);
      toast.error("Failed to save notification preferences");
    }
  };

  return (
    <section id="notifications" className="space-y-4 py-6">
      <h2 className="text-h2 font-semibold text-textPrimary font-primary">
        Notification Preferences
      </h2>

      <div className="space-y-4">
        {[
          {
            label: "Notifications",
            state: notificationSettings.notifications,
            key: "notifications" as NotificationSettingKey,
          },
          {
            label: "Messages",
            state: notificationSettings.messages,
            key: "messages" as NotificationSettingKey,
          },
          {
            label: "Activity Reminders",
            state: notificationSettings.reminders,
            key: "reminders" as NotificationSettingKey,
          },
        ].map(({ label, state, key }) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-lg text-textPrimary font-primary">
              {label}
            </span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={state}
              onChange={() => toggleSetting(key)}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-4">
        <button
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-primaryDark transition"
          onClick={() => selectNotificationType("email")}
        >
          <FaEnvelope />
          Email Notifications
        </button>
        <span className="text-textSecondary font-primary">or</span>
        <button
          className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-full hover:bg-secondaryDark transition"
          onClick={() => selectNotificationType("push")}
        >
          <FaBell />
          Push Notifications
        </button>
      </div>

      <button
        onClick={savePreferences}
        className="mt-4 px-4 py-2 bg-primary text-white rounded-full hover:bg-primaryDark transition"
      >
        Save Preferences
      </button>
    </section>
  );
};

export default NotificationPreferences;
