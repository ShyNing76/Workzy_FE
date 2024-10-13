import React from "react";
import "./BookingCard.scss";

const BookingCard = (props) => {
  const { booking } = props;

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "in-process":
        return "badge badge-warning"; // Màu vàng cho trạng thái "in-process"
      case "checkout":
        return "badge badge-info"; // Màu xanh dương cho "checkout"
      case "check-amenities":
        return "badge badge-primary"; // Màu xanh đậm cho "check-amenities"
      case "paid":
        return "badge badge-success"; // Màu xanh lá cho "paid"
      case "confirmed":
        return "badge badge-secondary"; // Màu xám cho "confirmed"
      case "completed":
        return "badge badge-accent"; // Màu tím cho "completed"
      case "canceled":
        return "badge badge-error"; // Màu đỏ cho "canceled"
      default:
        return "badge"; // Mặc định cho các trạng thái khác
    }
  };

  return (
    <div
      key={booking.bookingID}
      className="booking-card card card-side bg-base-100 shadow-xl my-6 cursor-pointer"
    >
      <figure className="m-6 mr-0 ">
        <img
          className="rounded-lg"
          src="https://via.placeholder.com/250"
          alt="Room"
        />
      </figure>
      <div className="card-body">
        <div className="flex justify-between pb-3 border-b-2">
          <h2 className="card-title ">
            {booking.roomName} -{" "}
            <div
              className={`badge p-3  ${getStatusBadgeClass(booking.status)}`}
            >
              {booking.status}
            </div>{" "}
          </h2>
          <button className="btn btn-outline btn-neutral btn-sm">
            Add to Calendar
          </button>
        </div>

        <p>
          <strong>Booking ID</strong>: {booking.bookingID}
        </p>
        <div className="flex justify-between">
          <p>
            <strong>From</strong>: {booking.from}
          </p>
          <p className="text-right">
            <strong>To</strong>: {booking.to}
          </p>
        </div>

        <p>
          <strong>Type</strong>: {booking.type}
        </p>
        <p>
          <strong>Total</strong>: {booking.total}
        </p>
        <div
          className={`card-actions ${
            booking.status === "in-process" ? "justify-between" : "justify-end"
          } `}
        >
          {booking.status === "confirmed" && (
            <button className="btn btn-outline btn-secondary">Pay Now</button>
          )}
          {booking.status === "paid" && (
            <button className="btn btn-outline btn-error">
              Cancel Booking
            </button>
          )}
          {booking.status === "in-process" && (
            <>
              <button className="btn btn-outline btn-primary">
                Add amenities
              </button>

              <button className="btn btn-outline btn-info">Checkout</button>
            </>
          )}
          {booking.status === "completed" && (
            <button className="btn btn-outline btn-accent">Review</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
