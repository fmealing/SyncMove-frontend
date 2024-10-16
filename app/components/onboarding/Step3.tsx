import React from "react";
import DatePicker from "./DatePicker";
import TimeSelector from "./TimeSelector";

const Step3: React.FC<{
  setDate: (date: string) => void;
  setTime: (time: string) => void;
}> = ({ setDate, setTime }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Set Your Availability
      </h2>

      <div className="flex flex-col md:flex-row md:items-start md:space-x-8 space-y-6 md:space-y-0 w-full max-w-xl">
        <div className="flex-1">
          <DatePicker setDate={setDate} />
        </div>

        <div className="flex-1">
          <TimeSelector setTime={setTime} />
        </div>
      </div>
    </div>
  );
};

export default Step3;
