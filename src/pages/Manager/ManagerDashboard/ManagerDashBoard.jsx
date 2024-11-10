import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { TfiStatsUp } from "react-icons/tfi";
import { GoPerson } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { PiEmpty } from "react-icons/pi";
import { LuCalendarCheck } from "react-icons/lu";
import { IoIosArrowRoundForward } from "react-icons/io";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { format } from "date-fns";

import {
  getBuildingById,
  getTotalRevenue,
  getTotalBooking,
  getTotalWorkspace,
  getInUseWorkspace,
  getEmptyWorkspace,
  getRecentBooking,
} from "../../../config/apiManager.js";
import {
  getBookingDataIn6Days,
  getRevenueDataIn6Days,
} from "../../../config/api.admin.js";

// Reusable StatCard Component
const StatCard = ({ icon: Icon, title, value }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-orange-100 rounded-lg">
          <Icon className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
      </div>
    </div>
  </div>
);

// Revenue Chart Component
const RevenueChart = ({ data }) => {
  const formatYAxis = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value;
  };

  const formatTooltipValue = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 16, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="date" tickMargin={8} />
            <YAxis tickFormatter={formatYAxis} tickMargin={8} width={60} />
            <Tooltip
              formatter={(value) => [formatTooltipValue(value), "Revenue"]}
            />
            <Area
              type="monotone"
              dataKey="total_price"
              stroke="#f59e0b"
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Bookings Chart Component
const BookingsChart = ({ data }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h3 className="text-lg font-semibold mb-4">Bookings Overview</h3>
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total_booking" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// BookingsList Component
const BookingsList = ({ bookings }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-semibold">Recent Bookings</h3>
      <Link
        to="/bookings"
        className="flex items-center text-orange-600 hover:text-orange-700"
      >
        View all
        <IoIosArrowRoundForward className="w-5 h-5 ml-1" />
      </Link>
    </div>
    <div className="space-y-4">
      {bookings.map((booking, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <GoPerson className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="font-semibold">{booking.Customer.User.name}</p>
              <p className="text-sm text-gray-600">
                {booking.Workspace.workspace_name}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">
              {format(new Date(booking.createdAt), "dd MMM yyyy")}
            </p>
            <p className="text-sm text-gray-600">
              {booking.BookingStatuses[0]?.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Workspace Stats Component
const WorkspaceStats = ({ totalWorkspace, inUseWorkspace, emptyWorkspace }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h3 className="text-lg font-semibold mb-4">Workspace Overview</h3>
    <div className="grid grid-cols-3 gap-4">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-orange-100 rounded-lg">
          <RxDashboard className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-lg font-bold">{totalWorkspace}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-orange-100 rounded-lg">
          <RxDashboard className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">In Use</p>
          <p className="text-lg font-bold">{inUseWorkspace}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-orange-100 rounded-lg">
          <PiEmpty className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Empty</p>
          <p className="text-lg font-bold">{emptyWorkspace}</p>
        </div>
      </div>
    </div>
  </div>
);

const ManagerDashBoard = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { building_id } = useParams();
  const [buildingName, setBuildingName] = useState("");
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalBooking, setTotalBooking] = useState(0);
  const [totalWorkspace, setTotalWorkspace] = useState(0);
  const [totalInUseWorkspace, setTotalInUseWorkspace] = useState(0);
  const [totalEmptyWorkspace, setTotalEmptyWorkspace] = useState(0);
  const [recentBookings, setRecentBookings] = useState([]);
  const [revenueDataInChart, setRevenueDataInChart] = useState([]);
  const [bookingDataInChart, setBookingDataInChart] = useState([]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN").format(value);
  };

  useEffect(() => {
    const fetchBuildingData = async () => {
      try {
        const buildingDetails = getBuildingById(building_id);
        const totalRevenue = getTotalRevenue(building_id);
        const totalBooking = getTotalBooking(building_id);
        const totalWorkspace = getTotalWorkspace(building_id);
        const inUseWorkspace = getInUseWorkspace(building_id);
        const emptyWorkspace = getEmptyWorkspace(building_id);
        const revenueData = getRevenueDataIn6Days(building_id);
        const bookingData = getBookingDataIn6Days(building_id);

        const responses = await Promise.all([
          buildingDetails,
          totalRevenue,
          totalBooking,
          totalWorkspace,
          inUseWorkspace,
          emptyWorkspace,
          revenueData,
          bookingData,
        ]);

        setBuildingName(responses[0].data.building_name);
        setTotalRevenue(responses[1].data);
        setTotalBooking(responses[2].data);
        setTotalWorkspace(responses[3].data);
        setTotalInUseWorkspace(responses[4].data);
        setTotalEmptyWorkspace(responses[5].data);
        setRevenueDataInChart(responses[6].data);
        setBookingDataInChart(responses[7].data);
      } catch (error) {
        console.error("Error fetching building data", error);
        setError(error);
      }
    };

    if (building_id) {
      fetchBuildingData();
      const intervalId = setInterval(fetchBuildingData, 60000);
      return () => clearInterval(intervalId);
    }
  }, [building_id]);

  useEffect(() => {
    const fetchRecentBookings = async () => {
      try {
        const response = await getRecentBooking(building_id);
        if (response && response.data) {
          setRecentBookings(response.data);
        }
      } catch (error) {
        console.error("Error fetching recent bookings:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (building_id) {
      fetchRecentBookings();
      const intervalId = setInterval(fetchRecentBookings, 60000);
      return () => clearInterval(intervalId);
    }
  }, [building_id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          {buildingName} Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Here's what's happening today</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        <StatCard
          icon={TfiStatsUp}
          title="Total Revenue"
          value={`${formatCurrency(totalRevenue)}đ`}
        />
        <StatCard
          icon={LuCalendarCheck}
          title="Total Bookings"
          value={totalBooking}
        />
        <StatCard
          icon={RxDashboard}
          title="Total Workspaces"
          value={totalWorkspace}
        />
        <WorkspaceStats
          totalWorkspace={totalWorkspace}
          inUseWorkspace={totalInUseWorkspace}
          emptyWorkspace={totalEmptyWorkspace}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-4">
          <RevenueChart data={revenueDataInChart} />
        </div>
        <div></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-4">
          <BookingsChart data={bookingDataInChart} />
        </div>
      </div>

      <div>
        <BookingsList bookings={recentBookings} />
      </div>
    </div>
  );
};

export default ManagerDashBoard;
