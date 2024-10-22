import React, { useEffect, useState } from "react";
import { FaEdit, FaUpload } from "react-icons/fa";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

interface UserData {
  fullName: string;
  email: string;
  profilePicture: string;
  bio: string;
}

const ProfileSection: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [bio, setBio] = useState<string>(""); // State to handle bio input
  const [isSavingProfile, setIsSavingProfile] = useState<boolean>(false); // Loading state for saving the entire profile
  const [profileSaveStatus, setProfileSaveStatus] = useState<string>(""); // Status message for profile save

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const decoded = jwtDecode(token) as { id: string };

      try {
        const response = await axios.get(
          `http://localhost:5001/api/users/${decoded.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData({
          fullName: response.data.fullName,
          email: response.data.email,
          profilePicture: response.data.profilePicture,
          bio: response.data.bio,
        });
        setBio(response.data.bio); // Set bio from user data
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedImage(file);
  };

  // Handle profile update (bio, image, etc.)
  const handleSaveProfile = async () => {
    setIsSavingProfile(true); // Set loading state

    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token) as { id: string };
    let imageUrl = userData?.profilePicture;

    try {
      // If an image is selected, upload it first
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

        imageUrl = uploadResponse.data.imageUrl;
      }

      // Update the user's profile in the backend (bio, profile picture)
      await axios.put(
        `http://localhost:5001/api/users/${decoded.id}`,
        {
          fullName: userData?.fullName,
          email: userData?.email,
          bio,
          profilePicture: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setProfileSaveStatus("Profile updated successfully!");
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      setProfileSaveStatus("Failed to update profile.");
      toast.error("Failed to update profile.");
    } finally {
      setIsSavingProfile(false); // Reset loading state
    }
  };

  return (
    <section id="profile" className="space-y-4">
      <h2 className="text-h2 font-semibold text-textPrimary font-primary">
        Profile
      </h2>
      <div className="flex items-center space-x-4">
        <img
          src={userData?.profilePicture}
          alt="Profile"
          className="w-28 h-28 rounded-full border-2 border-textPrimary object-cover"
        />
        <div>
          <input
            type="file"
            onChange={handleImageChange}
            className="hidden"
            id="upload"
          />
          <label
            htmlFor="upload"
            className="flex items-center gap-2 px-4 py-2 bg-primary rounded-full hover:bg-primaryDark transition font-primary cursor-pointer"
          >
            <FaUpload />
            Upload Image
          </label>
        </div>
      </div>

      <div className="space-y-4">
        {userData && (
          <>
            {/* Full Name */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={userData.fullName}
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary font-primary text-textPrimary"
              />
              <button className="text-primary hover:text-primaryDark transition">
                <FaEdit className="text-2xl" />
              </button>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={userData.email}
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary font-primary text-textPrimary"
              />
              <button className="text-primary hover:text-primaryDark transition">
                <FaEdit className="text-2xl" />
              </button>
            </div>

            {/* Bio Section */}
            <div className="flex flex-col space-y-2">
              <label className="font-primary text-textPrimary">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary font-primary text-textPrimary"
                rows={3}
                maxLength={150} // Limit bio length
                placeholder="Write a short bio..."
              />
            </div>

            {/* Save Profile Button */}
            <button
              onClick={handleSaveProfile}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-full hover:bg-primaryDark transition"
              disabled={isSavingProfile}
            >
              {isSavingProfile ? "Saving..." : "Save Profile"}
            </button>
            {profileSaveStatus && (
              <p className="text-success">{profileSaveStatus}</p>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProfileSection;
