import React, { useState } from "react";

const Step1: React.FC = () => {
  const preferences = [
    {
      title: "Gym",
      description:
        "Strength training, cardio, and more. Find partners who share your passion for hitting the gym.",
      imageSrc: "/onboarding-gym.jpg",
    },
    {
      title: "Cycling",
      description:
        "Join fellow cyclists for rides through scenic routes or intense road cycling sessions.",
      imageSrc: "/onboarding-cycling.jpg",
    },
    {
      title: "Running",
      description:
        "From marathons to morning jogs, connect with running enthusiasts at all levels.",
      imageSrc: "/onboarding-running.jpg",
    },
    {
      title: "Other",
      description:
        "Yoga, swimming, hiking, and beyond. Discover partners for any activity that suits your lifestyle.",
      imageSrc: "/onboarding-other-1.jpg",
    },
  ];

  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [experienceLevels, setExperienceLevels] = useState(
    Array(preferences.length).fill(0)
  );

  const handleCardClick = (index: number) => {
    setSelectedCard(index === selectedCard ? null : index);
  };

  const handleExperienceClick = (index: number, level: number) => {
    const updatedLevels = [...experienceLevels];
    updatedLevels[index] = level;
    setExperienceLevels(updatedLevels);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-textPrimary mb-6 font-primary">
        Choose Your Preferences
      </h2>

      {/* Cards Grid */}
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

              {/* Experience Level Selector */}
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
