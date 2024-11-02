import React, { useEffect, useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { FaRegCheckCircle, FaRegHeart } from "react-icons/fa";
import { format } from "date-fns";
import Pagination from "../../../components/layout/Shared/Pagination/Pagination";
import NotificationItem from "../../../components/layout/Customer/Notification/NotificationItem";
import { getNotificationOfCustomer } from "../../../config/api";
import { Link } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";

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
    <div className="max-w-5xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg w-full h-96">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">{notifications.count} notifications</p>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.rows > 0 ? (
          notifications.rows.map((notification) => (
            <NotificationItem
              key={notification.notification_id}
              {...notification}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="mb-4">
              <IoIosNotifications className="mx-auto h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-1">
              Your notification is empty
            </h3>
            <p className="text-gray-500 mb-4">Enjoy your booking with Workzy</p>
            <Link to="/location" className="btn btn-neutral">
              Browse Workspaces
            </Link>
          </div>
        )}
      </div>

      <div className="mt-4">
        {totalPages > 0 && (
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
