import React, { useEffect, useState } from "react";
import "./BookingCard.scss";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../context/priceFormat";
import { format, parseISO } from "date-fns";
import imageWorkspace from "../../../../assets/workspace.jpeg";

const BookingCard = (props) => {
  const {
    booking,
    workspace,
    type,
    isReview,
    dataReview,
    handleCancelBooking,
    handleCheckinBooking,
    handleCheckoutBooking,
    handleOpenReviewModal,
    handleRefundBooking,
    handlAddToCalendar,
  } = props;
  const navigate = useNavigate(); // For navigating to detail page

  const handleCardClick = () => {
    navigate(`${booking.booking_id}`, {
      state: { booking, workspace, type, dataReview },
    });
  };

  const handleAddAmenitiesClick = (event) => {
    event.stopPropagation();
    navigate(`amenities/${booking.booking_id}`, { state: { booking } });
  };

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
    <div
      className="booking-card card card-side bg-base-100 shadow-xl my-6 cursor-pointer"
      onClick={handleCardClick}
    >
      <figure className="m-6 mr-0 ">
        <img
          className="rounded-lg"
          src={workspace.WorkspaceImages[0].image}
          alt="Room"
          style={{ width: "250px", height: "250px" }}
        />
      </figure>
      <div className="card-body">
        <div className="flex justify-between pb-3 border-b-2">
          <h2 className="card-title ">
            {workspace.workspace_name} -{" "}
            <div
              className={`badge p-3  ${getStatusBadgeClass(
                booking.BookingStatuses[0].status
              )}`}
            >
              {booking.BookingStatuses[0].status}
            </div>{" "}
          </h2>
          {booking.BookingStatuses[0].status === "confirmed" ||
          booking.BookingStatuses[0].status === "paid" ? (
            <button
              className="btn btn-outline btn-neutral btn-sm"
              onClick={(e) => handlAddToCalendar(e, booking.booking_id)}
            >
              Add to Calendar
            </button>
          ) : (
            <></>
          )}
        </div>

        <p>
          <strong>Booking ID</strong>: {booking.booking_id}
        </p>
        <div className="flex justify-between">
          <p>
            <strong>From</strong>:{" "}
            {format(parseISO(booking.start_time_date), "HH:mm - dd/MM/yyyy")}
          </p>
          <p className="text-right">
            <strong>To</strong>:{" "}
            {format(parseISO(booking.end_time_date), "HH:mm - dd/MM/yyyy")}
          </p>
        </div>

        <p>
          <strong>Type</strong>: {type && type.type}
        </p>
        <p>
          <strong>Total</strong>: {formatCurrency(booking.total_price)}
        </p>
        <div
          className={`card-actions ${
            booking.BookingStatuses[0].status === "usage" ||
            booking.BookingStatuses[0].status === "confirmed"
              ? "justify-between"
              : "justify-end"
          } `}
        >
          {booking.BookingStatuses[0].status === "confirmed" && (
            <>
              <button
                className="btn btn-outline btn-error"
                onClick={(e) => handleCancelBooking(e, booking.booking_id)}
              >
                Cancel Booking
              </button>
              <button className="btn btn-outline btn-secondary">Pay Now</button>
            </>
          )}
          {booking.BookingStatuses[0].status === "paid" && (
            <>
              <button
                className="btn btn-outline btn-error"
                onClick={(e) => handleRefundBooking(e, booking.booking_id)}
              >
                Cancel Booking
              </button>
              <button
                className="btn btn-outline btn-primary"
                onClick={(e) =>
                  handleCheckinBooking(e, booking.booking_id, booking)
                }
              >
                Check-in
              </button>
            </>
          )}
          {booking.BookingStatuses[0].status === "usage" && (
            <>
              <button
                className="btn btn-outline btn-info"
                onClick={(e) =>
                  handleCheckoutBooking(e, booking.booking_id, booking)
                }
              >
                Checkout
              </button>
              <button
                className="btn btn-outline btn-primary"
                onClick={handleAddAmenitiesClick}
              >
                Add amenities
              </button>
            </>
          )}
          {booking.BookingStatuses[0].status === "damage-payment" && (
            <button className="btn btn-outline btn-secondary">
              Pay Broken Amenities
            </button>
          )}
          {booking.BookingStatuses[0].status === "completed" &&
            isReview === false && (
              <button
                className="btn btn-outline btn-accent"
                onClick={(e) => handleOpenReviewModal(e, booking.booking_id)}
              >
                Rating
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
