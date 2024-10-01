import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns"; // Để định dạng ngày
import { FaCalendarAlt } from "react-icons/fa";

const CustomDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Lấy ngày hôm nay
  const today = new Date();

  return (
    <div className="relative w-full max-w-xs">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        minDate={today}
        dateFormat="dd-MM-yyyy"
        className="input input-bordered w-80 h-12 pl-4 pr-12 " // Điều chỉnh padding
        placeholderText="Select Date"
      />
      <FaCalendarAlt className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
  );
};

export default CustomDatePicker;
