import React from "react";
import { FaEnvelope, FaBell } from "react-icons/fa";

type NotificationSettingKey = "notifications" | "messages" | "reminders";

type NotificationSettings = {
  notifications: boolean;
  messages: boolean;
  reminders: boolean;
};

type Props = {
  notificationSettings: NotificationSettings;
  toggleSetting: (setting: NotificationSettingKey) => void; // Explicitly define the type here
};

const NotificationPreferences: React.FC<Props> = ({
  notificationSettings,
  toggleSetting,
}) => {
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
            key: "notifications" as NotificationSettingKey, // Explicit cast
          },
          {
            label: "Messages",
            state: notificationSettings.messages,
            key: "messages" as NotificationSettingKey, // Explicit cast
          },
          {
            label: "Activity Reminders",
            state: notificationSettings.reminders,
            key: "reminders" as NotificationSettingKey, // Explicit cast
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
              onChange={() => toggleSetting(key)} // No error here
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-4">
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-primaryDark transition">
          <FaEnvelope />
          Email Notifications
        </button>
        <span className="text-textSecondary font-primary">or</span>
        <button className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-full hover:bg-secondaryDark transition">
          <FaBell />
          Push Notifications
        </button>
      </div>
    </section>
  );
};

export default NotificationPreferences;
