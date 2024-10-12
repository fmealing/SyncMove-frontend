import React, { useState } from "react";
import DatePicker from "./DatePicker";
import TimeSelector from "./TimeSelector";

const Step3: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    console.log("Selected Date:", date); // Store this value in the database later
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Set Your Availability
      </h2>

      {/* Flex container for date picker and time selector */}
      <div className="flex flex-col md:flex-row md:items-start md:space-x-8 space-y-6 md:space-y-0 w-full max-w-xl">
        <div className="flex-1">
          <DatePicker setDate={handleDateChange} />
          {selectedDate && (
            <p className="text-gray-700 mt-2 md:mt-4">
              You selected: {selectedDate}
            </p>
          )}
        </div>

        <div className="flex-1">
          <TimeSelector />
        </div>
      </div>
    </div>
  );
};

export default Step3;
