import { Link, Outlet, useLocation } from "react-router-dom";
import { TfiStatsUp } from "react-icons/tfi";
import { GoPeople } from "react-icons/go";
import { IoIosStarOutline } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { PiWrench } from "react-icons/pi";
import { LuCalendarCheck } from "react-icons/lu";
import { PiEmpty } from "react-icons/pi";
import { GoPerson } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import React, { PureComponent } from 'react';
import { format } from 'date-fns';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { getBuildingById } from "../../../config/apiManager.js";
import { getTotalRevenue } from "../../../config/apiManager.js";
import { getTotalBooking } from "../../../config/apiManager.js";
import { getTotalWorkspace } from "../../../config/apiManager.js";
import { getInUseWorkspace } from "../../../config/apiManager.js";
import { getEmptyWorkspace } from "../../../config/apiManager.js";
import { getRecentBooking } from "../../../config/apiManager.js";

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

const ManagerDashBoard = () => {
  const [error, setError] = useState(null); // State lỗi
  const [loading, setLoading] = useState(true); // State loading
  const { building_id } = useParams(); // Get the building_id from route params
  const [buildingName, setBuildingName] = useState('');
  const [totalRevenue, setTotalRevenue] = useState(''); // Initialize with sample data
  const [totalBooking, setTotalBooking] = useState(''); // Initialize with sample data
  const [totalWorkspace, setTotalWorkspace] = useState(''); // Initialize with sample data
  const [totalInUseWorkspace, setTotalInUseWorkspace] = useState(''); // Initialize with sample data
  const [totalEmptyWorkspace, setTotalEmptyWorkspace] = useState(''); // Initialize with sample data
  const [top5Bookings, setTop5Bookings] = useState([]); // Initialize with sample data

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  }

  useEffect(() => {
    const fetchBuildingData = async () => {
      try {
        const buildingDetails = getBuildingById(building_id);
        const totalRevenue = getTotalRevenue(building_id);
        const totalBooking = getTotalBooking(building_id);
        const totalWorkspace = getTotalWorkspace(building_id);
        const inUseWorkspace = getInUseWorkspace(building_id);
        const emptyWorkspace = getEmptyWorkspace(building_id);
  
        const responses = await Promise.all([
          buildingDetails,
          totalRevenue,
          totalBooking,
          totalWorkspace,
          inUseWorkspace,
          emptyWorkspace
        ]);
  
        setBuildingName(responses[0].data.building_name);
        setTotalRevenue(responses[1].data);
        setTotalBooking(responses[2].data);
        setTotalWorkspace(responses[3].data);
        setTotalInUseWorkspace(responses[4].data);
        setTotalEmptyWorkspace(responses[5].data);
  
      } catch (error) {
        console.error("Error fetching building data", error);
      }
    };
  
    if (building_id) {
      fetchBuildingData();
    }
  }, [building_id]);

  useEffect(() => {
    const fetchTop5Bookings = async () => {
      try {
        const response = await getRecentBooking(building_id);
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
    }
    if (building_id) {
      fetchTop5Bookings();
    }
  }, [building_id]);

  return (
    <div className="max-w-screen *:box-border w-full h-full flex flex-col overflow-hidden">
      <div className="flex flex-1">
        <h1 className="text-4xl font-black mt-5 ml-6">{buildingName} Dashboard</h1> {/* Display building name */}
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">General Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* General Overview */}
            <div className="card shadow-xl">
              <div className="card-body">
                <div className="flex items-center">
                  <TfiStatsUp className="size-5"/>
                  <div className="stat-title ml-2">Total Revenue in Month</div>
                </div>
                <div className="stat-value text-4xl">{formatCurrency(totalRevenue)}đ</div>
              </div>
            </div>

            <div className="card shadow-xl">
              <div className="card-body">
                <div className="flex flex-2">
                  <LuCalendarCheck className="size-5"/>
                  <div className="stat-title ml-2">Total Bookings</div>
                </div>
                <div className="stat-value text-4xl">{totalBooking}</div>
              </div>
            </div>

            <div className="card shadow-xl">
              <div className="card-body">
                <div className="flex flex-2">
                  <RxDashboard className="size-5"/>
                  <div className="stat-title ml-2">Total Workspaces</div>
                </div>
                <div className="stat-value text-4xl">{totalWorkspace}</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className="card shadow-xl">
              <div className="card-body">
                <div className="flex flex-2">
                  <RxDashboard className="size-5"/>
                  <div className="stat-title ml-2">In Use Workspaces</div>
                </div>
                <div className="stat-value text-4xl">{totalInUseWorkspace}</div>
              </div>
            </div>

            <div className="card shadow-xl">
              <div className="card-body">
                <div className="flex flex-2">
                  <PiEmpty className="mt-1 size-5"/>
                  <div className="stat-title ml-2">Empty Workspaces</div>
                </div>
                <div className="stat-value text-4xl">{totalEmptyWorkspace}</div>
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
              <p className="text-xl font-semibold mb-4">Recent overview</p>
              <div className="bg-base-200 flex-grow p-4 rounded-lg shadow-lg">
                {top5Bookings.map((booking, index) => (
                  <div key={index} className="border-b py-2 mb-1 flex justify-between items-center">
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
              </div>
            </div>
        </div>
      </div>
    </main>
    </div>
  )
}

export default ManagerDashBoard
