"use client";
import React, { useState } from "react";
import axios from "axios";

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedImage(file);

    // Generate a unique filename based on current timestamp and file name
    if (file) {
      const uniqueFileName = `${Date.now()}-${file.name}`;
      const generatedUrl = `https://storage.googleapis.com/your-bucket-name/${uniqueFileName}`;
      console.log("Generated URL:", generatedUrl);
      setImageUrl(generatedUrl); // Save the URL to state
    }
  };

  // Handle image upload
  const handleImageUpload = async () => {
    if (!selectedImage || !imageUrl) {
      setUploadStatus("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("filename", imageUrl.split("/").pop() || ""); // Use the unique filename for upload

    try {
      const response = await axios.post(
        "https://syncmove-backend.onrender.com/api/images/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadStatus(`Image uploaded successfully: ${imageUrl}`);
    } catch (error) {
      setUploadStatus("Error uploading image.");
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
      {uploadStatus && <p className="text-textPrimary">{uploadStatus}</p>}
      {imageUrl && <p className="text-textPrimary">Preview URL: {imageUrl}</p>}
    </div>
  );
};

export default UploadImage;
