import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const PrivacyPreferences: React.FC = () => {
  const [visibility, setVisibility] = useState<string>("Public");
  const [shareLocation, setShareLocation] = useState<boolean>(true);
  const [shareActivity, setShareActivity] = useState<boolean>(true);

  // Fetch user privacy preferences
  useEffect(() => {
    const fetchPrivacyPreferences = async () => {
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

        const data = response.data.privacyPreferences;
        setVisibility(data.visibility || "Public");
        setShareLocation(data.shareLocation);
        setShareActivity(data.shareActivity);
      } catch (error) {
        console.error("Failed to fetch privacy preferences:", error);
      }
    };

    fetchPrivacyPreferences();
  }, []);

  // Save privacy preferences to the backend
  const savePrivacyPreferences = async () => {
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
          privacyPreferences: {
            visibility,
            shareLocation,
            shareActivity,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Privacy preferences saved successfully");
      toast.success("Privacy preferences saved successfully");
    } catch (error) {
      console.error("Failed to save privacy preferences:", error);
      toast.error("Failed to save privacy preferences");
    }
  };

  return (
    <section id="privacy" className="space-y-4">
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
        <label className="flex items-center gap-2 cursor-pointer text-textPrimary">
          <input
            type="checkbox"
            className="checkbox checkbox-primary rounded-full"
            checked={shareLocation}
            onChange={(e) => setShareLocation(e.target.checked)}
          />
          Share Location
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-textPrimary">
          <input
            type="checkbox"
            className="checkbox checkbox-primary rounded-full"
            checked={shareActivity}
            onChange={(e) => setShareActivity(e.target.checked)}
          />
          Share Activity
        </label>
      </div>

      {/* Save Button */}
      <button
        onClick={savePrivacyPreferences}
        className="mt-4 px-4 py-2 bg-primary text-white rounded-full hover:bg-primaryDark transition"
      >
        Save Privacy Preferences
      </button>
    </section>
  );
};

export default PrivacyPreferences;
