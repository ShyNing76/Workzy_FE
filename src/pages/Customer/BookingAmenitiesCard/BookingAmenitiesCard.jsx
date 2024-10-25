import React, { useEffect } from "react";
import { formatCurrency } from "../../../components/context/priceFormat";

const BookingAmenitiesCard = ({ amenitiesBooking }) => {
  //   Kiểm tra xem booking có chứa amenities không

  if (amenitiesBooking && amenitiesBooking.length === 0) {
    return (
      <div className="my-8">
        <h3 className="text-xl font-semibold mb-4">Additional Amenities</h3>
        <div className="alert">
          <span>No additional amenities booked</span>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Additional Amenities</h3>
      </div>

      {/* Amenities Grid */}
      <div className="flex flex-col gap-4">
        {amenitiesBooking &&
          amenitiesBooking.map((amenity, index) => (
            <div
              key={`amenity-${index}`}
              className="flex bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden p-6"
            >
              {/* Hình ảnh bên trái */}
              <div className="w-36 h-36 flex-shrink-0 ">
                <img
                  src={amenity?.Amenity?.image || "https://placehold.co/80x80"}
                  alt={amenity?.Amenity?.amenity_name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Thông tin bên phải */}
              <div className="flex-1 px-4">
                <h4 className="font-semibold text-lg mb-2">
                  {amenity?.Amenity?.amenity_name}
                </h4>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-medium">{amenity.quantity}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium">
                    {formatCurrency(amenity.price)}
                  </span>
                </div>

                <div className="mt-4 pt-2 border-t">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Subtotal:</span>
                    <span className="text-amber-500 font-bold">
                      {formatCurrency(amenity.total_price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BookingAmenitiesCard;
