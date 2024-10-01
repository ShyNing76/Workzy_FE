import React, { useState } from "react";
import { addMonths, format } from "date-fns"; // Thư viện hỗ trợ xử lý ngày

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState("");
  const [numOfMonths, setNumOfMonths] = useState("");
  const [endDate, setEndDate] = useState("");

  // Hàm xử lý khi thay đổi số tháng
  const handleNumOfMonthsChange = (e) => {
    const value = e.target.value;
    setNumOfMonths(value);

    if (startDate && value) {
      // Chuyển đổi startDate thành Date object
      const parsedStartDate = new Date(startDate);
      const newEndDate = addMonths(parsedStartDate, parseInt(value)); // Cộng thêm số tháng

      // Lưu trữ ngày kết thúc dưới dạng yyyy-MM-dd (ngày đầy đủ)
      setEndDate(format(newEndDate, "yyyy-MM-dd"));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      {/* Form chọn ngày và số tháng */}
      <div className="flex space-x-4">
        {/* Start Date */}
        <div className="relative w-1/2">
          <input
            type="date"
            className="input input-bordered w-full"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              // Reset endDate nếu người dùng chọn lại startDate
              if (numOfMonths) {
                const parsedStartDate = new Date(e.target.value);
                const newEndDate = addMonths(
                  parsedStartDate,
                  parseInt(numOfMonths)
                );
                setEndDate(format(newEndDate, "yyyy-MM-dd"));
              }
            }}
          />
        </div>

        {/* Number of Months */}
        <div className="relative w-1/2">
          <input
            type="number"
            placeholder="Number Month"
            className="input input-bordered w-full pl-4"
            min={1} // Số tháng tối thiểu là 1
            value={numOfMonths}
            onChange={handleNumOfMonthsChange}
          />
        </div>
      </div>

      {/* Hiển thị thời gian bắt đầu và số tháng */}
      {startDate && numOfMonths && endDate && (
        <p className="mt-4">
          From <span className="font-bold">{startDate}</span> to{" "}
          <span className="font-bold">{endDate}</span>
        </p>
      )}
    </div>
  );
};

export default DateRangePicker;
