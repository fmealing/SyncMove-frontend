import React, { useEffect, useRef } from "react";
import Flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "../../styles/flatpickr-custom.scss";

interface DatePickerProps {
  setDate: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ setDate }) => {
  const datepickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30); // Adds 30 days to today's date

    if (datepickerRef.current) {
      Flatpickr(datepickerRef.current, {
        dateFormat: "Y-m-d",
        minDate: "today",
        maxDate,
        onChange: (selectedDates) => {
          const date = selectedDates[0];
          if (date) {
            const formattedDate = date.toISOString().split("T")[0]; // Format to YYYY-MM-DD
            setDate(formattedDate); // Pass the formatted date up to the parent
          }
        },
      });
    }
  }, [setDate]);

  return (
    <div className="form-control w-full max-w-xs mx-auto">
      <label htmlFor="datepicker" className="label">
        <span className="label-text text-textPrimary font-semibold font-primary text-[20px]">
          Select Date
        </span>
      </label>
      <input
        id="datepicker"
        ref={datepickerRef}
        type="text"
        aria-label="Select a date"
        className="input input-bordered w-full bg-white border border-primary rounded-lg placeholder-gray-500 text-gray-900"
        placeholder="Pick a date"
        style={{ padding: "12px" }}
      />
    </div>
  );
};

export default DatePicker;
