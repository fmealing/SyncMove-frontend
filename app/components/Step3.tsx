import React, { useState } from "react";
import DatePicker from "./DatePicker";

const Step3: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    console.log("Selected Date:", date); // You can use this value to store in your database later
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Set Your Availability
      </h2>
      <DatePicker setDate={handleDateChange} />
      {selectedDate && (
        <p className="text-gray-700 mt-4">You selected: {selectedDate}</p>
      )}
    </div>
  );
};

export default Step3;
