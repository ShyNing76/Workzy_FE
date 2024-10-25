import React, { useState } from "react";

import { CiCircleInfo } from "react-icons/ci";
import { HiOutlineX } from "react-icons/hi";
import { FaBell, FaRegCheckCircle } from "react-icons/fa";
import { IoAlertCircleOutline } from "react-icons/io5";
import { CiClock1 } from "react-icons/ci";
import { CiStar } from "react-icons/ci";

const NotificationItem = ({
  type,
  title,
  description,
  time,
  isRead,
  onDelete,
  onMarkAsRead,
}) => {
  const getIcon = () => {
    switch (type) {
      case "info":
        return <CiCircleInfo className="w-6 h-6 text-blue-500" />;
      case "success":
        return <FaRegCheckCircle className="w-6 h-6 text-green-500" />;
      case "warning":
        return <IoAlertCircleOutline className="w-6 h-6 text-yellow-500" />;
      case "urgent":
        return <CiClock1 className="w-6 h-6 text-red-500" />;
      default:
        return <FaBell className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div
      className={`flex items-start p-4 mb-3 rounded-lg border ${
        isRead ? "bg-gray-50" : "bg-white"
      } hover:bg-gray-50 transition-colors`}
    >
      <div className="flex-shrink-0 mt-1">{getIcon()}</div>

      <div className="ml-4 flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-gray-600 mt-1">{description}</p>
            <span className="text-sm text-gray-500 mt-2 block">{time}</span>
          </div>

          <div className="flex items-center space-x-2">
            {!isRead && (
              <button
                onClick={onMarkAsRead}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                Đánh dấu đã đọc
              </button>
            )}
            <button
              onClick={onDelete}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <HiOutlineX className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "info",
      title: "Cập nhật hệ thống",
      description: "Hệ thống sẽ được nâng cấp vào ngày 25/10/2024",
      time: "5 phút trước",
      isRead: false,
    },
    {
      id: 2,
      type: "success",
      title: "Giao dịch thành công",
      description: "Đơn hàng #123456 đã được xử lý thành công",
      time: "1 giờ trước",
      isRead: false,
    },
    {
      id: 3,
      type: "warning",
      title: "Cảnh báo bảo mật",
      description: "Phát hiện đăng nhập từ thiết bị lạ",
      time: "2 giờ trước",
      isRead: true,
    },
    {
      id: 4,
      type: "urgent",
      title: "Thanh toán đến hạn",
      description: "Vui lòng thanh toán hóa đơn trước ngày 30/10/2024",
      time: "1 ngày trước",
      isRead: false,
    },
  ]);

  const [filter, setFilter] = useState("all");

  const handleDelete = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.isRead;
    if (filter === "read") return notif.isRead;
    return true;
  });

  return (
    <div className="max-w-5xl container mx-auto my-20 p-8 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Thông báo</h1>
          <p className="text-gray-600">
            {notifications.filter((n) => !n.isRead).length} thông báo chưa đọc
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <select
            className="border rounded-lg px-3 py-2 text-gray-700"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value="unread">Chưa đọc</option>
            <option value="read">Đã đọc</option>
          </select>

          <button
            onClick={handleMarkAllAsRead}
            className="text-orange-500 hover:text-orange-600"
          >
            Đánh dấu tất cả đã đọc
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <CiStar className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-gray-600">Không có thông báo nào</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              {...notification}
              onDelete={() => handleDelete(notification.id)}
              onMarkAsRead={() => handleMarkAsRead(notification.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
