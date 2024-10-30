import React, { useEffect, useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { FaRegCheckCircle } from "react-icons/fa";
import { format } from "date-fns";
import Pagination from "../../../components/layout/Shared/Pagination/Pagination";
import NotificationItem from "../../../components/layout/Customer/Notification/NotificationItem";
import { getNotificationOfCustomer } from "../../../config/api";

const ITEMS_PER_PAGE = 5;

const NotificationsPage = () => {
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        setLoading(true);
        const res = await getNotificationOfCustomer(ITEMS_PER_PAGE, page);

        if (res && res.data && res.err === 0) {
          setNotifications(res.data);
        } else {
          setNotifications({});
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotification();
  }, [page, setPage]);

  // Tính toán số trang
  const totalPages = Math.ceil(notifications.count / ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">{notifications.count} notifications</p>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.rows &&
          notifications.rows.map((notification) => (
            <NotificationItem
              key={notification.notification_id}
              {...notification}
            />
          ))}
      </div>

      <div className="mt-4">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
};

export default NotificationsPage;
