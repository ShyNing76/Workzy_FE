import React, { useState } from "react";
import DatePicker from "react-datepicker"; // Import react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import CSS của react-datepicker
import { addDays, addMonths, format } from "date-fns"; // Thư viện hỗ trợ xử lý ngày
import { FaRegCalendar } from "react-icons/fa";

const MonthRangePicker = (props) => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    numOfMonths,
    setNumOfMonths,
    today,
    setAmountPrice,
  } = props;

  // Ngày giới hạn tối đa cho startDate (ví dụ: 1 năm sau từ hôm nay)
  const maxStartDate = addMonths(new Date(), 12);

  // Hàm xử lý khi thay đổi số tháng
  const handleNumOfMonthsChange = (e) => {
    const value = e.target.value;
    if (value < 0) {
      setNumOfMonths(0);
      setAmountPrice(0);
    } else {
      setNumOfMonths(value);
    }

    if (startDate && value) {
      // Cộng thêm số tháng vào startDate để tính endDate
      const newEndDate = addMonths(startDate, parseInt(value));
      setEndDate(newEndDate);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      {/* Form chọn ngày và số tháng */}
      <div className="flex space-x-4">
        {/* Start Date */}
        <div className="relative w-1/2">
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              // Tính toán lại endDate khi chọn lại startDate
              if (numOfMonths) {
                const newEndDate = addMonths(date, parseInt(numOfMonths));
                setEndDate(newEndDate);
              }
            }}
            dateFormat="dd-MM-yyyy" // Định dạng ngày
            minDate={addDays(today, 1)} // Giới hạn ngày tối thiểu
            maxDate={maxStartDate} // Giới hạn ngày tối đa
            className="input input-bordered w-full" // Thêm class để style
            placeholderText="Select date" // Placeholder
          />
          <FaRegCalendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* Number of Months */}
        <div className="relative w-1/2">
          <input
            type="number"
            placeholder="Number of Months"
            className={`input input-bordered w-full pl-4 ${
              startDate < today ? "input-disabled" : ""
            }`}
            min={1} // Số tháng tối thiểu là 1
            max={12} // Số tháng cao nhất là 12
            value={numOfMonths}
            onChange={handleNumOfMonthsChange}
            disabled={startDate < today}
          />
        </div>
      </div>

      {/* Hiển thị thời gian bắt đầu và số tháng */}
      {startDate && numOfMonths > 0 && endDate && (
        <div className="text-sm text-gray-700 mt-4">
          From{" "}
          <span className="font-bold">{format(startDate, "dd-MM-yyyy")}</span>{" "}
          to <span className="font-bold">{format(endDate, "dd-MM-yyyy")}</span>
        </div>
      )}
    </div>
  );
};

export default MonthRangePicker;
