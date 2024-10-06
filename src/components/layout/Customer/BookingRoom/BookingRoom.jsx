import React, { useEffect, useState } from "react";
import CustomDatePicker from "../DatePicker/CustomDatePicker";
import BookingSummary from "../Booking Summary/BookingSummary";

import MonthRangePicker from "../MonthRangePicker/MonthRangePicker";
import DateRangePicker from "../DateRangePicker/DateRangePicker";
import TimeRangePicker from "../TimePicker/TimeRangePicker";

const BookingRoom = () => {
  // Tab hiện tại
  const [currentTab, setCurrentTab] = useState("hour");
  // Lấy ngày hôm nay
  const today = new Date();
  // SelectedDate (Time)
  const [selectedDate, setSelectedDate] = useState(today);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // StartDate EndDate for (day & month)
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // number of hour, day, month
  const [numOfHours, setNumOfHours] = useState("");
  const [numOfDays, setNumOfDays] = useState("");
  const [numOfMonths, setNumOfMonths] = useState("");

  // startDateTime and endDateTime
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);

  // Price and discount
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  // Amount Text and Price in booking
  const [amountText, setAmountText] = useState("");
  const [amountPrice, setAmountPrice] = useState(0);

  // Set default whenever currentTab Change
  useEffect(() => {
    if (currentTab === "hour") {
      setSelectedDate(today);
      setStartTime("");
      setEndTime("");
      setNumOfHours("");
      setAmountText("");
      setAmountPrice(0);
    } else if (currentTab === "day") {
      setStartDate(null);
      setEndDate(null);
      setNumOfDays("");
      setAmountText("");
      setAmountPrice(0);
    } else if (currentTab === "month") {
      setStartDate(null);
      setEndDate(null);
      setNumOfMonths("");
      setAmountText("");
      setAmountPrice(0);
    }
  }, [currentTab]);

  // Kết hợp Date với Time
  const combineDateAndTime = (date, time) => {
    const [hours, minutes] = time.split(":").map(Number); // Tách giờ và phút
    const newDate = new Date(date); // Tạo bản sao của date
    newDate.setHours(hours, minutes, 0, 0); // Thiết lập giờ và phút
    return newDate;
  };

  // Calculate duration of hour and day
  const calculateHours = (startTime, endTime) => {
    if (startTime && endTime) {
      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [endHour, endMinute] = endTime.split(":").map(Number);

      const diffHour = endHour - startHour;

      if (diffHour >= 0) {
        setNumOfHours(diffHour); // Làm tròn số giờ thành 2 chữ số thập phân
      } else {
        setNumOfHours(0); // Nếu thời gian kết thúc nhỏ hơn thời gian bắt đầu
      }
    }
  };

  const calculateDays = (startDate, endDate) => {
    if (startDate) {
      const start = new Date(startDate);
      let end = new Date(startDate); // Mặc định end = start nếu không có endDate

      if (endDate) {
        end = new Date(endDate);
      }

      const diffTime = end - start;
      const days = diffTime / (1000 * 60 * 60 * 24); // Chia cho số ms trong 1 ngày

      setNumOfDays(days + 1); // Cộng thêm 1 để bao gồm cả ngày bắt đầu
    }
  };

  useEffect(() => {
    switch (currentTab) {
      case "hour":
        // Với tab Hour, cần kết hợp selectedDate với startTime và endTime
        if (selectedDate && startTime && endTime) {
          setStartDateTime(combineDateAndTime(selectedDate, startTime));
          setEndDateTime(combineDateAndTime(selectedDate, endTime));
          calculateHours(startTime, endTime);
        }
        break;

      case "day":
        if (startDate && endDate) {
          let updatedstartDate = new Date(startDate); // Tạo một đối tượng Date từ endDate
          updatedstartDate.setHours(0, 0, 0, 0);
          let updatedEndDate = new Date(endDate); // Tạo một đối tượng Date từ endDate
          updatedEndDate.setHours(23, 59, 59, 999);

          setStartDateTime(updatedstartDate);
          setEndDateTime(updatedEndDate); // Set thời gian kết thúc là 23:59:59
          calculateDays(startDate, endDate);
        }
        break;

      case "month":
        if (startDate) {
          let updatedstartDate = new Date(startDate); // Tạo một đối tượng Date từ endDate
          updatedstartDate.setHours(0, 0, 0, 0);
          let updatedEndDate = new Date(endDate); // Tạo một đối tượng Date từ endDate
          updatedEndDate.setHours(23, 59, 59, 999);

          setStartDateTime(updatedstartDate);
          setEndDateTime(updatedEndDate); // Set thời gian kết thúc là 23:59:59
        }
        break;

      default:
        break;
    }
  }, [currentTab, selectedDate, startTime, endTime, startDate, endDate]);

  const handleSubmit = () => {
    if (startDateTime && endDateTime) {
      // Gửi dữ liệu đến database (giả sử hàm sendToDatabase là hàm gửi dữ liệu)
      console.log("Start DateTime:", startDateTime);
      console.log("End DateTime:", endDateTime);

      // Gửi dữ liệu
      // sendToDatabase({ startDateTime, endDateTime });
    } else {
      console.error("Dữ liệu không hợp lệ");
    }
  };

  return (
    <>
      <div className="room-name-container flex items-center justify-center">
        <h1 className="room-name text-3xl font-black tracking-tight sm:text-5xl text-left">
          Room name
        </h1>
        <div className="status-badge badge badge-success text-white text-xm p-3 font-bold ml-6">
          Available
        </div>
      </div>
      <div className="type-capacity-container">
        <div className="flex justify-between font-semibold">
          <div>Type: </div>
          <div>Working Room</div>
        </div>
        <div className=" flex justify-between font-semibold">
          <div>Capacity: </div>
          <div>18 seats</div>
        </div>
      </div>

      <div className="font-semibold mb-2">Type Booking: </div>
      {/* Tab for Hour */}
      <div role="tablist" className="tabs tabs-lifted">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Hour"
          defaultChecked={currentTab === "hour"}
          onClick={() => setCurrentTab("hour")}
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          {/* Price section */}
          <div className="flex justify-between font-semibold items-center">
            <div>Price:</div>
            <div className="text-amber-500 text-xl font-bold">
              300.000 VND/h
            </div>
          </div>

          {/* Remaining Time section */}
          <div className="font-semibold my-4">Remaining Time:</div>

          <div className="container mx-auto">
            {/* Custom Date Picker */}
            <div className="mb-4">
              <CustomDatePicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                today={today}
              />
            </div>

            {/* Time Picker */}
            <div className="mb-4">
              <TimeRangePicker
                selectedDate={selectedDate}
                today={today}
                startTime={startTime}
                setStartTime={setStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
              />
            </div>

            {/* Discount Code Input */}
            <input
              type="text"
              placeholder="Discount code"
              className="input input-bordered w-full max-w-xs mb-3"
            />

            {/* Booking Summary */}
            <BookingSummary
              handleSubmit={handleSubmit}
              price={300000}
              numOfHours={numOfHours}
              amountText={amountText}
              setAmountText={setAmountText}
              amountPrice={amountPrice}
              setAmountPrice={setAmountPrice}
            />
          </div>
        </div>

        {/* Tab for day */}

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Day"
          onClick={() => setCurrentTab("day")}
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <div className=" flex justify-between font-semibold items-center">
            <div>Price: </div>
            <div className="text-amber-500 text-xl font-bold">
              1.300.000 VND/day
            </div>
          </div>
          <div className="font-semibold mt-4 mb-2">Remaining Time: </div>
          <div className="my-4">
            <DateRangePicker
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
          </div>

          <input
            type="text"
            placeholder="Discount code"
            className="input input-bordered w-full max-w-xs mb-3"
          />
          <BookingSummary
            handleSubmit={handleSubmit}
            price={1300000}
            numOfDays={numOfDays}
            amountText={amountText}
            setAmountText={setAmountText}
            amountPrice={amountPrice}
            setAmountPrice={setAmountPrice}
          />
        </div>

        {/* Tab for Month */}

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Month"
          onClick={() => setCurrentTab("month")}
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <div className=" flex justify-between font-semibold items-center">
            <div>Price: </div>
            <div className="text-amber-500 text-xl font-bold">
              10.300.000 VND/month
            </div>
          </div>
          <div className="font-semibold mt-4 mb-2">Remaining Time: </div>
          <div className="pb-4">
            <MonthRangePicker
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              numOfMonths={numOfMonths}
              setNumOfMonths={setNumOfMonths}
              today={today}
            />
          </div>

          <input
            type="text"
            placeholder="Discount code"
            className="input input-bordered w-full max-w-xs mb-3"
          />
          <BookingSummary
            handleSubmit={handleSubmit}
            price={10300000}
            numOfMonths={numOfMonths}
            amountText={amountText}
            setAmountText={setAmountText}
            amountPrice={amountPrice}
            setAmountPrice={setAmountPrice}
          />
        </div>
      </div>
    </>
  );
};

export default BookingRoom;
