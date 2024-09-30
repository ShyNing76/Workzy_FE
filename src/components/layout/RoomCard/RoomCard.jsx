import React from "react";
import { BiArea } from "react-icons/bi";
import { MdOutlineChair } from "react-icons/md";
import { Link } from "react-router-dom";
import Slide from "../ServiceSwiper/Slide";
import "./RoomCard.scss";

const RoomCard = ({ roomName, roomType, area, chairs, price, image }) => {
  return (
    <>
      <div className="room-list-container">
        <div className="room-list-page-1 mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8 item-center">
          <div className="room-list-item">
            <div className="room-list-item-container flex w-full flex-col lg:flex-row">
              <div className="room-card card card-compact bg-base-100 w-72 shadow-xl">
                <figure>
                  <img
                    style={{ height: "200px", width: "300px" }}
                    src={image}
                    alt={roomName}
                  />
                </figure>
                <div className="room-title font-black text-2xl sm:px-4 mt-2">
                  <h1>{roomName}</h1>
                </div>
                <div className="room-detail-container flex-col lg:flex-row justify-between sm:px-4">
                  <div className="room-type mb-4">
                    <p>{roomType}</p>
                  </div>
                  <div className="room-detail grid grid-cols-2 mb-4">
                    <p className="detail-1 flex">
                      <BiArea className="text-2xl" /> &nbsp; {area} m2
                    </p>
                    <p className="detail-2 flex">
                      <MdOutlineChair className="text-2xl" /> &nbsp; {chairs}
                      chairs
                    </p>
                  </div>
                </div>
                <div className="bg-slate-100 rounded-b-lg">
                  <div className="room-price flex p-3">
                    <p className="font-bold text-xl text-amber-500">
                      From {price.toLocaleString()}
                    </p>
                    <p className="font-bold text-xl ">&nbsp;VNĐ/h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomCard;
