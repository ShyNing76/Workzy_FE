import React, { useState } from "react";

const TimePicker = () => {
  // Tạo các mốc thời gian từ 00:00 đến 23:00
  const times = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  return (
    <div className="form-control w-full max-w-xs my-3">
      <div className="flex space-x-4">
        {/* Start Time */}
        <div className="relative w-1/2">
          <select
            className="select select-bordered w-full h-12"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          >
            <option disabled value="">
              Start time
            </option>
            {times.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        {/* End Time */}
        <div className="relative w-1/2">
          <select
            className="select select-bordered w-full h-12"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          >
            <option disabled value="">
              End time
            </option>
            {times.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
