import React, { useState } from "react";
import { PiChalkboardSimple } from "react-icons/pi";
import { PiNoteBlankLight } from "react-icons/pi";
import { BsProjector } from "react-icons/bs";
import { IoCafeOutline } from "react-icons/io5";
import RoomImage from "../../assets/9.png";
import GallerySwiper from "../../components/layout/GallerySwiper/GallerySwiper";
import "./RoomDetail.scss";
import Googlemap from "../../components/layout/Googlemap/Googlemap";
import CustomDatePicker from "../../components/layout/DatePicker/CustomDatePicker";
import TimePicker from "../../components/layout/TimePicker/TimePicker";
import BookingSummary from "../../components/layout/Booking Summary/BookingSummary";
import DateRangePicker from "../../components/layout/DateRangePicker/DateRangePicker";
import MonthRangePicker from "../../components/layout/MonthRangePicker/MonthRangePicker";

const RoomDetail = () => {
  return (
    <>
      <div className="detail-room-container mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-10 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div className="detail-room-container-left-col">
          <div className="gallery-contain">
            <GallerySwiper />
          </div>

          <div className="time-booking-container">
            <h2 className="text-2xl font-bold mb-4">Time Booking</h2>

            {/* AM Time Row */}
            <div className="time-row">
              <div className="am-label">AM</div>
              <div className="time-slot-grid">
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className="time-slot">
                    {`${i.toString().padStart(2, "0")}:00`}
                  </div>
                ))}
              </div>
            </div>

            {/* PM Time Row */}
            <div className="time-row">
              <div className="pm-label">PM</div>
              <div className="time-slot-grid">
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className="time-slot">
                    {`${(i + 12).toString().padStart(2, "0")}:00`}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="room-descriptions-container mt-4 mb-4">
            <h2 className="room-descriptions-title text-2xl font-bold mb-4">
              Room Description
            </h2>
            <ul className="room-descriptions-list-container list-disc px-8">
              <li>TV available</li>
              <li>Additional stationery if required</li>
              <li>Soundproofing and adjustable air-condition</li>
              <li>Wireless and internet access</li>
              <li>Catering, tea, coffee, water facilities available anytime</li>
            </ul>
          </div>

          <div className="room-amenities-container">
            <h2 className="text-2xl font-bold mb-4">Amenities</h2>
            <ul className="amenities-list mx-auto grid grid-cols-1 items-start gap-y-6 px-4 py-12 sm:px-6 sm:py-10 lg:max-w-7xl lg:grid-cols-2 lg:px-8 item-center">
              <li className="amenities-1 flex">
                <PiChalkboardSimple className="text-2xl" /> &nbsp; Whiteboard
              </li>
              <li className="amenities-2 flex">
                <PiNoteBlankLight className="text-2xl" /> &nbsp; Note paper
              </li>
              <li className="amenities-3 flex">
                <BsProjector className="text-2xl" /> &nbsp; Projector
              </li>
              <li className="amenities-4 flex">
                <IoCafeOutline className="text-2xl" /> &nbsp; Beverages
              </li>
            </ul>
          </div>

          <div className="map-building  ">
            <h2 className="text-2xl font-bold mb-4">Map</h2>
            <Googlemap src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6099415304884!2d106.80730807470056!3d10.841132857997573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1726955415730!5m2!1svi!2s" />
          </div>
        </div>

        <div className="detail-room-container-right-col">
          <div className="room-name-container flex items-center justify-center">
            <h1 className="room-name text-3xl font-black tracking-tight sm:text-5xl text-left">
              Room name
            </h1>
            <div className="status-badge badge badge-success text-white text-xm p-3 font-bold ml-6">
              Available
            </div>
          </div>
          <div className="type-capacity-container">
            <div className="flex justify-between font-semibold">
              <div>Type: </div>
              <div>Working Room</div>
            </div>
            <div className=" flex justify-between font-semibold">
              <div>Capacity: </div>
              <div>18 seats</div>
            </div>
          </div>

          <div className="font-semibold mb-2">Type Booking: </div>
          <div role="tablist" className="tabs tabs-lifted">
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab"
              aria-label="Hour"
              defaultChecked
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
              {/* Price section */}
              <div className="flex justify-between font-semibold items-center">
                <div>Price:</div>
                <div className="text-amber-500 text-xl font-bold">
                  300.000 VND/h
                </div>
              </div>

              {/* Remaining Time section */}
              <div className="font-semibold mt-4 mb-2">Remaining Time:</div>

              <div className="container mx-auto">
                {/* Custom Date Picker */}
                <div className="mb-4">
                  <CustomDatePicker />
                </div>

                {/* Time Picker */}
                <div className="mb-4">
                  <TimePicker />
                </div>

                {/* Discount Code Input */}
                <input
                  type="text"
                  placeholder="Discount code"
                  className="input input-bordered w-full max-w-xs mb-3"
                />

                {/* Booking Summary */}
                <BookingSummary />
              </div>
            </div>

            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab"
              aria-label="Day"
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
              <div className=" flex justify-between font-semibold items-center">
                <div>Price: </div>
                <div className="text-amber-500 text-xl font-bold">
                  1.300.000 VND/day
                </div>
              </div>
              <div className="font-semibold mt-4 mb-2">Remaining Time: </div>
              <div className="my-4">
                <DateRangePicker />
              </div>

              <input
                type="text"
                placeholder="Discount code"
                className="input input-bordered w-full max-w-xs mb-3"
              />
              <BookingSummary />
            </div>

            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab"
              aria-label="Month"
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
              <div className=" flex justify-between font-semibold items-center">
                <div>Price: </div>
                <div className="text-amber-500 text-xl font-bold">
                  10.300.000 VND/month
                </div>
              </div>
              <div className="font-semibold mt-4 mb-2">Remaining Time: </div>
              <div className="pb-4">
                <MonthRangePicker />
              </div>

              <input
                type="text"
                placeholder="Discount code"
                className="input input-bordered w-full max-w-xs mb-3"
              />
              <BookingSummary />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetail;
