import { Link, Outlet, useLocation } from "react-router-dom";
import { TfiStatsUp } from "react-icons/tfi";
import { GoPeople } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { PiEmpty } from "react-icons/pi";
// import { BookingTrendsChart } from "../../../components/layout/ChartGraph/BookingTrendsChart";
// import { Bar } from 'react-chartjs-2';

import "./AdminDashboardPage.scss";
import { useState } from "react";

const AdminDashboard = () => {

  const [data, setData] = useState(null)
  const [options, setOptions] = useState(null)

  const FinancialReport = () => {
    const data = {
      labels: ['Day', 'Week', 'Month', 'Year'],
      datasets: [
        {
          label: 'Revenue (VND)',
          data: [5000000, 20000000, 80000000, 900000000],
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
      ],
    };
  
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
  }

  return (
    <div className="flex h-screen">

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="text-2xl font-bold mb-4">Gernaral Overview</div>
        <div>
          
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Cards for stats */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex flex-2">
                <TfiStatsUp className="mt-1"/>
                <div className="stat-title ml-2">Total Ravenue</div>
              </div>
              <div className="stat-value">15.000.000</div>
              <span className="stat-desc">Sep 1st - Oct 1st</span>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex flex-2">
                <GoPeople className="mt-1"/>
                <div className="stat-title ml-2">Guest Booked</div>
              </div>
              <div className="stat-value">200</div>
              <span className="stat-desc">↗︎ 40</span>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex flex-2">
                <RxDashboard className="mt-1"/>
                <div className="stat-title ml-2">Rooms In Use</div>
              </div>
              <div className="stat-value">30</div>
              <span className="stat-desc"></span>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex flex-2">
                <PiEmpty className="mt-1"/>
                <div className="stat-title ml-2">Empty rooms</div>
              </div>
              <div className="stat-value">95</div>
              <span className="stat-desc"></span>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex flex-2">
                <PiEmpty className="mt-1"/>
                <div className="stat-title ml-2">Under Maintenance</div>
              </div>
              <div className="stat-value">15</div>
              <span className="stat-desc"></span>
            </div>
          </div>

        </div>

        

        {/* Graphs section */}
        <div className="mt-6">
          <h3 className="text-xl font-bold">Booking Trends</h3>
          {/* <BookingTrendsChart />  */}
          {/* <Bar data={data} options={options} /> */}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
