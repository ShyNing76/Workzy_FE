import React from "react";
import "./Notification.scss";
import { CiCircleInfo } from "react-icons/ci";
import { format } from "date-fns";
import { FaRegCheckCircle } from "react-icons/fa";

const NotificationItem = ({ description, createdAt, type }) => {
  const getIcon = () => {
    switch (type) {
      case "booking":
        return <FaRegCheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <CiCircleInfo className="w-5 h-5 text-gray-500" />;
    }
  };

  const formattedDate = format(new Date(createdAt), "dd/MM/yyyy HH:mm");

  return (
    <div className="flex items-start p-4 mb-3 rounded-lg border bg-white hover:bg-gray-50 transition-colors min-w-[1000px]">
      <div className="flex-shrink-0 mt-1">{getIcon()}</div>

      <div className="ml-4 flex-grow">
        <div className="flex flex-col">
          <p className="text-gray-700">{description}</p>
          <span className="text-sm text-gray-500 mt-1">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
