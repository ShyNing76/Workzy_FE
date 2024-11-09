import React from "react";
import { useState, useEffect } from "react";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { getTimeBookingInRoomAndDate } from "../../../../config/api";
import { format, formatISO, startOfDay } from "date-fns";

const TimeBooking = (props) => {
  const { workspaceId, selectedDate, setIsFullyBooked } = props;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTooltip, setActiveTooltip] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!workspaceId || !selectedDate) return;

      setLoading(true);

      try {
        const res = await getTimeBookingInRoomAndDate(
          workspaceId,
          encodeURIComponent(formatISO(selectedDate))
        );
        if (res.err === 0) {
          setBookings(res.data);
          // Kiểm tra xem tất cả các slot có được booking không
          checkFullyBooked(res.data);
        } else {
          setError(res.message);
        }
      } catch (err) {
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [workspaceId, selectedDate]);

  const checkFullyBooked = (bookingData) => {
    // Tạo mảng 24 slot thời gian
    const timeSlots = Array.from({ length: 24 }, (_, i) => {
      const hour = (i + 1).toString().padStart(2, "0");
      return `${hour}:00`;
    });

    // Kiểm tra từng slot có được booking không
    const allSlotsBooked = timeSlots.every((timeStr) => {
      const slotDate = new Date(selectedDate);
      const [hours] = timeStr.split(":");
      slotDate.setHours(parseInt(hours), 0, 0, 0);

      return bookingData.some((booking) => {
        const bookingStart = new Date(booking.start_time_date);
        const bookingEnd = new Date(booking.end_time_date);
        return slotDate >= bookingStart && slotDate < bookingEnd;
      });
    });

    setIsFullyBooked(allSlotsBooked);
  };

  const getBookingInfo = (timeStr) => {
    if (!bookings.length || !selectedDate) return null;

    const [hours] = timeStr.split(":");
    // Tạo một bản sao của selectedDate để không ảnh hưởng đến state gốc
    const slotDate = new Date(selectedDate);
    slotDate.setHours(parseInt(hours), 0, 0, 0);

    return bookings.find((booking) => {
      const bookingStart = new Date(booking.start_time_date);
      const bookingEnd = new Date(booking.end_time_date);
      return slotDate >= bookingStart && slotDate < bookingEnd;
    });
  };

  const formatTime = (dateStr) => {
    return new Date(dateStr).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const generateTimeSlots = (period) => {
    return Array.from({ length: 12 }, (_, i) => {
      const hour = period === "AM" ? i + 1 : i + 13;
      const timeStr = `${hour.toString().padStart(2, "0")}:00`;
      const bookingInfo = getBookingInfo(timeStr);
      return {
        time: timeStr,
        isBooked: !!bookingInfo,
        bookingInfo,
      };
    });
  };

  const getSlotStyles = (isBooked) => {
    const baseStyles =
      "relative p-1 text-sm border rounded-lg transition-colors duration-200 ease-in-out text-center font-medium focus:outline-none focus:ring-2 focus:ring-opacity-50 ";

    if (isBooked) {
      return baseStyles + "bg-red-100 border-red-300 text-red-700 cursor-help";
    }
    return (
      baseStyles +
      "border-gray-200 hover:bg-blue-50 hover:border-blue-300 text-gray-700 hover:text-blue-600 focus:ring-blue-500"
    );
  };

  const formatBookingTime = (booking) => {
    if (!booking) return {};

    const start = new Date(booking.start_time_date);
    const end = new Date(booking.end_time_date);
    const durationInHours = (end - start) / (1000 * 60 * 60);

    let duration;
    if (durationInHours > 24 * 30) {
      duration = `${Math.round(durationInHours / (24 * 30))} months`;
    } else if (durationInHours > 24) {
      duration = `${Math.round(durationInHours / 24)} days`;
    } else {
      duration = `${Math.round(durationInHours)} hours`;
    }

    return {
      from: formatTime(start),
      to: formatTime(end),
      duration,
    };
  };

  const Tooltip = ({ booking }) => {
    if (!booking) return null;

    const { from, to, duration } = formatBookingTime(booking);

    return (
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10">
        <div className="font-semibold mb-1 underline">Booking Details</div>
        <div className="flex justify-between">
          <div className="mb-1">From: {from}</div>
          <div className="mb-1">To: {to}</div>
        </div>

        <div className="mb-1">Duration: {duration}</div>
        <div className="mb-1 badge-success badge">
          <span className="capitalize">
            {booking.BookingStatuses?.[0]?.status || "unknown"}
          </span>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-full p-4 flex justify-center items-center">
        <span className="loading loading-spinner loading-sm"></span>
      </div>
    );
  }

  if (error) {
    return <div className="w-full p-4 text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="time-booking">
      <h2 className=" text-2xl font-bold mb-4 mt-4 text-gray-800">
        Available Time Slots ({format(selectedDate, "dd-MM-yyyy")})
      </h2>
      <div className="w-full p-4 ">
        <div className="space-y-4">
          {/* Morning Section */}
          <div className="flex items-start space-x-2">
            <div className="w-12 h-16 flex items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg shrink-0">
              <IoSunnyOutline className="w-5 h-5" />
            </div>
            <div className="flex-1 grid grid-cols-4 gap-1 sm:grid-cols-6 md:grid-cols-6">
              {generateTimeSlots("AM").map(
                ({ time, isBooked, bookingInfo }) => (
                  <button
                    key={time}
                    disabled={isBooked}
                    className={getSlotStyles(isBooked)}
                    onMouseOver={() => setActiveTooltip(isBooked ? time : null)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    <span className="text-xs sm:text-sm">{time}</span>
                    {activeTooltip === time && (
                      <Tooltip booking={bookingInfo} />
                    )}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Evening Section */}
          <div className="flex items-start space-x-2">
            <div className="w-12 h-16 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shrink-0">
              <IoMoonOutline className="w-5 h-5" />
            </div>
            <div className="flex-1 grid grid-cols-4 gap-1 sm:grid-cols-6 md:grid-cols-6">
              {generateTimeSlots("PM").map(
                ({ time, isBooked, bookingInfo }) => (
                  <button
                    key={time}
                    disabled={isBooked}
                    className={getSlotStyles(isBooked)}
                    onMouseOver={() => setActiveTooltip(isBooked ? time : null)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    <span className="text-xs sm:text-sm">{time}</span>
                    {activeTooltip === time && (
                      <Tooltip booking={bookingInfo} />
                    )}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex justify-center space-x-4 text-xs sm:text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded bg-white border border-gray-200 mr-2"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded bg-red-100 border border-red-300 mr-2"></div>
            <span>Booked</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeBooking;
