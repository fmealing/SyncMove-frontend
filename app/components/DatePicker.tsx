import React, { useState, useEffect } from "react";

interface DatePickerProps {
  selectedDate: string | null;
  handleDateChange: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  handleDateChange,
}) => {
  const [internalDate, setInternalDate] = useState<string | null>(selectedDate);

  // Convert a Date object to DD/MM/YYYY
  const formatDateToDDMMYYYY = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Convert DD/MM/YYYY to YYYY-MM-DD for input display
  const convertToYYYYMMDD = (dateString: string) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  // Handle date change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    const dateObject = new Date(dateValue);
    const formattedDate = formatDateToDDMMYYYY(dateObject);
    setInternalDate(formattedDate);
    handleDateChange(formattedDate);
  };

  useEffect(() => {
    if (selectedDate) {
      setInternalDate(selectedDate);
    }
  }, [selectedDate]);

  return (
    <div className="flex flex-col items-start gap-2">
      <label className="text-lg font-semibold">Select a Date</label>
      <input
        type="date"
        value={internalDate ? convertToYYYYMMDD(internalDate) : ""}
        onChange={handleInputChange}
        className="input input-bordered w-full max-w-xs"
      />
      {internalDate && (
        <p className="text-gray-700 mt-2">Selected Date: {internalDate}</p>
      )}
    </div>
  );
};

export default DatePicker;
