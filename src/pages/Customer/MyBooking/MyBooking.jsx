import React, { useState } from "react";
import BookingTab from "../../../components/layout/Customer/BookingTab/BookingTab";
import BookingCard from "../../../components/layout/Customer/BookingCard/BookingCard";
import noDataIcon from "../../../assets/no-data.png";
import "./MyBooking.scss";

const MyBooking = () => {
  const [selectedTab, setSelectedTab] = useState("All");

  const bookingData = [
    {
      roomName: "Phòng A",
      bookingID: "123456789098765432",
      from: "12:00 - September 2, 2024",
      to: "12:00 - September 2, 2024",
      type: "Daily",
      total: "100.000 đ",
      status: "in-process", // Trạng thái của booking
    },
    {
      roomName: "Phòng B",
      bookingID: "234567890987654321",
      from: "14:00 - October 5, 2024",
      to: "14:00 - October 6, 2024",
      type: "Hourly",
      total: "200.000 đ",
      status: "paid",
    },
    // Thêm dữ liệu booking khác nếu cần
  ];

  // Lọc bookings theo trạng thái của từng tab
  const filterBookings = () => {
    if (selectedTab === "All") return bookingData;
    if (selectedTab === "Current") {
      return bookingData.filter((booking) =>
        ["in-process", "checkout", "check-amenities"].includes(booking.status)
      );
    }
    if (selectedTab === "Upcoming") {
      return bookingData.filter((booking) =>
        ["paid", "confirmed"].includes(booking.status)
      );
    }
    if (selectedTab === "Completed") {
      return bookingData.filter((booking) => booking.status === "completed");
    }
    if (selectedTab === "Canceled") {
      return bookingData.filter((booking) => booking.status === "canceled");
    }
    return [];
  };

  return (
    <div className="max-w-5xl container mx-auto my-24 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-neutral mb-8 text-left">
        My Booking
      </h2>
      <div className="container mx-auto p-4">
        {/* Component Tabs */}
        <BookingTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {/* Hiển thị Booking Cards tương ứng */}
        <div className="my-4">
          {filterBookings().length > 0 ? (
            filterBookings().map((booking) => (
              <BookingCard key={booking.bookingID} booking={booking} />
            ))
          ) : (
            <div className="no-booking-data">
              <img src={noDataIcon} alt="No Data" className="no-data-icon" />
              <p>No Booking Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBooking;
