import React from "react";
import {
  FaCalendar,
  FaCheckCircle,
  FaDumbbell,
  FaHeart,
  FaStar,
} from "react-icons/fa"; // Example icon
import { FaMessage } from "react-icons/fa6";

const features = [
  {
    title: "Find Gym Partners",
    description:
      "Connect with like-minded individuals looking to share their fitness journey. Whether you're into weightlifting, cardio, or yoga, find a partner who matches your passion.",
    icon: <FaDumbbell className="w-6 h-6 text-primary" />,
  },
  {
    title: "Activity Matching",
    description:
      "Discover partners based on your preferred activities and fitness goals. From running to rock climbing, we match you with others who share your interests.",
    icon: <FaHeart className="w-6 h-6 text-primary" />,
  },
  {
    title: "Flexible Scheduling",
    description:
      "Schedule workouts on your terms. SyncMove lets you choose when and where to meet up, making it easy to fit exercise into your busy lifestyle.",
    icon: <FaCalendar className="w-6 h-6 text-primary" />,
  },
  {
    title: "Instant Messaging",
    description:
      "Stay connected with your workout partners. Our built-in messaging makes it easy to plan sessions, share progress, and stay motivated together.",
    icon: <FaMessage className="w-6 h-6 text-primary" />,
  },
  {
    title: "Goal Tracking",
    description:
      "Set and track your fitness goals alongside your workout partners. From strength training to endurance, stay on top of your progress.",
    icon: <FaCheckCircle className="w-6 h-6 text-primary" />,
  },
  {
    title: "Recommendations",
    description:
      "Get tailored suggestions for new partners and activities based on your fitness preferences and goals. SyncMove helps you expand your network and try new things.",
    icon: <FaStar className="w-6 h-6 text-primary" />,
  },
];

const Features: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-16">
      {/* Title */}
      <div className="text-center text-textPrimary text-h2 font-bold font-primary leading-[45px] mb-8">
        Features
      </div>

      {/* Grid Layout for Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="w-[360px] h-[208px] p-6 rounded-[10px] border border-textPrimary flex flex-col justify-start items-start gap-[9px] transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="flex items-center gap-[7px]">
              {feature.icon}
              <div className="text-textPrimary text-[24px] font-bold font-primary">
                {feature.title}
              </div>
            </div>
            <div className="text-textPrimary text-base font-medium font-primary">
              {feature.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
