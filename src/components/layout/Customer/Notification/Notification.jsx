import React from "react";
import "./Notification.scss";
import { CiCircleInfo } from "react-icons/ci";
import { HiOutlineX } from "react-icons/hi";

const Notification = (props) => {
  const { title, description, onDelete } = props;

  return (
    <>
      <div className="notification-container">
        <div className="notification-icon">
          <CiCircleInfo />
        </div>

        <div className="notification-content">
          <h2 className="notification-title">{title}</h2>
          <p className="notification-description">{description}</p>
        </div>

        <button className="notification-delete-btn" onClick={onDelete}>
          <HiOutlineX />
        </button>
      </div>
    </>
  );
};

export default Notification;
