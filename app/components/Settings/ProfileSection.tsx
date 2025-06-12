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
  dob: string;
}

const ProfileSection: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSavingProfile, setIsSavingProfile] = useState<boolean>(false);
  const [bio, setBio] = useState<string>("");
  const [dob, setDob] = useState<string>("");

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const decoded = jwtDecode(token) as { id: string };

      try {
        const response = await axios.get(
          `https://syncmove-backend.onrender.com/api/users/${decoded.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(response.data);
        setBio(response.data.bio);
        setDob(response.data.dob);
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
    toast.success("Image selected successfully!");
  };

  // Handle profile update (bio, dob, image, etc.)
  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
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
          "https://syncmove-backend.onrender.com/api/images/upload",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        imageUrl = uploadResponse.data.imageUrl;
        toast.success("Image uploaded successfully!"); // Toast for image upload success
      }

      // Update the user's profile in the backend
      await axios.put(
        `https://syncmove-backend.onrender.com/api/users/${decoded.id}`,
        {
          fullName: userData?.fullName,
          email: userData?.email,
          bio,
          dob,
          profilePicture: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Profile updated  successfully!");
      window.location.reload(); // Reload the page to refresh data
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      setIsSavingProfile(false);
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

            {/* Date of Birth */}
            <div className="flex flex-col space-y-2">
              <label className="font-primary text-textPrimary">
                Date of Birth
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary font-primary text-textPrimary"
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
          </>
        )}
      </div>
    </section>
  );
};

export default ProfileSection;
