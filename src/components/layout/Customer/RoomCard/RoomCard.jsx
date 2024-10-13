import React from "react";
import { BiArea } from "react-icons/bi";
import { MdOutlineChair } from "react-icons/md";
import { Link } from "react-router-dom";
import Slide from "../ServiceSwiper/Slide";
import "./RoomCard.scss";
import { formatCurrency } from "../../../context/priceFormat";

const RoomCard = ({ workspace, image }) => {
  return (
    <>
      <div className=" room-list-container">
        <div className="room-list-page-1 mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:mx-6 sm:my-10 lg:max-w-7xl  item-center">
          <Link to={`/location/building/${workspace.workspace_id}`}>
            <div className="room-list-item">
              <div className="room-list-item-container flex w-full flex-col lg:flex-row">
                <div className="room-card card card-compact bg-base-100 w-72 shadow-xl">
                  <figure>
                    <img
                      style={{ height: "200px", width: "300px" }}
                      src={image}
                      alt={workspace.workspace_name}
                    />
                  </figure>
                  <div className="room-title font-black text-2xl sm:px-4 mt-2">
                    <h1>{workspace.workspace_name}</h1>
                  </div>
                  <div className="room-detail-container flex-col lg:flex-row justify-between sm:px-4">
                    <div className="room-type mb-4">
                      <p>{workspace?.WorkspaceType?.workspace_type_name}</p>
                    </div>
                    <div className="room-detail grid grid-cols-2 mb-4">
                      <p className="detail-1 flex">
                        <BiArea className="text-2xl" /> &nbsp; {workspace.area}{" "}
                        m2
                      </p>
                      <p className="detail-2 flex">
                        <MdOutlineChair className="text-2xl" /> &nbsp;{" "}
                        {workspace.capacity} seats
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-100 rounded-b-lg">
                    <div className="room-price flex p-3">
                      <p className="font-bold text-xl  text-amber-500">
                        <span className="text-black">From</span>{" "}
                        {formatCurrency(workspace.price_per_hour)}/h
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RoomCard;
