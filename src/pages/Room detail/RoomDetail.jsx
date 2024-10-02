import React, { useState } from "react";
import { PiChalkboardSimple } from "react-icons/pi";
import { PiNoteBlankLight } from "react-icons/pi";
import { BsProjector } from "react-icons/bs";
import { IoCafeOutline } from "react-icons/io5";
import GallerySwiper from "../../components/layout/GallerySwiper/GallerySwiper";
import "./RoomDetail.scss";
import Googlemap from "../../components/layout/Googlemap/Googlemap";
import BookingRoom from "../../components/layout/BookingRoom/BookingRoom";

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
          <BookingRoom />
        </div>
      </div>
    </>
  );
};

export default RoomDetail;
