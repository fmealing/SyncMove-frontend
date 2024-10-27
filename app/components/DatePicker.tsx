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

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Get the date 30 days from today in YYYY-MM-DD format
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split("T")[0];
  };

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
    <div className="flex flex-col items-start gap-2 bg-white border border-text p-4 rounded-lg shadow-md">
      <label className="text-xl font-bold text-textPrimary font-primary">
        Select a Date
      </label>
      <input
        type="date"
        value={internalDate ? convertToYYYYMMDD(internalDate) : ""}
        onChange={handleInputChange}
        className="input w-full max-w-xs px-4 py-2 font-primary bg-lightGray text-textPrimary font-medium rounded-lg border-textSecondary focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
        min={getTodayDate()} // Restrict to no earlier than today
        max={getMaxDate()} // Restrict to no more than 30 days from today
      />
    </div>
  );
};

export default DatePicker;
