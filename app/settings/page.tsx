"use client";
import React, { useState } from "react";
import {
  FaCog,
  FaEdit,
  FaTrashAlt,
  FaSave,
  FaUpload,
  FaEnvelope,
  FaBell,
} from "react-icons/fa";

const SettingsPage: React.FC = () => {
  // State to manage fitness preferences
  const [fitnessGoals, setFitnessGoals] = useState<string[]>([]);
  const [preferredActivities, setPreferredActivities] = useState<string[]>([]);
  const [preferredTime, setPreferredTime] = useState<Record<string, string[]>>({
    Weightlifting: [],
    Running: [],
    Yoga: [],
    Other: [],
  });

  // State to manage toggles
  const [notificationSettings, setNotificationSettings] = useState({
    notifications: true,
    messages: false,
    reminders: true,
  });

  // State to manage privacy settings
  const [visibility, setVisibility] = useState("Public");
  const [shareLocation, setShareLocation] = useState(false);
  const [shareActivity, setShareActivity] = useState(false);

  // Handler for selecting fitness goals
  const toggleGoal = (goal: string) => {
    setFitnessGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  // Handler for selecting preferred activities
  const toggleActivity = (activity: string) => {
    setPreferredActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  // Handler for selecting times per activity
  const toggleTime = (activity: string, time: string) => {
    setPreferredTime((prev) => ({
      ...prev,
      [activity]: prev[activity].includes(time)
        ? prev[activity].filter((t) => t !== time)
        : [...prev[activity], time],
    }));
  };

  // Handler to toggle preferences
  const toggleSetting = (setting: string) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  return (
    <div className="flex w-full min-h-screen p-6 bg-lightGray">
      {/* Left Navigation Panel */}
      <div className="w-1/4 p-4 bg-white rounded-lg shadow-md">
        <h2 className="flex items-center text-h3 font-semibold text-textPrimary mb-4">
          <FaCog className="mr-2" />
          Settings
        </h2>

        <nav className="flex flex-col space-y-4">
          {["Profile", "Preferences", "Notifications", "Privacy"].map(
            (section) => (
              <button
                key={section}
                className="flex items-center gap-2 text-textSecondary py-2 px-3 rounded-lg hover:bg-gray-100 transition"
              >
                <FaCog />
                {section}
              </button>
            )
          )}
        </nav>
      </div>

      {/* Divider */}
      <div className="divider-horizontal"></div>

      {/* Right Content Panel */}
      <div className="flex-1 p-6 bg-lightGray rounded-lg shadow-md space-y-8">
        <h1 className="text-h1 font-semibold text-textPrimary font-primary">
          Settings
        </h1>

        {/* Profile Section */}
        <section className="space-y-4">
          <h2 className="text-h2 font-semibold text-textPrimary font-primary">
            Profile
          </h2>
          <div className="flex items-center space-x-4">
            <img
              src="/avatars/avatar-1.jpg"
              alt="Profile"
              className="w-28 h-28 rounded-full border-2 border-textPrimary object-cover"
            />
            <button className="flex items-center gap-2 px-4 py-2 bg-primary rounded-full hover:bg-primaryDark transition font-primary">
              <FaUpload />
              Upload Image
            </button>
          </div>
          <div className="space-y-4">
            {["Full Name", "Email", "Password"].map((label) => (
              <div key={label} className="flex items-center space-x-2">
                <input
                  type={label === "Password" ? "password" : "text"}
                  placeholder={label}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary font-primary"
                />
                <button className="text-primary hover:text-primaryDark transition">
                  <FaEdit className="text-2xl" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Fitness Preferences Section */}
        <section className="space-y-4">
          <h2 className="text-h2 font-semibold text-textPrimary font-primary">
            Fitness Preferences
          </h2>

          <div>
            <p className="text-lg text-textPrimary font-semibold mb-2 font-primary">
              Select Your Fitness Goals
            </p>
            <div className="flex flex-wrap gap-2">
              {["Lose Weight", "Gain Muscle", "General Health", "Other"].map(
                (goal) => (
                  <button
                    key={goal}
                    className={`px-4 py-2 rounded-full border font-primary ${
                      fitnessGoals.includes(goal)
                        ? "bg-primary text-white"
                        : "border-secondary border-2 text-textPrimary"
                    }`}
                    onClick={() => toggleGoal(goal)}
                  >
                    {goal}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Preferred Activities */}
          <div>
            <p className="text-lg text-textPrimary font-semibold mb-2 font-primary">
              Select Your Preferred Activities
            </p>
            <div className="flex flex-wrap gap-2">
              {["Weightlifting", "Running", "Yoga", "Other"].map((activity) => (
                <button
                  key={activity}
                  className={`px-4 py-2 rounded-full border font-primary ${
                    preferredActivities.includes(activity)
                      ? "bg-primary text-white"
                      : "border-secondary border-2 text-textPrimary"
                  }`}
                  onClick={() => toggleActivity(activity)}
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Times */}
          {preferredActivities.map((activity) => (
            <div key={activity} className="space-y-2 mt-4">
              <p className="text-lg text-textSecondary font-medium mb-2 font-primary">
                Preferred Times for {activity}
              </p>
              <div className="flex flex-wrap gap-2">
                {["Morning", "Afternoon", "Evening"].map((time) => (
                  <button
                    key={time}
                    className={`px-4 py-2 rounded-full border ${
                      preferredTime[activity]?.includes(time)
                        ? "bg-primary text-white"
                        : "border-secondary border-2 text-textPrimary"
                    }`}
                    onClick={() => toggleTime(activity, time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Notification Preferences Section */}
        <section className="space-y-4 py-6">
          <h2 className="text-h2 font-semibold text-textPrimary font-primary">
            Notification Preferences
          </h2>

          {/* Toggle Switches */}
          <div className="space-y-4">
            {[
              {
                label: "Notifications",
                state: notificationSettings.notifications,
                key: "notifications",
              },
              {
                label: "Messages",
                state: notificationSettings.messages,
                key: "messages",
              },
              {
                label: "Activity Reminders",
                state: notificationSettings.reminders,
                key: "reminders",
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

          {/* Email and Push Notifications */}
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

        {/* Privacy Preferences Section */}
        <section className="space-y-4">
          <h2 className="text-h2 font-semibold text-textPrimary font-primary">
            Privacy Preferences
          </h2>

          {/* Visibility */}
          <div className="space-y-2">
            <label className="text-lg text-textPrimary font-primary font-semibold">
              Visibility
            </label>
            <select
              className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:border-primary text-textPrimary font-primary"
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
            >
              <option value="Public">Public</option>
              <option value="Friends">Friends</option>
              <option value="Private">Private</option>
            </select>
          </div>

          {/* Share Location and Share Activity Checkboxes */}
          <div className="space-y-2">
            {[
              {
                label: "Share Location",
                checked: shareLocation,
                onChange: setShareLocation,
              },
              {
                label: "Share Activity",
                checked: shareActivity,
                onChange: setShareActivity,
              },
            ].map(({ label, checked, onChange }) => (
              <label
                key={label}
                className="flex items-center gap-2 cursor-pointer text-textPrimary"
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary rounded-full"
                  checked={checked}
                  onChange={(e) => onChange(e.target.checked)}
                />
                {label}
              </label>
            ))}
          </div>
        </section>

        {/* Save and Delete Buttons */}
        <div className="flex justify-between pt-4">
          <button className="flex items-center gap-2 text-error px-4 py-2 rounded-full border border-error hover:bg-error hover:text-white transition">
            <FaTrashAlt />
            Delete Account
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-primaryDark transition">
            <FaSave />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
