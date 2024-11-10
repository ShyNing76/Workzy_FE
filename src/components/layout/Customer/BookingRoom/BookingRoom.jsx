import React, { useContext, useEffect, useRef, useState } from "react";
import CustomDatePicker from "../DatePicker/CustomDatePicker";
import BookingSummary from "../Booking Summary/BookingSummary";

import MonthRangePicker from "../MonthRangePicker/MonthRangePicker";
import DateRangePicker from "../DateRangePicker/DateRangePicker";
import TimeRangePicker from "../TimePicker/TimeRangePicker";
import { formatDateTime } from "../../../context/dateFormat";
import { formatCurrency } from "../../../context/priceFormat";
import BookingSummaryModal from "../BookingSummaryModal/BookingSummaryModal";
import { getPointOfCustomer, postCreateBooking } from "../../../../config/api";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../../context/auth.context";
import { useNavigate } from "react-router-dom";
import "./BookingRoom.scss";
import DiscountCodeForm from "../DiscountCode/DiscountCodeForm ";
// import Wishlist from "../Wishlist/Wishlist";
import { MdWorkspaces } from "react-icons/md";
import WishlistButton from "../WishlistButton/WishlistButton";
import {
  calculateRank,
  getRankDiscount,
  RankDiscountDisplay,
} from "../../../../utils/rankDiscountSystem";

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
    isFullyBooked,
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
  const [messageDiscount, setMessageDiscount] = useState({
    type: "",
    content: "",
  });
  const [discountCode, setDiscountCode] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [voucherId, setVoucherId] = useState("");

  // Amount Text and Price in booking
  const [amountText, setAmountText] = useState("");
  const [amountPrice, setAmountPrice] = useState(0);

  // Open close confirm booking modal
  const [isOpen, setIsOpen] = useState(false);

  // Previous Tab
  const isInitialMount = useRef(true);
  const prevTabRef = useRef(currentTab);

  // Add new state for rank discount
  const [rankDiscount, setRankDiscount] = useState(0);
  const [customerPoints, setCustomerPoints] = useState(0);
  const [rankDiscountAmount, setRankDiscountAmount] = useState(0);

  // Add useEffect to fetch customer points
  useEffect(() => {
    const fetchCustomerPoints = async () => {
      if (auth.isAuthenticated) {
        try {
          const res = await getPointOfCustomer();

          if (res && res.err === 0) {
            setCustomerPoints(res.data);
            const rank = calculateRank(res.data);
            const discount = getRankDiscount(rank);
            setRankDiscount(discount);
          }
        } catch (error) {
          console.error("Error fetching customer points:", error);
        }
      }
    };

    fetchCustomerPoints();
  }, [auth.isAuthenticated]);

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
      setMessageDiscount({
        type: "",
        content: "",
      });
      setDiscount(0);
      setVoucherId("");
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
        total,
        voucherId
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
            discountCode,
            tax,
            total,
            rankDiscount,
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

      {/* Header Section */}
      <div className="booking-detail flex flex-wrap items-start justify-between mb-8">
        <div className="space-y-4  w-full">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">{roomData?.workspace_name}</h1>
            <span
              className={`badge ${
                isFullyBooked ? "badge-error" : "badge-success"
              } badge-lg text-white p-4 font-bold mx-4`}
            >
              {isFullyBooked ? "Unavailable" : "Available"}
            </span>
          </div>

          <div className="flex items-center space-x-6 w-full justify-between">
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <MdWorkspaces className="text-gray-500" />
                <span className="text-gray-600">{workSpaceTypeName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span className="text-gray-600">
                  {roomData?.capacity} seats
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-4">
                <WishlistButton
                  workspaceId={roomData.workspace_id}
                  workspaceName={roomData.workspace_name}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-0">
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
                {auth.isAuthenticated && (
                  <DiscountCodeForm
                    discountCode={discountCode}
                    setDiscountCode={setDiscountCode}
                    setDiscount={setDiscount}
                    message={messageDiscount}
                    setMessage={setMessageDiscount}
                    setVoucherId={setVoucherId}
                  />
                )}

                {auth.isAuthenticated && (
                  <RankDiscountDisplay
                    points={customerPoints}
                    rankDiscount={rankDiscount}
                  />
                )}

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
                  rankDiscount={rankDiscount}
                  setRankDiscountAmount={setRankDiscountAmount}
                  rankDiscountAmount={rankDiscountAmount}
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

              {auth.isAuthenticated && (
                <DiscountCodeForm
                  discountCode={discountCode}
                  setDiscountCode={setDiscountCode}
                  setDiscount={setDiscount}
                  message={messageDiscount}
                  setMessage={setMessageDiscount}
                  setVoucherId={setVoucherId}
                />
              )}

              {auth.isAuthenticated && (
                <RankDiscountDisplay
                  points={customerPoints}
                  rankDiscount={rankDiscount}
                />
              )}

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
                rankDiscount={rankDiscount}
                setRankDiscountAmount={setRankDiscountAmount}
                rankDiscountAmount={rankDiscountAmount}
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

              {auth.isAuthenticated && (
                <DiscountCodeForm
                  discountCode={discountCode}
                  setDiscountCode={setDiscountCode}
                  setDiscount={setDiscount}
                  message={messageDiscount}
                  setMessage={setMessageDiscount}
                  setVoucherId={setVoucherId}
                />
              )}

              {auth.isAuthenticated && (
                <RankDiscountDisplay
                  points={customerPoints}
                  rankDiscount={rankDiscount}
                />
              )}

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
                rankDiscount={rankDiscount}
                setRankDiscountAmount={setRankDiscountAmount}
                rankDiscountAmount={rankDiscountAmount}
              />
            </div>
          </div>
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
        rankDiscount={rankDiscount}
      />
    </>
  );
};

export default BookingRoom;
