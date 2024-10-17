import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";

const Step1: React.FC<{
  userId: string;
  goToNextStep: () => void;
}> = ({ userId, goToNextStep }) => {
  const preferences = [
    {
      title: "Gym",
      description: "Strength training, cardio...",
      imageSrc: "/onboarding-gym.jpg",
    },
    {
      title: "Cycling",
      description: "Join fellow cyclists...",
      imageSrc: "/onboarding-cycling.jpg",
    },
    {
      title: "Running",
      description: "From marathons to jogs...",
      imageSrc: "/onboarding-running.jpg",
    },
    {
      title: "Other",
      description: "Yoga, swimming, hiking...",
      imageSrc: "/onboarding-other-1.jpg",
    },
  ];

  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [experienceLevels, setExperienceLevels] = useState(
    Array(preferences.length).fill(0)
  );
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Failed to get user location:", error);
        setLocation({ lat: 0, lon: 0 });
      }
    );
  }, []);

  const handleCardClick = (index: number) => {
    console.log("Location: ", location);
    setSelectedCard(index);
  };

  const handleExperienceClick = (index: number, level: number) => {
    const updatedLevels = [...experienceLevels];
    updatedLevels[index] = level;
    setExperienceLevels(updatedLevels);
  };

  const handleSubmitStep1 = async () => {
    console.log("Submitting Step 1 data");
    console.log("Selected card:", selectedCard);
    console.log("Experience levels:", experienceLevels);
    console.log("Location:", location);
    if (selectedCard === null || !location) return; // Ensure data is selected
    const token = localStorage.getItem("token");
    console.log("Token: ", token);
    try {
      await axios.put(
        `http://localhost:5001/api/users/${userId}`,
        {
          activityType: preferences[selectedCard].title,
          experienceLevel: experienceLevels[selectedCard],
          location: {
            type: "Point",
            coordinates: [location.lon, location.lat],
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Step 1 data submitted successfully");
      goToNextStep(); // Move to the next step after successful submission
    } catch (error) {
      console.error("Failed to submit Step 1 data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-3xl font-bold text-textPrimary mb-6 font-primary">
        Choose Your Preferences
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1100px]">
        {preferences.map((preference, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            className={`flex h-60 p-6 rounded-[10px] border-2 justify-start items-center gap-6 shadow-md cursor-pointer transition ${
              selectedCard === index
                ? "border-primary bg-primary/10"
                : "border-textPrimary bg-lightGray"
            }`}
          >
            <img
              src={preference.imageSrc}
              alt={preference.title}
              className="w-40 h-40 rounded-full border-2 border-textPrimary object-cover object-center"
            />
            <div className="flex flex-col w-[300px] justify-start items-start gap-2">
              <div className="text-textPrimary text-[28px] font-bold leading-[35px] font-primary">
                {preference.title}
              </div>
              <p className="text-textPrimary text-lg font-normal leading-snug font-primary">
                {preference.description}
              </p>
              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => handleExperienceClick(index, level)}
                    className={`w-6 h-6 rounded-full transition ${
                      experienceLevels[index] >= level
                        ? "bg-primary"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-500 ml-2 font-primary">
                  Level {experienceLevels[index]}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmitStep1}
        className="h-12 px-4 bg-[#007bff] rounded-md flex justify-center items-center gap-2 text-[#f7f7f7] text-lg font-medium font-['Montserrat'] mt-6"
      >
        Next
        <FaArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Step1;
