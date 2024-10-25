import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PriceBreakDown from "../../../components/layout/Customer/PriceAllBreakDown/PriceBreakDown";
import ProgressBar from "../../../components/layout/Customer/Progress Bar/ProgressBar";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import BookingTimeLine from "../../../components/layout/Customer/BookingTimeLine/BookingTimeLine";
import BookingDetailCard from "../../../components/layout/Customer/BookingDetailCard/BookingDetailCard";
import {
  getAmnenitiesBookingByBookingId,
  getBookingById,
} from "../../../config/api";
import BookingAmenitiesCard from "../BookingAmenitiesCard/BookingAmenitiesCard";

const BookingDetail = () => {
  const location = useLocation();
  const booking = location.state?.booking; // Access booking data passed via navigate
  const workspace = location.state?.workspace; // Access workspace data passed via navigate
  const type = location.state?.type; // Access type data passed via navigate
  const [bookingStatuses, setBookingStatuses] = useState([]);
  const [amenitiesBooking, setAmenitiesBooking] = useState([]);

  const statusOrder = [
    "confirmed",
    "paid",
    "check-in",
    "usage",
    "check-out",
    booking.BookingStatuses[0].status === "cancelled"
      ? "cancelled"
      : "completed",
  ];

  const currentStatusIndex = statusOrder.indexOf(
    booking.BookingStatuses[0].status === "check-amenities" ||
      booking.BookingStatuses[0].status === "damaged-payment"
      ? "check-out"
      : booking.BookingStatuses[0].status === "cancelled"
      ? "cancelled"
      : booking.BookingStatuses[0].status
  );

  useEffect(() => {
    const fetchBookingStatus = async () => {
      try {
        const res = await getBookingById(booking.booking_id);
        if (res && res.data && res.err === 0) {
          setBookingStatuses(res.data.BookingStatuses);
        } else {
          setBookingStatuses([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAmenitiesBooking = async () => {
      try {
        const res = await getAmnenitiesBookingByBookingId(booking.booking_id);
        if (res && res.data && res.err === 0) {
          setAmenitiesBooking(res.data);
        } else {
          setAmenitiesBooking([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookingStatus();
    fetchAmenitiesBooking();
  }, []);

  useEffect(() => {
    console.log("amenities: ", amenitiesBooking);
  }, [amenitiesBooking]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "usage":
        return "badge badge-warning"; // Màu vàng cho trạng thái "usage"
      case "check-out":
        return "badge badge-info"; // Màu xanh dương cho "checkout"
      case "check-amenities":
        return "badge badge-primary"; // Màu xanh đậm cho "check-amenities"
      case "paid":
        return "badge badge-accent"; // Màu xanh lá cho "paid"
      case "confirmed":
        return "badge badge-secondary"; // Màu xám cho "confirmed"
      case "check-in":
        return "badge badge-warning"; // Màu xanh cho "check-in"
      case "damaged-payment":
        return "badge badge-error"; // Màu đỏ cho "damaged-payment"
      case "completed":
        return "badge badge-success"; // Màu tím cho "completed"
      case "cancelled":
        return "badge badge-error"; // Màu đỏ cho "cancelled"
      default:
        return "badge"; // Mặc định cho các trạng thái khác
    }
  };

  return (
    <div className="max-w-5xl container mx-auto my-20 p-8 bg-white rounded-lg shadow-lg">
      <div className="flex items-center pb-4 border-b-2">
        <Link to="/user/booking">
          <IoChevronBackCircleOutline className="text-2xl mr-3" />
        </Link>

        <h2 className="text-2xl font-bold  ">
          Booking Detail for #{booking.booking_id}
        </h2>
      </div>

      {/* Progress bar */}
      <ProgressBar
        statusOrder={statusOrder}
        booking={booking}
        currentStatusIndex={currentStatusIndex}
      />

      {/* Booking timeline transaction */}
      <BookingTimeLine bookingStatuses={bookingStatuses} />

      {/* Booking details */}
      <BookingDetailCard
        booking={booking}
        workspace={workspace}
        type={type}
        getStatusBadgeClass={getStatusBadgeClass}
      />

      <hr />

      <BookingAmenitiesCard amenitiesBooking={amenitiesBooking} />

      <hr />
      {booking.BookingStatuses[0].status !== "cancelled" ? (
        <PriceBreakDown booking={booking} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default BookingDetail;
