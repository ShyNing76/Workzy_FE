import { Link, Outlet, useLocation } from "react-router-dom";
import { TfiStatsUp } from "react-icons/tfi";
import { GoPeople } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { PiIdentificationBadge } from "react-icons/pi";
import { GoPerson } from "react-icons/go";
import { PiBuildingsLight } from "react-icons/pi";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { LuCalendarCheck } from "react-icons/lu";
import { RiCoupon3Line } from "react-icons/ri";
import { IoIosArrowRoundForward } from "react-icons/io";
import { RiCopperCoinLine } from "react-icons/ri";
import React, { PureComponent } from 'react';
import { format, set } from 'date-fns';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "./AdminDashboardPage.scss";
import { useState, useEffect } from "react";

import { getTotalRavenue } from "../../../config/api.admin";
import { getTotalBooking } from "../../../config/api.admin";
import { getTotalVoucher } from "../../../config/api.admin";
import { getTotalUser } from "../../../config/api.admin";
import { getTotalAmenity } from "../../../config/api.admin";
import { getTotalBuilding } from "../../../config/api.admin";
import { getTotalWorkspace } from "../../../config/api.admin";
import { getRecentBooking } from "../../../config/api.admin";
import { getTop5Customers } from "../../../config/api.admin";

const data = [
  { name: '1', uv: 4000, pv: 2400, amt: 2400, },
  { name: '2', uv: 3000, pv: 1398, amt: 2210, },
  { name: '3', uv: 2000, pv: 9800, amt: 2290, },
  { name: '4', uv: 2780, pv: 3908, amt: 2000, },
  { name: '5', uv: 1890, pv: 4800, amt: 2181, },
  { name: '6', uv: 2390, pv: 3800, amt: 2500, },
  { name: '7', uv: 3490, pv: 4300, amt: 2100, },
  { name: '8', uv: 3490, pv: 4300, amt: 2100, },
  { name: '9', uv: 3490, pv: 4300, amt: 2100, },
  { name: '10', uv: 3490, pv: 4300, amt: 2100, },
  { name: '11', uv: 3490, pv: 4300, amt: 2100, },
  { name: '12', uv: 3490, pv: 4300, amt: 2100, },
];

const data2 = [
  { name: '1', uv: 4000, pv: 2400, amt: 2400, },
  { name: '2', uv: 3000, pv: 1398, amt: 2210, },
  { name: '3', uv: 2000, pv: 9800, amt: 2290, },
  { name: '4', uv: 2780, pv: 3908, amt: 2000, },
  { name: '5', uv: 1890, pv: 4800, amt: 2181, },
  { name: '6', uv: 2390, pv: 3800, amt: 2500, },
  { name: '7', uv: 3490, pv: 4300, amt: 2100, },
  { name: '8', uv: 3490, pv: 4300, amt: 2100, },
  { name: '9', uv: 3490, pv: 4300, amt: 2100, },
  { name: '10', uv: 3490, pv: 4300, amt: 2100, },
  { name: '11', uv: 3490, pv: 4300, amt: 2100, },
  { name: '12', uv: 3490, pv: 4300, amt: 2100, },
];

const AdminDashboard = () => {
  const [error, setError] = useState(null); // State lỗi
  const [loading, setLoading] = useState(true); // State loading
  const [ravenue, setRavenue] = useState();
  const [booking, setBookings] = useState();
  const [voucher, setVoucher] = useState();
  const [manager, setManager] = useState();
  const [staff, setStaff] = useState();
  const [customer, setCustomer] = useState();
  const [building, setBuilding] = useState();
  const [amenity, setAmenity] = useState();
  const [workspace, setWorkspace] = useState();
  const [top5Customers, setTop5Customers] = useState([]);
  const [top5Bookings, setTop5Bookings] = useState([]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  }

  const fetchTotalRevenue = async () => {
    try {
      const response = await getTotalRavenue();
      setRavenue(response.data); // Access the "data" field and update state
    } catch (error) {
      console.error('Error fetching total revenue:', error);
    }
  };

  const fetchTotalBooking = async () => {
    try {
      const response = await getTotalBooking();
      setBookings(response.data); // Access the "data" field and update state
    } catch (error) {
      console.error('Error fetching total revenue:', error);
    }
  };

  const fetchTotalVoucher = async () => {
    try {
      const response = await getTotalVoucher();
      setVoucher(response.data); // Access the "data" field and update state
    } catch (error) {
      console.error('Error fetching total revenue:', error);
    }
  }

  const fetchTotalUser = async () => {
    try {
      const response = await getTotalUser();
      setManager(response.data.manager); // Access the "data" field and update state
      setStaff(response.data.staff); // Access the "data" field and update state
      setCustomer(response.data.customer); // Access the "data" field and update state
    } catch (error) {
      console.error('Error fetching total revenue:', error);
    }
  }

  const fetchTotalAmenity = async () => {
    try {
      const response = await getTotalAmenity();
      setAmenity(response.data); // Access the "data" field and update state
    } catch (error) {
      console.error('Error fetching total revenue:', error)
    }
  }

  const fetchTotalBuilding = async () => {
    try {
      const response = await getTotalBuilding();
      setBuilding(response.data); // Access the "data" field and update state
    } catch (error) {
      console.error('Error fetching total revenue:', error)
    }
  }

  const fetchTotalWorkspace = async () => {
    try {
      const response = await getTotalWorkspace();
      setWorkspace(response.data); // Access the "data" field and update state
    } catch (error) {
      console.error('Error fetching total revenue:', error)
    }
  }

  const fetchTop5Bookings = async () => {
    try {
      const response = await getRecentBooking();
      if (response && response.data && Array.isArray(response.data)) {
        setTop5Bookings(response.data);
      } else {
        setTop5Bookings([]); // Initialize as an empty array if data is not as expected
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTop5Customers = async () => {
    try {
      const response = await getTop5Customers();
      if (response && response.data && Array.isArray(response.data)) {
        setTop5Customers(response.data);
      } else {
        setTop5Customers([]); // Initialize as an empty array if data is not as expected
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchTotalRevenue();
      await fetchTotalBooking();
      await fetchTotalVoucher();
      await fetchTotalUser();
      await fetchTotalAmenity();
      await fetchTotalBuilding();
      await fetchTotalWorkspace();
      await fetchTop5Bookings();
      await fetchTop5Customers();
    };
  
    fetchData();
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);


  return (
    <div className="max-w-screen *:box-border w-full h-full flex flex-col overflow-hidden">
      <h1 className="text-4xl font-black mt-5 ml-6">Welcome to WORKZY Admin</h1>
      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">General Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* General Overview */}
          <div className="card shadow-xl">
            <div className="card-body">
              <div className="flex flex-2">
                <TfiStatsUp className="mt-1 size-5"/>
                <div className="stat-title ml-2 text-xl">Total Revenue in Month</div>
              </div>
              <div className="stat-value text-5xl">{formatCurrency(ravenue)}đ</div>
            </div>
          </div>

          <div className="card shadow-xl">
            <div className="card-body">
              <div className="flex flex-2">
                <LuCalendarCheck className="mt-1 size-5"/>
                <div className="stat-title ml-2 text-xl">Total Bookings</div>
              </div>
              <div className="stat-value text-5xl">{booking}</div>
            </div>
          </div>

          <div className="card shadow-xl">
            <div className="card-body">
              <div className="flex flex-2">
                <RiCoupon3Line className="mt-1 size-5"/>
                <div className="stat-title ml-2 text-xl">Total Vouchers</div>
              </div>
              <div className="stat-value text-5xl">{voucher}</div>
            </div>
          </div>

          <div className="card shadow-xl">
            <div className="card-body">
              <div className="flex flex-2">
                <PiIdentificationBadge className="mt-1 size-5"/>
                <div className="stat-title ml-2 text-xl">Total Managers</div>
              </div>
              <div className="stat-value text-5xl">{manager}</div>
            </div>
          </div>

          <div className="card shadow-xl">
            <div className="card-body">
              <div className="flex flex-2">
                <GoPerson className="mt-1 size-5"/>
                <div className="stat-title ml-2 text-xl">Total Staffs</div>
              </div>
              <div className="stat-value text-5xl">{staff}</div>
            </div>
          </div>

          <div className="card shadow-xl">
            <div className="card-body">
              <div className="flex flex-2">
                <GoPeople className="mt-1 size-5"/>
                <div className="stat-title ml-2 text-xl">Total Customers</div>
              </div>
              <div className="stat-value text-5xl">{customer}</div>
            </div>
          </div>

          <div className="card shadow-xl">
            <div className="card-body">
              <div className="flex flex-2">
                <IoExtensionPuzzleOutline className="mt-1 size-5"/>
                <div className="stat-title ml-2 text-xl">Total Amenities</div>
              </div>
              <div className="stat-value text-5xl">{amenity}</div>
            </div>
          </div>

          <div className="card shadow-xl">
            <div className="card-body">
              <div className="flex flex-2">
                <PiBuildingsLight className="mt-1 size-5"/>
                <div className="stat-title ml-2 text-xl">Total Buildings</div>
              </div>
              <div className="stat-value text-5xl">{building}</div>
            </div>
          </div>

          <div className="card shadow-xl">
            <div className="card-body">
              <div className="flex flex-2">
                <RxDashboard className="mt-1 size-5"/>
                <div className="stat-title ml-2 text-xl">Total Workspaces</div>
              </div>
              <div className="stat-value text-5xl">{workspace}</div>
            </div>
          </div>
        </div>

        {/* Revenue & Guest */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Revenue & Booking Analysis</h2>
          <div className="flex w-full flex-col lg:flex-row">
            <div className="rounded-box grid h-32 flex-grow">
            <p className="text-xl font-semibold mb-4">Revenue</p>
              <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart width={730} height={250} data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="divider"></div>
            
            <div className="rounded-box grid h-32 flex-grow">
              <p className="text-xl font-semibold mb-4">Guest Bookings</p>
              <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart width={730} height={250} data={data2}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-96">
          <h2 className="text-2xl font-bold mb-4">Bookings & Customers</h2>
          <div className="flex w-full">
            <div className="rounded-box grid flex-grow place-items-stretch">
              <p className="text-xl font-semibold mb-4">Recent Bookings</p>
              <div className="bg-base-200 p-4 rounded-lg shadow-lg">
                {top5Bookings.map((booking, index) => (
                  <div key={index} className="border-b py-2 flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{booking.Customer.User.name}</p>
                      <p>{booking.Workspace.workspace_name}</p>
                      <p className="text-sm">{booking.Workspace.WorkspaceType.workspace_type_name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{format(new Date(booking.createdAt), "dd/MM/yyyy HH:mm:ss")}</p>
                      {booking.BookingStatuses.map((status, idx) => (
                        <p key={idx}>{status.status}</p>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="mt-7 text-right">
                  <Link to="/admin/bookingsmanager" className= {`tab ${location.pathname === '/admin/bookingsmanager' ? 'active' : ''}`}>
                    <button className="btn btn-neutral btn-sm">
                      See more<IoIosArrowRoundForward className="size-5" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="divider-horizontal"></div>

            <div className="rounded-box grid h-20 flex-grow place-items-stretch">
              <p className="text-xl font-semibold mb-4">Top 5 VIP Customer</p>
              <div className="bg-base-200 p-4 rounded-lg shadow-lg">
                <table className="table-auto w-full">
                  <tbody>
                    {top5Customers.map((customer, index) => (
                      <tr key={index}>
                        <td
                          className="px-4 py-2 text-3xl font-bold"
                          style={{
                            color: index === 0 ? '#d4af37' : index === 1 ? 'silver' : index === 2 ? '#cd7f32' : 'inherit',
                          }}
                        >
                          #{index + 1}
                        </td>
                        <td className="px-4 py-2 text-2xl font-semibold">{customer.User.name}</td>
                        <td className="px-4 py-2 text-right text-xl font-medium">{customer.point} ZyPoint</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
