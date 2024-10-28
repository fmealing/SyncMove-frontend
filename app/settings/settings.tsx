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
import SEO from "../components/SEO";

// Types declaration
type NotificationSettings = {
  notifications: boolean;
  messages: boolean;
  reminders: boolean;
};

type NotificationSettingKey = "notifications" | "messages" | "reminders";

const Settings: React.FC = () => {
  return (
    <>
      <SEO
        title="SyncMove Settings | Customize Your Experience"
        description="Adjust your profile, fitness preferences, notifications, and privacy settings to personalize your SyncMove experience."
        keywords="SyncMove settings, profile customization, fitness preferences, privacy settings"
      />

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
          <FitnessPreferences />
          <NotificationPreferences />
          <PrivacyPreferences />
        </div>
      </div>
    </>
  );
};

export default Settings;
