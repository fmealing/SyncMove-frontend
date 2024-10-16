import React, { useEffect, useState } from "react";

const Step1: React.FC<{
  onSubmit: (
    activityType: string,
    experienceLevel: number,
    location: { lat: number; lon: number }
  ) => void;
}> = ({ onSubmit }) => {
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
        // Provide a fallback or handle error as needed
        setLocation({ lat: 0, lon: 0 });
      }
    );
  }, []);

  const handleCardClick = (index: number) => {
    setSelectedCard(index === selectedCard ? null : index);
    console.log("Location:", location);
  };

  const handleExperienceClick = (index: number, level: number) => {
    const updatedLevels = [...experienceLevels];
    updatedLevels[index] = level;
    setExperienceLevels(updatedLevels);

    // Call onSubmit directly when user makes a selection
    if (selectedCard !== null && location) {
      onSubmit(
        preferences[selectedCard].title,
        experienceLevels[selectedCard],
        location
      );
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
    </div>
  );
};

export default Step1;
