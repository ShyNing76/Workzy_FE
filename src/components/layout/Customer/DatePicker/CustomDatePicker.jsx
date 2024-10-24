import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns"; // Để định dạng ngày
import { FaRegCalendar } from "react-icons/fa";
import "./CustomDatePicker.scss";

const CustomDatePicker = (props) => {
  const { selectedDate, setSelectedDate, today } = props;

  const handleDateChange = (date) => {
    // Đặt giờ, phút, giây và mili giây về 0 để tránh vấn đề về timezone
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    setSelectedDate(newDate);
  };

  return (
    <div className="date-picker-container relative w-full max-w-xl">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        minDate={today}
        dateFormat="dd-MM-yyyy"
        className="input input-bordered h-12 pl-4 pr-12 input-date-picker" // Điều chỉnh padding
        placeholderText="Select Date"
      />
      <FaRegCalendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
  );
};

export default CustomDatePicker;
