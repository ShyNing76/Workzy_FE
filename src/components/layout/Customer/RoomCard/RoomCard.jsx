import React from "react";
import { BiArea } from "react-icons/bi";
import { MdOutlineChair } from "react-icons/md";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../context/priceFormat";

const RoomCard = ({ workspace, image }) => {
  return (
    <Link
      to={`/location/building/${workspace.workspace_id}`}
      className="block transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="overflow-hidden rounded-lg bg-white shadow-lg">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={workspace.workspace_name}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-800 shadow">
              {workspace?.WorkspaceType?.workspace_type_name}
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-4">
          {/* Title */}
          <h2 className="mb-2 text-xl font-bold text-gray-800">
            {workspace.workspace_name}
          </h2>

          {/* Details */}
          <div className="mb-4 grid grid-cols-2 gap-2">
            <div className="flex items-center text-gray-600">
              <BiArea className="mr-2 text-xl text-amber-500" />
              <span>{workspace.area} m²</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MdOutlineChair className="mr-2 text-xl text-amber-500" />
              <span>{workspace.capacity} seats</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline space-x-2 rounded-lg bg-orange-50 p-3">
            <span className="text-sm font-medium text-gray-600">From</span>
            <span className="text-xl font-bold text-amber-600">
              {formatCurrency(workspace.price_per_hour)}
            </span>
            <span className="text-sm text-gray-600">/hour</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
