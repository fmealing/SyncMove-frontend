import React from "react";
import { FaClock } from "react-icons/fa";

interface AvailabilityProps {
  availability: { timeOfDay: string[] };
}

const Availability: React.FC<AvailabilityProps> = ({ availability }) => (
  <div className="px-8 py-14">
    <h3 className="text-h2 font-bold font-primary text-textPrimary text-center mb-6">
      Availability
    </h3>
    <div className="flex items-center justify-center">
      {availability.timeOfDay.map((time, index) => (
        <div
          key={index}
          className="flex flex-col w-1/2 items-center p-8 rounded-lg shadow-lg transform hover:scale-105"
        >
          <FaClock className="text-3xl mb-4" />
          <p className="text-xl font-semibold capitalize tracking-wide">
            {time}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default Availability;
