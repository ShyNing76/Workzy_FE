import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TfiStatsUp } from "react-icons/tfi";
import { GoPeople, GoPerson } from "react-icons/go";
import { PiIdentificationBadge, PiBuildingsLight } from "react-icons/pi";
import { IoIosArrowRoundForward } from "react-icons/io";
import { LuCalendarCheck } from "react-icons/lu";
import { RiCoupon3Line, RiCopperCoinLine } from "react-icons/ri";
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
  getBookingDataIn6DaysAdmin,
  getRecentBooking,
  getRevenueDataIn6DaysAdmin,
  getTop5Customers,
  getTotalAmenity,
  getTotalBooking,
  getTotalBuilding,
  getTotalRavenue,
  getTotalUser,
  getTotalVoucher,
  getTotalWorkspace,
} from "../../../config/api.admin";

const StatCard = ({ icon: Icon, title, value, trend }) => (
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
      {trend && (
        <div
          className={`text-sm ${trend > 0 ? "text-green-500" : "text-red-500"}`}
        >
          {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
        </div>
      )}
    </div>
  </div>
);

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
      <div className="h-72">
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

const BookingsChart = ({ data }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h3 className="text-lg font-semibold mb-4">Bookings This Month</h3>
    <div className="h-72">
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

const BookingsList = ({ bookings }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-semibold">Recent Bookings</h3>
      <Link
        to="/admin/bookingsmanager"
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

const TopCustomers = ({ customers }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h3 className="text-lg font-semibold mb-6">Top Customers</h3>
    <div className="space-y-4">
      {customers.map((customer, idx) => (
        <div key={idx} className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center
              ${
                idx === 0
                  ? "bg-yellow-100 text-yellow-600"
                  : idx === 1
                  ? "bg-gray-100 text-gray-600"
                  : idx === 2
                  ? "bg-orange-100 text-orange-600"
                  : "bg-gray-50 text-gray-500"
              }`}
            >
              #{idx + 1}
            </div>
            <p className="font-medium">{customer.User.name}</p>
          </div>
          <div className="flex items-center text-gray-600">
            <RiCopperCoinLine className="w-5 h-5 mr-1" />
            <span>{customer.point}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const StatsOverview = ({ stats }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h3 className="text-lg font-semibold mb-4">System Overview</h3>
    <div className="grid grid-cols-2 gap-4">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-orange-100 rounded-lg">
          <PiIdentificationBadge className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Managers</p>
          <p className="text-lg font-bold">{stats.managers}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-orange-100 rounded-lg">
          <GoPerson className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Staff</p>
          <p className="text-lg font-bold">{stats.staff}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-orange-100 rounded-lg">
          <GoPeople className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Customers</p>
          <p className="text-lg font-bold">{stats.customers}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-orange-100 rounded-lg">
          <PiBuildingsLight className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Buildings</p>
          <p className="text-lg font-bold">{stats.buildings}</p>
        </div>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    revenue: 0,
    bookings: 0,
    vouchers: 0,
    managers: 0,
    staff: 0,
    customers: 0,
    amenities: 0,
    buildings: 0,
    workspaces: 0,
  });
  const [revenueData, setRevenueData] = useState([]);
  const [bookingsData, setBookingsData] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    // Fetch data using your existing API calls
    const fetchData = async () => {
      try {
        const [
          revenueRes,
          bookingsRes,
          vouchersRes,
          usersRes,
          amenitiesRes,
          buildingsRes,
          workspacesRes,
          top5CustomersRes,
          recentBookingsRes,
          revenueDataRes,
          bookingsDataRes,
        ] = await Promise.all([
          getTotalRavenue(),
          getTotalBooking(),
          getTotalVoucher(),
          getTotalUser(),
          getTotalAmenity(),
          getTotalBuilding(),
          getTotalWorkspace(),
          getTop5Customers(),
          getRecentBooking(),
          getRevenueDataIn6DaysAdmin(),
          getBookingDataIn6DaysAdmin(), // You'll need to implement this API call
        ]);

        setStats({
          revenue: revenueRes.data,
          bookings: bookingsRes.data,
          vouchers: vouchersRes.data,
          managers: usersRes.data.manager,
          staff: usersRes.data.staff,
          customers: usersRes.data.customer,
          amenities: amenitiesRes.data,
          buildings: buildingsRes.data,
          workspaces: workspacesRes.data,
        });

        setTopCustomers(top5CustomersRes.data || []);
        setRecentBookings(recentBookingsRes.data || []);
        setRevenueData(revenueDataRes.data || []);
        setBookingsData(bookingsDataRes.data || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN").format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to WORKZY Admin
        </h1>
        <p className="text-gray-600 mt-2">Here's what's happening today</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={TfiStatsUp}
          title="Total Revenue"
          value={`${formatCurrency(stats.revenue)}đ`}
          trend={12}
        />
        <StatCard
          icon={LuCalendarCheck}
          title="Total Bookings"
          value={stats.bookings}
          trend={8}
        />
        <StatCard
          icon={RiCoupon3Line}
          title="Active Vouchers"
          value={stats.vouchers}
          trend={-3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <RevenueChart data={revenueData} />
        </div>
        <div>
          <TopCustomers customers={topCustomers} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <BookingsChart data={bookingsData} />
        </div>
        <div>
          <StatsOverview stats={stats} />
        </div>
      </div>

      <div>
        <BookingsList bookings={recentBookings} />
      </div>
    </div>
  );
};

export default AdminDashboard;
