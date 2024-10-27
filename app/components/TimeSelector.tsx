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
    <div className="flex flex-col items-start gap-2">
      <label className="text-lg font-semibold">Select a Time</label>
      <div className="flex gap-4">
        <button
          onClick={() => handleTimeSelect("morning")}
          className={`btn ${
            selectedTime === "morning" ? "btn-primary" : "btn-outline"
          }`}
        >
          Morning
        </button>
        <button
          onClick={() => handleTimeSelect("afternoon")}
          className={`btn ${
            selectedTime === "afternoon" ? "btn-primary" : "btn-outline"
          }`}
        >
          Afternoon
        </button>
        <button
          onClick={() => handleTimeSelect("evening")}
          className={`btn ${
            selectedTime === "evening" ? "btn-primary" : "btn-outline"
          }`}
        >
          Evening
        </button>
      </div>
    </div>
  );
};

export default TimeSelector;
