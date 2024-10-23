import { Link, Outlet, useLocation } from "react-router-dom";
import { TfiStatsUp } from "react-icons/tfi";
import { GoPeople } from "react-icons/go";
import { IoIosStarOutline } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { PiWrench } from "react-icons/pi";
import { LuCalendarCheck } from "react-icons/lu";
import { PiEmpty } from "react-icons/pi";
import { IoIosArrowRoundForward } from "react-icons/io";
import React, { PureComponent } from 'react';
import { format } from 'date-fns';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import io from "socket.io-client";
import { useState, useEffect } from "react";

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

const bookings = [
  {
    name: 'Le Van A',
    room: 'Room no.01',
    type: 'Double POD',
    time: '12:45',
    status: 'Booked',
  },
  {
    name: 'Le Van A',
    room: 'Room no.01',
    type: 'Double POD',
    time: '12:45',
    status: 'Booked',
  },
];

const topWorkspaces = [
  { rating: 5.0, name: 'Double POD' },
  { rating: 4.9, name: 'Double POD' },
  { rating: 4.8, name: 'Double POD' },
  { rating: 4.7, name: 'Double POD' },
  { rating: 4.6, name: 'Double POD' },
];

const ManagerDashBoard = () => {
  return (
    <div className="max-w-screen *:box-border w-full h-full flex flex-col overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">General Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* General Overview */}
            <div className="card shadow-xl">
              <div className="card-body">
                <div className="flex flex-2">
                  <TfiStatsUp className="size-5"/>
                  <div className="stat-title ml-2">Total Revenue in Month</div>
                </div>
                <div className="stat-value text-4xl">12000000</div>
              </div>
            </div>

            <div className="card shadow-xl">
              <div className="card-body">
                <div className="flex flex-2">
                  <LuCalendarCheck className="size-5"/>
                  <div className="stat-title ml-2">Total Bookings</div>
                </div>
                <div className="stat-value text-5xl">120</div>
              </div>
            </div>

            <div className="card shadow-xl">
              <div className="card-body">
                <div className="flex flex-2">
                  <GoPeople className="size-5"/>
                  <div className="stat-title ml-2">Total Customer</div>
                </div>
                <div className="stat-value text-5xl">120</div>
              </div>
            </div>

            <div className="card shadow-xl">
              <div className="card-body">
                <div className="flex flex-2">
                  <IoIosStarOutline className="size-5"/>
                  <div className="stat-title ml-2">Average Rates</div>
                </div>
                <div className="stat-value text-5xl">4.8</div>
              </div>
            </div>

            <div className="card shadow-xl">
              <div className="card-body">
                <div className="flex flex-2">
                  <RxDashboard className="size-5"/>
                  <div className="stat-title ml-2">Total Workspaces</div>
                </div>
                <div className="stat-value text-5xl">120</div>
              </div>
            </div>

            <div className="card shadow-xl">
              <div className="card-body">
                <div className="flex flex-2">
                  <RxDashboard className="size-5"/>
                  <div className="stat-title ml-2">In Use Workspaces</div>
                </div>
                <div className="stat-value text-5xl">12</div>
              </div>
            </div>

            <div className="card shadow-xl">
              <div className="card-body">
                <div className="flex flex-2">
                  <PiWrench className="mt-1 size-5"/>
                  <div className="stat-title ml-2">In Mantenance <br /> Workspaces</div>
                </div>
                <div className="stat-value text-5xl">1</div>
              </div>
            </div>

            <div className="card shadow-xl">
              <div className="card-body">
                <div className="flex flex-2">
                  <PiEmpty className="mt-1 size-5"/>
                  <div className="stat-title ml-2">Empty Workspaces</div>
                </div>
                <div className="stat-value text-5xl">12</div>
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
                {bookings.map((booking, index) => (
                  <div key={index} className="border-b py-2 flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{booking.name}</p>
                      <p>{booking.room}</p>
                      <p className="text-sm">{booking.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{booking.time}</p>
                      <p>{booking.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          <div className="divider-horizontal"></div>
            
          <div className="rounded-box grid h-20">
            <p className="text-xl font-semibold mb-4">Top 5 Workspaces by Customer’s review</p>
            <div className="bg-base-200 p-4 rounded-lg shadow-lg place-content-stretch" style={{ minWidth: '550px' }}>
              <table className="table-auto w-full">
                <tbody>
                  {topWorkspaces.map((workspace, index) => (
                    <tr key={index} className="border-b">
                      <td
                        className="px-4 py-2 text-3xl font-bold"
                          style={{
                            color: index === 0 ? '#d4af37' : index === 1 ? 'silver' : index === 2 ? '#cd7f32' : 'inherit',
                          }}
                      >
                        {workspace.rating.toFixed(1)}
                      </td>
                      <td className="px-4 py-2 text-2xl font-semibold text-left">
                        {workspace.name}
                      </td>
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
  )
}

export default ManagerDashBoard
