import React, { useEffect, useRef, useState } from "react";
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
import PriceBrokenAmenities from "../../../components/layout/Customer/PriceBrokenAmenities/PriceBrokenAmenities";
import PaymentBrokenButton from "../../../components/layout/Customer/PaymentBrokenButton/PaymentBrokenButton";
import ReviewBox from "../../../components/layout/Customer/ReviewBox/ReviewBox";
import DetailBookingTour from "../../../components/layout/Customer/DetailBookingTour/DetailBookingTour";

const BookingDetail = () => {
  const location = useLocation();
  const booking = location.state?.booking; // Access booking data passed via navigate
  const workspace = location.state?.workspace; // Access workspace data passed via navigate
  const type = location.state?.type; // Access type data passed via navigate
  const dataReview = location.state?.dataReview; // Access type data passed via navigate

  const [bookingStatuses, setBookingStatuses] = useState([]);
  const [amenitiesBooking, setAmenitiesBooking] = useState([]);
  const [amenitiesBroken, setAmenitiesBroken] = useState([]);

  // Refs for tour elements
  const progressBarRef = useRef(null);
  const timelineRef = useRef(null);
  const detailsRef = useRef(null);
  const amenitiesRef = useRef(null);
  const priceBreakdownRef = useRef(null);

  // References object for TourGuide
  const tourRefs = {
    progressBarRef,
    timelineRef,
    detailsRef,
    amenitiesRef,
    priceBreakdownRef,
  };

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
          const amenitiesArray = res?.data?.report_damage_ameninites
            .split("|")
            .map((item) => {
              const [amenities, quantity, amount] = item
                .split(":")
                .map((str) => str.trim());
              return {
                amenities,
                quantity: parseInt(quantity, 10),
                amount: +amount,
              };
            });
          setAmenitiesBroken(amenitiesArray);
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

      <div ref={progressBarRef}>
        <ProgressBar
          statusOrder={statusOrder}
          booking={booking}
          currentStatusIndex={currentStatusIndex}
        />
      </div>

      <div ref={timelineRef}>
        <BookingTimeLine bookingStatuses={bookingStatuses} />
      </div>

      <div ref={detailsRef}>
        <BookingDetailCard
          booking={booking}
          workspace={workspace}
          type={type}
          getStatusBadgeClass={getStatusBadgeClass}
        />
      </div>

      <hr />

      {dataReview && booking.BookingStatuses[0].status === "completed" && (
        <ReviewBox review={dataReview} />
      )}

      <hr />

      <div ref={amenitiesRef}>
        <BookingAmenitiesCard amenitiesBooking={amenitiesBooking} />
      </div>

      {booking.report_damage_ameninites !== null && (
        <>
          <hr />
          <div className="flex items-center my-4">
            <div
              className={`${
                booking.BookingStatuses[0].status !== "damaged-payment"
                  ? "w-full"
                  : "w-1/2"
              }`}
            >
              <PriceBrokenAmenities
                booking={booking}
                amenitiesBroken={amenitiesBroken}
              />
            </div>
            {booking.BookingStatuses[0].status === "damaged-payment" && (
              <div className="w-1/2 p-2 border-l-2">
                <PaymentBrokenButton booking={booking} />
              </div>
            )}
          </div>
        </>
      )}

      {booking.BookingStatuses[0].status !== "cancelled" && (
        <>
          <hr />
          <div ref={priceBreakdownRef}>
            <PriceBreakDown booking={booking} />
          </div>
        </>
      )}

      <DetailBookingTour references={tourRefs} />
    </div>
  );
};

export default BookingDetail;
