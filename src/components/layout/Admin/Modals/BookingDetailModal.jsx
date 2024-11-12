import React from "react";
import { IoClose } from "react-icons/io5";
import { FiUser, FiMapPin, FiCalendar, FiBox, FiClock } from "react-icons/fi";
import { format } from "date-fns";
import { formatCurrency } from "../../../context/priceFormat";

const BookingDetailsModal = ({ booking, onClose }) => {
  if (!booking) return null;

  const CalculateTime = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diff = end - start;
    const hoursRent = Math.floor(diff / (1000 * 60 * 60));
    return hoursRent;
  };

  const StatusBadge = ({ status }) => {
    const getStatusStyle = (status) => {
      switch (status) {
        case "usage":
          return "badge-accent";
        case "paid":
          return "badge-warning";
        case "cancelled":
          return "badge-error";
        case "check-amenities":
          return "badge-primary";
        case "completed":
          return "badge-info";
        default:
          return "badge-neutral";
      }
    };

    return (
      <div className={`badge badge-lg ${getStatusStyle(status)} capitalize`}>
        {status || "N/A"}
      </div>
    );
  };

  const InfoSection = ({ icon: Icon, title, children }) => (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4 gap-4">
        <div className="flex items-center gap-2 text-amber-500">
          <Icon className="w-5 h-5" />
          <h3 className="card-title text-lg">{title}</h3>
        </div>
        <div className="grid gap-3">{children}</div>
      </div>
    </div>
  );

  const InfoRow = ({ label, value, className = "" }) => (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
      <span className="text-base-content/60 min-w-[140px] font-medium">
        {label}
      </span>
      <span className={`text-base-content ${className}`}>{value}</span>
    </div>
  );

  return (
    <dialog id="booking_details_modal" className="modal modal-open">
      <div className="modal-box max-w-4xl w-11/12 p-0">
        {/* Header */}
        <div className="sticky top-0 bg-base-100 px-6 py-4 border-b border-base-200 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-amber-500">
              Booking Details
            </h2>
            <p className="text-base-content/60">ID: {booking.booking_id}</p>
          </div>
          <div className="flex items-center gap-4">
            <StatusBadge status={booking.BookingStatuses[0]?.status} />
            <button onClick={onClose} className="btn btn-ghost btn-circle">
              <IoClose className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Customer Info */}
          <InfoSection icon={FiUser} title="Customer Information">
            <InfoRow label="Name" value={booking.Customer.User.name} />
            <InfoRow label="Email" value={booking.Customer.User.email} />
            <InfoRow label="WY Points" value={booking.Customer.point} />
          </InfoSection>

          {/* Workspace Info */}
          <InfoSection icon={FiMapPin} title="Workspace Information">
            <InfoRow
              label="Building"
              value={booking.Workspace.Building.building_name}
            />
            <InfoRow
              label="Workspace"
              value={booking.Workspace.workspace_name}
            />
            <InfoRow
              label="Price per hour"
              value={formatCurrency(booking.workspace_price)}
              className="text-amber-500 font-medium"
            />
          </InfoSection>

          {/* Booking Info */}
          <InfoSection icon={FiCalendar} title="Booking Details">
            <InfoRow label="Booking Type" value={booking.BookingType.type} />
            <InfoRow
              label="Duration"
              value={`${CalculateTime(
                booking.start_time_date,
                booking.end_time_date
              )} hours`}
            />
            <InfoRow
              label="Start Time"
              value={format(
                new Date(booking.start_time_date),
                "dd/MM/yyyy HH:mm"
              )}
            />
            <InfoRow
              label="End Time"
              value={format(
                new Date(booking.end_time_date),
                "dd/MM/yyyy HH:mm"
              )}
            />
            <InfoRow
              label="Workspace Total"
              value={formatCurrency(booking.total_workspace_price)}
              className="text-amber-500  font-medium"
            />
          </InfoSection>

          {/* Amenities Info */}
          <InfoSection icon={FiBox} title="Amenities">
            {booking.Amenities.length > 0 ? (
              <div className="space-y-4">
                <div className="grid gap-4">
                  {booking.Amenities.map((amenity, index) => (
                    <div key={index} className="card bg-base-200">
                      <div className="card-body p-4">
                        <h4 className="font-medium">Amenity {index + 1}</h4>
                        <div className="grid gap-2">
                          <InfoRow label="Name" value={amenity.amenity_name} />
                          <InfoRow
                            label="Quantity"
                            value={amenity.BookingAmenities.quantity}
                          />
                          <InfoRow
                            label="Price"
                            value={formatCurrency(amenity.rent_price)}
                            className="text-amber-500 "
                          />
                          <InfoRow label="Status" value={amenity.status} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <InfoRow
                  label="Amenities Total"
                  value={formatCurrency(booking.total_amenities_price)}
                  className="text-amber-500  font-medium"
                />
              </div>
            ) : (
              <p className="text-base-content/60 italic">No amenities booked</p>
            )}
          </InfoSection>

          {/* Total Section */}
          <div className="card bg-amber-500 text-white ">
            <div className="card-body p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Total Amount</span>
                <span className="text-2xl font-extrabold">
                  {formatCurrency(booking.total_price)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default BookingDetailsModal;
