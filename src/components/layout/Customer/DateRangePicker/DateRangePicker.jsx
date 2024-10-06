import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, addMonths, format } from "date-fns";
import { FaRegCalendar } from "react-icons/fa";

const DateRangePicker = (props) => {
  const { startDate, setStartDate, endDate, setEndDate } = props;

  const maxStartDate = addMonths(new Date(), 12);

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
          maxDate={maxStartDate}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select Date Range"
          className="input input-bordered w-80 h-12 pl-4 pr-12" // Input style from daisyUI
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
