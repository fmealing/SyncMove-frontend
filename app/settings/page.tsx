// TODO: Make Sidebar work ✅
// TODO: Turn the settings page into components
// TODO: Dynamic Profile Section
// TODO: Dynamic Fitness Preferences Section
// TODO: Dynamic Notification Preferences Section
// TODO: Dynamic Privacy Preferences Section

"use client";
import Link from "next/link";
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
import ProfileSection from "../components/Settings/ProfileSection";
import FitnessPreferences from "../components/Settings/FitnessPreferences";
import NotificationPreferences from "../components/Settings/NotificationPreferences";
import PrivacyPreferences from "../components/Settings/PrivacyPreferences";

// Types declaration
type NotificationSettings = {
  notifications: boolean;
  messages: boolean;
  reminders: boolean;
};

type NotificationSettingKey = "notifications" | "messages" | "reminders";

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

  // Activity Levels
  const [activityLevels, setActivityLevels] = useState<Record<string, number>>({
    Weightlifting: 1,
    Running: 1,
    Yoga: 1,
    Other: 1,
  });

  // State to manage toggles
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
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
  const toggleSetting = (setting: NotificationSettingKey) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  // Handler to set Activity Levels
  const setExperienceLevel = (activity: string, level: number) => {
    setActivityLevels((prev) => ({
      ...prev,
      [activity]: level,
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
          {[
            { section: "Profile", id: "profile" },
            { section: "Preferences", id: "preferences" },
            { section: "Notifications", id: "notifications" },
            { section: "Privacy", id: "privacy" },
          ].map(({ section, id }) => (
            <button
              key={section}
              className="flex items-center gap-2 text-textSecondary py-2 px-3 rounded-lg hover:bg-gray-100 transition"
              onClick={() => {
                document
                  .getElementById(id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <FaCog />
              {section}
            </button>
          ))}
        </nav>
      </div>

      {/* Divider */}
      <div className="divider-horizontal"></div>

      {/* Right Content Panel */}
      <div className="flex-1 p-6 bg-lightGray rounded-lg shadow-md space-y-8">
        <ProfileSection />
        <FitnessPreferences
          fitnessGoals={fitnessGoals}
          preferredActivities={preferredActivities}
          activityLevels={activityLevels}
          toggleGoal={toggleGoal}
          toggleActivity={toggleActivity}
          setExperienceLevel={setExperienceLevel}
          preferredTime={preferredTime}
          toggleTime={toggleTime}
        />
        <NotificationPreferences
          notificationSettings={notificationSettings}
          toggleSetting={toggleSetting}
        />
        <PrivacyPreferences
          visibility={visibility}
          shareLocation={shareLocation}
          shareActivity={shareActivity}
          setVisibility={setVisibility}
          setShareLocation={setShareLocation}
          setShareActivity={setShareActivity}
        />
      </div>
    </div>
  );
};

export default SettingsPage;
