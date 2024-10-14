import React, { useState } from "react";

const Step2: React.FC = () => {
  const goals = [
    {
      title: "Weight Loss",
      description:
        "Focus on burning calories and shedding pounds with partners who share your weight loss journey.",
      imageSrc: "/onboarding-weight_loss.jpg",
    },
    {
      title: "Muscle Gain",
      description:
        "Build strength and muscle mass. Connect with others who are lifting towards similar goals.",
      imageSrc: "/onboarding-muscle_gain.jpg",
    },
    {
      title: "Endurance",
      description:
        "Increase your stamina and push your limits. Find partners to join you in endurance training.",
      imageSrc: "/onboarding-endurance.jpg",
    },
    {
      title: "Other",
      description:
        "From flexibility to general fitness, choose other goals that align with your personal wellness journey.",
      imageSrc: "/onboarding-other-2.jpg",
    },
  ];

  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setSelectedGoal(index === selectedGoal ? null : index);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Set Your Fitness Goals
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1100px]">
        {goals.map((goal, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            className={`flex h-52 p-6 rounded-[10px] border-2 justify-start items-center gap-6 shadow-md cursor-pointer transition ${
              selectedGoal === index
                ? "border-primary bg-primary/10"
                : "border-textPrimary bg-lightGray"
            }`}
          >
            <img
              src={goal.imageSrc}
              alt={goal.title}
              className="w-40 h-40 rounded-full border-2 border-textPrimary object-cover object-center"
            />

            <div className="flex flex-col w-[300px] justify-start items-start gap-2">
              <div className="text-textPrimary text-h3 font-bold leading-[35px] font-primary">
                {goal.title}
              </div>
              <p className="text-textPrimary text-lg font-normal leading-snug font-primary">
                {goal.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step2;
