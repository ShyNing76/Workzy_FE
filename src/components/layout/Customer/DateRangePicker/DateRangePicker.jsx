import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, addMonths, format } from "date-fns";
import { FaRegCalendar } from "react-icons/fa";
import "./DateRangePicker.scss";

const DateRangePicker = (props) => {
  const { startDate, endDate, today, setStartDate, setEndDate } = props;

  const maxStartDate = addMonths(new Date(), 12);

  // Validate Start Date and End Date
  const handleOnchangeDate = (dates) => {
    const [start, end] = dates;
    // Validate that startDate is before or equal to endDate
    if (start instanceof Date && end instanceof Date) {
      if (start.getTime() > end.getTime()) {
        setStartDate(null);
        setEndDate(null);
      } else {
        setStartDate(start);
        setEndDate(end);
      }
    } else {
      // Đặt giá trị khi chỉ chọn startDate
      setStartDate(start);
      setEndDate(end);
    }
  };

  return (
    <div className="date-range-picker-container w-full flex flex-col items-start space-y-4 max-w-xl">
      <div className="relative w-full">
        {/* Date Range Picker */}
        <DatePicker
          selected={startDate}
          onChange={(dates) => {
            handleOnchangeDate(dates);
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          minDate={addDays(today, 1)}
          maxDate={maxStartDate}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select date range"
          className="input input-bordered h-12 pl-4 pr-12 input-date-range" // Input style from daisyUI
        />
        <FaRegCalendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      {/* Display selected date range */}
      {startDate && endDate && (
        <div className="text-sm text-gray-700">
          From{" "}
          <span className="font-bold">{format(startDate, "dd-MM-yyyy")}</span>{" "}
          to <span className="font-bold">{format(endDate, "dd-MM-yyyy")}</span>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
