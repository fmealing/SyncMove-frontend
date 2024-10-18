import React, { useEffect, useState } from "react";
import { FaEdit, FaUpload } from "react-icons/fa";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface UserData {
  fullName: string;
  email: string;
  profilePicture: string;
}

const ProfileSection: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

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
          profilePicture:
            response.data.profilePicture || "/avatars/avatar-1.jpg",
        });
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

  // Handle image upload and updating the profile picture
  const handleImageUpload = async () => {
    if (!selectedImage) {
      setUploadStatus("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      setIsUploading(true); // Set loading state

      const token = localStorage.getItem("token");

      // Check if the user is authenticated
      if (!token) {
        setUploadStatus("User is not authenticated.");
        setIsUploading(false);
        return;
      }

      const decoded = jwtDecode(token) as { id: string };

      // Upload the image
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

      const imageUrl = uploadResponse.data.imageUrl;

      // Update the user's profile picture in the backend
      const updateResponse = await axios.put(
        `http://localhost:5001/api/users/${decoded.id}/profile-picture`,
        { profilePicture: imageUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Update the frontend state to reflect the new image
      setUserData((prev) => prev && { ...prev, profilePicture: imageUrl });
      setUploadStatus("Image uploaded and profile updated successfully!");
    } catch (error) {
      setUploadStatus("Error uploading or updating profile image.");
      console.error("Error:", error);
    } finally {
      setIsUploading(false); // Reset loading state
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
      <button
        onClick={handleImageUpload}
        className="mt-4 px-4 py-2 bg-primary text-white rounded-full hover:bg-primaryDark transition"
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : "Save New Image"}
      </button>
      {uploadStatus && <p>{uploadStatus}</p>}

      <div className="space-y-4">
        {userData && (
          <>
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

            <div className="flex items-center space-x-2">
              <input
                type="password"
                value="********"
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary font-primary text-textPrimary"
              />
              <button className="text-primary hover:text-primaryDark transition">
                <FaEdit className="text-2xl" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProfileSection;
