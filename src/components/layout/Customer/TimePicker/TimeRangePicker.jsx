import React, { useEffect, useState } from "react";
import "./TimeRangePicker.scss";

const TimeRangePicker = (props) => {
  const {
    selectedDate,
    today,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    setNumOfHours,
  } = props;
  const [currentTimeInMinutes, setCurrentTimeInMinutes] = useState(0);

  // Tạo các mốc thời gian từ 00:00 đến 23:00
  const times = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  // function convert time to minutes
  const convertTimeToMinutes = (time) => {
    const [hour, minutes] = time.split(":").map(Number);
    return hour * 60 + minutes;
  };

  // Validate Time
  const startTimeInMinutes = convertTimeToMinutes(startTime);
  const endTimeInMinutes = convertTimeToMinutes(endTime);
  if (startTimeInMinutes >= endTimeInMinutes) {
    setStartTime("");
    setEndTime("");
  }

  // Lấy giờ hiện tại theo phút
  useEffect(() => {
    if (selectedDate) {
      // So sánh nếu `selectedDate` là hôm nay
      if (
        selectedDate.getDate() === today.getDate() &&
        selectedDate.getMonth() === today.getMonth() &&
        selectedDate.getFullYear() === today.getFullYear()
      ) {
        const currentTime =
          selectedDate.getHours() * 60 + selectedDate.getMinutes();
        setCurrentTimeInMinutes(currentTime);
      } else {
        setCurrentTimeInMinutes(0); // 00:00 tương đương với 0 phút
      }
    }
  }, [selectedDate, today]);

  return (
    <div className="form-control w-full max-w-xl my-3">
      <div className="flex space-x-4">
        {/* Start Time */}
        <div className="relative w-1/2">
          <select
            className="select select-bordered w-full h-12 overflow-y-auto"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          >
            <option disabled value="">
              Start time
            </option>
            {times.map((time) => {
              const timeInMinutes = convertTimeToMinutes(time);
              return (
                <option
                  className="option-time-picker"
                  key={time}
                  value={time}
                  disabled={timeInMinutes < currentTimeInMinutes} // Disable nếu giờ đã qua
                >
                  {time}
                </option>
              );
            })}
          </select>
        </div>

        {/* End Time */}
        <div className="relative w-1/2">
          <select
            className="select select-bordered w-full h-12 "
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          >
            <option disabled value="">
              End time
            </option>
            {times.map((time) => {
              const timeInMinutes = convertTimeToMinutes(time);
              return (
                <option
                  className="option-time-picker"
                  key={time}
                  value={time}
                  disabled={timeInMinutes < currentTimeInMinutes} // Disable nếu giờ đã qua
                >
                  {time}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TimeRangePicker;
