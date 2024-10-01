import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { addDays } from "date-fns";

const CustomDateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div className="w-full flex flex-col items-start space-y-4 max-w-xs">
      <div className="relative w-full">
        {/* Date Range Picker */}
        <DatePicker
          selected={startDate}
          onChange={(dates) => {
            const [start, end] = dates;
            setStartDate(start);
            setEndDate(end);
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          minDate={new Date()}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select Date Range"
          className="input input-bordered w-80 h-12 pl-4 pr-12" // Input style from daisyUI
        />
        <FaCalendarAlt className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      {/* Display selected date range */}
      {startDate && endDate && (
        <div className="text-sm text-gray-700">
          Selected Range: {startDate?.toLocaleDateString()} -{" "}
          {endDate?.toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default CustomDateRangePicker;
