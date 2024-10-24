import React, { useState } from "react";
import { FaClock } from "react-icons/fa";

const TimeSelector: React.FC<{ setTime: (time: string) => void }> = ({
  setTime,
}) => {
  const times = [
    { label: "Morning (8-10AM)", value: "morning" },
    { label: "Afternoon (12-2PM)", value: "afternoon" },
    { label: "Evening (6-8PM)", value: "evening" },
  ];

  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    setTime(time); // Pass the selected time to the parent component
  };

  return (
    <div className="flex flex-col items-center w-full space-y-4 max-w-72">
      {times.map((time) => (
        <button
          key={time.value}
          onClick={() => handleTimeClick(time.value)}
          className={`h-12 w-full px-4 flex items-center rounded-full border-2 gap-2 ${
            selectedTime === time.value
              ? "bg-primary text-white"
              : "border-secondary text-secondary"
          }`}
        >
          <FaClock className="w-5 h-5" />
          <span className="text-xl font-semibold font-primary">
            {time.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default TimeSelector;
