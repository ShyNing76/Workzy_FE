import React, { useContext, useEffect, useRef, useState } from "react";
import CustomDatePicker from "../DatePicker/CustomDatePicker";
import BookingSummary from "../Booking Summary/BookingSummary";

import MonthRangePicker from "../MonthRangePicker/MonthRangePicker";
import DateRangePicker from "../DateRangePicker/DateRangePicker";
import TimeRangePicker from "../TimePicker/TimeRangePicker";
import { formatDateTime } from "../../../context/dateFormat";
import { formatCurrency } from "../../../context/priceFormat";
import BookingSummaryModal from "../BookingSummaryModal/BookingSummaryModal";
import { postCreateBooking } from "../../../../config/api";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../../context/auth.context";
import { useNavigate } from "react-router-dom";
import "./BookingRoom.scss";

const BookingRoom = (props) => {
  // Props room data
  const {
    roomData,
    workSpaceTypeName,
    today,
    selectedDate,
    setSelectedDate,
    currentTab,
    setCurrentTab,
  } = props;

  // Auth context
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // StartDate EndDate for (day & month)
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // number of hour, day, month
  const [numOfHours, setNumOfHours] = useState(0);
  const [numOfDays, setNumOfDays] = useState(0);
  const [numOfMonths, setNumOfMonths] = useState(0);

  // startDateTime and endDateTime
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);

  // Price and discount
  const [discountCode, setDiscountCode] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  // Amount Text and Price in booking
  const [amountText, setAmountText] = useState("");
  const [amountPrice, setAmountPrice] = useState(0);

  // Open close confirm booking modal
  const [isOpen, setIsOpen] = useState(false);

  // Previous Tab
  const isInitialMount = useRef(true);
  const prevTabRef = useRef(currentTab);

  // Effect for handling tab changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const prevTab = prevTabRef.current;
    prevTabRef.current = currentTab;

    if (prevTab !== currentTab) {
      // Reset all states when switching tabs
      setAmountText("");
      setAmountPrice(0);
      setDiscountCode("");
      setStartDateTime(null);
      setEndDateTime(null);
      setSelectedDate(currentTab === "Hourly" ? today : null);
      setStartTime("");
      setEndTime("");
      setStartDate(null);
      setEndDate(null);
      setNumOfHours(0);
      setNumOfDays(0);
      setNumOfMonths(0);
    }
  }, [currentTab]);

  useEffect(() => {
    if (currentTab === "Hourly" && selectedDate && startTime && endTime) {
      setStartDateTime(combineDateAndTime(selectedDate, startTime));
      setEndDateTime(combineDateAndTime(selectedDate, endTime));
      calculateHours(startTime, endTime);
    } else if (currentTab === "Daily" && startDate && endDate) {
      let updatedStartDate = new Date(startDate);
      updatedStartDate.setHours(0, 0, 0, 0);
      let updatedEndDate = new Date(endDate);
      updatedEndDate.setHours(23, 59, 59, 999);

      setStartDateTime(updatedStartDate);
      setEndDateTime(updatedEndDate);
      calculateDays(startDate, endDate);
    } else if (currentTab === "Monthly" && startDate && endDate) {
      let updatedStartDate = new Date(startDate);
      updatedStartDate.setHours(0, 0, 0, 0);
      let updatedEndDate = new Date(endDate);
      updatedEndDate.setHours(23, 59, 59, 999);

      setStartDateTime(updatedStartDate);
      setEndDateTime(updatedEndDate);
    }
  }, [currentTab, selectedDate, startTime, endTime, startDate, endDate]);

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
    setAmountPrice(0);
  }

  // Handle open confirm booking modal
  const handleOpenCloseModal = () => {
    setIsOpen(!isOpen);
  };

  // Booking call api
  const handleConfirmBooking = async () => {
    if (!auth.isAuthenticated) {
      // If not login => Navigate to login page to login
      navigate(`/login?redirect=${window.location.pathname}`);
      return;
    }

    if (startDateTime && endDateTime) {
      const res = await postCreateBooking(
        roomData.workspace_id,
        currentTab,
        formatDateTime(startDateTime),
        formatDateTime(endDateTime),
        total
      );

      if (res && res.err === 0) {
        toast.success(res.message);

        navigate("/booking/payment", {
          state: {
            bookingId: res.data.booking_id, // Nếu API trả về bookingId
            roomData,
            workSpaceTypeName,
            amountPrice,
            amountText,
            subtotal,
            discount,
            tax,
            total,
          },
        });
      } else {
        toast.error(res.message);
      }

      setIsOpen(false);
    } else {
      console.error("Dữ liệu không hợp lệ");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="room-name-container flex items-center">
        <h1 className="room-name text-3xl font-black tracking-tight sm:text-5xl text-left">
          {roomData?.workspace_name}
        </h1>
        <div className="status-badge badge badge-success text-white text-xl p-5 font-bold ml-6">
          Available
        </div>
      </div>
      <div className="type-capacity-container">
        <div className="flex justify-between font-semibold">
          <div>Type: </div>
          <div>{workSpaceTypeName}</div>
        </div>
        <div className=" flex justify-between font-semibold">
          <div>Capacity: </div>
          <div>{roomData?.capacity} seats</div>
        </div>
      </div>

      <div role="tablist" className="tabs tabs-lifted">
        {/* Tab for Hour */}

        <input
          type="radio"
          name="booking_tabs"
          role="tab"
          className="tab"
          aria-label="Hourly"
          defaultChecked={currentTab === "Hourly"}
          onChange={() => setCurrentTab("Hourly")}
        />
        <div
          role="tabpanel"
          className={`tab-content bg-base-100 border-base-300 rounded-box p-6 ${
            currentTab === "Hourly" ? "block" : "hidden"
          }`}
        >
          {/* Price section */}
          <div className="flex justify-between font-semibold items-center my-1">
            <div>Price:</div>
            <div className="text-amber-500 text-xl font-bold">
              {roomData && formatCurrency(roomData?.price_per_hour)}/h
            </div>
          </div>

          <div className="flex justify-between font-semibold items-center my-1">
            <div className="font-semibold mb-2">
              Type Booking: <strong>{currentTab}</strong>
            </div>
          </div>

          {/* Remaining Time section */}
          <div className="font-semibold my-1">Remaining Time:</div>

          <div className="container mx-auto">
            {/* Custom Date Picker */}
            <div className="custom-date-time-container">
              <div className="custom-date-picker">
                <CustomDatePicker
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  today={today}
                />
              </div>

              <div className="custom-time-picker">
                <TimeRangePicker
                  selectedDate={selectedDate}
                  today={today}
                  startTime={startTime}
                  setStartTime={setStartTime}
                  endTime={endTime}
                  setEndTime={setEndTime}
                  convertTimeToMinutes={convertTimeToMinutes}
                />
              </div>
            </div>

            {/* Discount Code Input */}
            <input
              type="text"
              placeholder="Discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="input input-bordered w-full max-w-xl mb-3"
            />

            {/* Booking Summary */}

            <BookingSummary
              handleOpenCloseModal={handleOpenCloseModal}
              price={roomData?.price_per_hour}
              numOfHours={numOfHours}
              amountText={amountText}
              setAmountText={setAmountText}
              amountPrice={amountPrice}
              setAmountPrice={setAmountPrice}
              discount={discount}
              total={total}
              setTotal={setTotal}
              subtotal={subtotal}
              setSubtotal={setSubtotal}
              tax={tax}
              setTax={setTax}
            />
          </div>
        </div>

        {/* Tab for day */}

        <input
          type="radio"
          name="booking_tabs"
          role="tab"
          className="tab"
          aria-label="Daily"
          checked={currentTab === "Daily"}
          onChange={() => setCurrentTab("Daily")}
        />
        <div
          role="tabpanel"
          className={`tab-content bg-base-100 border-base-300 rounded-box p-6 ${
            currentTab === "Daily" ? "block" : "hidden"
          }`}
        >
          <div className=" flex justify-between font-semibold items-center my-1">
            <div>Price: </div>
            <div className="text-amber-500 text-xl font-bold">
              {roomData && formatCurrency(roomData?.price_per_day)}/day
            </div>
          </div>
          <div className="flex justify-between font-semibold items-center my-1">
            <div className="font-semibold mb-2">
              Type Booking: <strong>{currentTab}</strong>
            </div>
          </div>
          <div className="font-semibold mt-1 mb-2 ">Remaining Time: </div>
          <div className="my-4">
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              today={today}
            />
          </div>

          <input
            type="text"
            placeholder="Discount code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="input input-bordered w-full max-w-xl mb-3"
          />

          <BookingSummary
            handleOpenCloseModal={handleOpenCloseModal}
            price={roomData?.price_per_day}
            numOfDays={numOfDays}
            amountText={amountText}
            setAmountText={setAmountText}
            amountPrice={amountPrice}
            setAmountPrice={setAmountPrice}
            discount={discount}
            total={total}
            setTotal={setTotal}
            subtotal={subtotal}
            setSubtotal={setSubtotal}
            tax={tax}
            setTax={setTax}
          />
        </div>

        {/* Tab for Month */}

        <input
          type="radio"
          name="booking_tabs"
          role="tab"
          className="tab"
          aria-label="Monthly"
          checked={currentTab === "Monthly"}
          onChange={() => setCurrentTab("Monthly")}
        />
        <div
          role="tabpanel"
          className={`tab-content bg-base-100 border-base-300 rounded-box p-6 ${
            currentTab === "Monthly" ? "block" : "hidden"
          }`}
        >
          <div className=" flex justify-between font-semibold items-center my-1">
            <div>Price: </div>
            <div className="text-amber-500 text-xl font-bold">
              {roomData && formatCurrency(roomData?.price_per_month)}/month
            </div>
          </div>
          <div className="flex justify-between font-semibold items-center my-1">
            <div className="font-semibold mb-2">
              Type Booking: <strong>{currentTab}</strong>
            </div>
          </div>
          <div className="font-semibold mt-1 mb-2">Remaining Time: </div>
          <div className="pb-4">
            <MonthRangePicker
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              numOfMonths={numOfMonths}
              setNumOfMonths={setNumOfMonths}
              today={today}
              setAmountPrice={setAmountPrice}
            />
          </div>

          <input
            type="text"
            placeholder="Discount code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="input input-bordered w-full max-w-xl mb-3"
          />

          <BookingSummary
            handleOpenCloseModal={handleOpenCloseModal}
            price={roomData?.price_per_month}
            numOfMonths={numOfMonths}
            amountText={amountText}
            setAmountText={setAmountText}
            amountPrice={amountPrice}
            setAmountPrice={setAmountPrice}
            discount={discount}
            total={total}
            setTotal={setTotal}
            subtotal={subtotal}
            setSubtotal={setSubtotal}
            tax={tax}
            setTax={setTax}
          />
        </div>
      </div>

      <BookingSummaryModal
        isOpen={isOpen}
        handleOpenCloseModal={handleOpenCloseModal}
        roomData={roomData}
        workSpaceTypeName={workSpaceTypeName}
        currentTab={currentTab}
        selectedDate={selectedDate}
        startTime={startTime}
        endTime={endTime}
        startDate={startDate}
        endDate={endDate}
        discountCode={discountCode}
        amountPrice={amountPrice}
        amountText={amountText}
        subtotal={subtotal}
        discount={discount}
        tax={tax}
        total={total}
        handleConfirmBooking={handleConfirmBooking}
      />
    </>
  );
};

export default BookingRoom;
