"use client";
import React, { useState } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";
import toast from "react-hot-toast";

const Step4ProfileCustomization: React.FC<{ onComplete: () => void }> = ({
  onComplete,
}) => {
  const [bio, setBio] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // Handle file input change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    console.log("File selected:", file);
    setSelectedImage(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Submitting profile customization form...");

    const token = localStorage.getItem("token");
    if (!token) return;

    console.log("Selected Image:", selectedImage);

    try {
      let profilePictureUrl = "";
      if (selectedImage) {
        const formData = new FormData();
        formData.append("file", selectedImage);

        const uploadResponse = await axios.post(
          "http://localhost:5001/api/images/upload",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        profilePictureUrl = uploadResponse.data.imageUrl;
      }

      // Save bio, profile picture URL, etc.
      await axios.post(
        "http://localhost:5001/api/users/onboarding/profile",
        { bio, profilePicture: profilePictureUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Profile updated successfully!");
      onComplete(); // Move to the next step
    } catch (error) {
      console.error("Failed to save profile:", error);
      toast.error("Failed to save profile. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <h2 className="text-h3 font-semibold text-center font-primary text-textPrimary">
        Customize Your Profile
      </h2>

      {/* Bio Section */}
      <div className="flex flex-col space-y-2">
        <label className="font-primary text-textPrimary">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="border border-textSecondary rounded px-4 py-2 text-textPrimary"
          rows={3}
          maxLength={150}
          placeholder="Write a short bio about yourself..."
        />
      </div>

      {/* Profile Picture Upload */}
      <div className="flex items-center gap-2">
        <input
          type="file"
          onChange={handleImageChange}
          // className="hidden"
          id="profile-upload"
        />
        <label
          htmlFor="profile-upload"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full cursor-pointer"
          onClick={() => console.log("Label clicked")}
        >
          <FaUpload />
          {selectedImage ? "Image Selected" : "Upload Profile Picture"}
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-primary text-white rounded-full py-2 mt-4 font-semibold"
      >
        Continue
      </button>
    </form>
  );
};

export default Step4ProfileCustomization;
