// TO IMPLEMENT using DaisyUI and TailwindCSS and typescript
// Left Side: buttons that quickly get you to the different sections of the SettingsPage (Profile, Preferences, Notification, Privacy) with a gear Icon
// Vertical divider
// Right Side:
// - Heading that says "Settings"
// - Profile Section with heading
//    - 3 input fields (Full Name, Email, Password) with an edit button (ghost with icon)
//     Small Profile picture (120x120px fully rounded) with textPrimary border. Next to that an upload image button with icon
// - Fitness Preferences Section with heading
//    - selection of 4 fitness goals (Lose Weight, Gain Muscle, General Health, Other)
//    - rounded checkbox for preferred activities (Weightlifting, Running, Yoga, Other)
//    - rounded checkbox for preferred times (Morning, Afternoon, Evening) for each activity selected
// - Notification Preferences Section with heading
//    - 3 toggles for Notifications, Messages and Activity Reminders
//    - primary button that say "Email Notifications" and "Push Notifications" with icons separated by an "or" text
// - Privacy Section with heading
//    - Visibility select from (Public, Friends, Private)
//    - rounded checkbox for Share Location and Share Activity
// - Button that says delete account in error color with icon
// - Button that says save changes in primary color with icon

"use client";
import React from "react";
import { FaCog, FaEdit, FaTrashAlt, FaSave, FaUpload } from "react-icons/fa";

const SettingsPage: React.FC = () => {
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
          {/* TODO: Implement the fitness preferences section */}
        </section>

        {/* Notification Preferences Section */}
        <section className="space-y-4">
          <h2 className="text-h2 font-semibold text-textPrimary font-primary">
            Notification Preferences
          </h2>
          {/* TODO: Implement notification preferences section */}
        </section>

        {/* Privacy Preferences Section */}
        <section className="space-y-4">
          <h2 className="text-h2 font-semibold text-textPrimary font-primary">
            Privacy Preferences
          </h2>
          {/* TODO: Implement Privacy preferences section */}
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
