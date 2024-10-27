import React from "react";

interface TimeSelectorProps {
  selectedTime: string;
  handleTimeSelect: (time: string) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  selectedTime,
  handleTimeSelect,
}) => {
  return (
    <div className="flex flex-col items-start gap-2 bg-white p-4 rounded-lg shadow-md border border-textPrimary">
      <label className="text-xl font-bold text-textPrimary font-primary">
        Select a Time
      </label>
      <div className="flex gap-4">
        {["morning", "afternoon", "evening"].map((time) => (
          <button
            key={time}
            onClick={() => handleTimeSelect(time)}
            className={`px-4 py-2 rounded-lg font-primary transition duration-200 ${
              selectedTime === time
                ? "bg-secondary text-white shadow-lg transform scale-105"
                : "bg-white text-textPrimary border border-primary hover:bg-primary hover:text-white"
            }`}
          >
            {time.charAt(0).toUpperCase() + time.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelector;
