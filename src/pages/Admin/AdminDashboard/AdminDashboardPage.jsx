import { Link, Outlet, useLocation } from "react-router-dom";
import { TfiStatsUp } from "react-icons/tfi";
import { GoPeople } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { PiEmpty } from "react-icons/pi";

import "./AdminDashboardPage.scss";

const AdminDashboard = () => {
  return (
    <>
      <div className="page-content-container">
        <h1 className="text-4xl font-black mb-4">Dashboard (coming soon)</h1>

        <div className="statistic-container item-center">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure">
                <TfiStatsUp />
              </div>
              <div className="stat-title">Total Ravenue</div>
              <div className="stat-value">150.000.000</div>
              <div className="stat-desc">Sep 1st - Oct 1st</div>
            </div>

            <div className="stat">
              <div className="stat-figure">
                <GoPeople />
              </div>
              <div className="stat-title">Guest Booked</div>
              <div className="stat-value">200</div>
              <div className="stat-desc">↗︎ 40</div>
            </div>

            <div className="stat">
              <div className="stat-figure">
                <RxDashboard />
              </div>
              <div className="stat-title">Rooms In Use</div>
              <div className="stat-value">30</div>
              <div className="stat-desc"></div>
            </div>

            <div className="stat">
              <div className="stat-figure">
                <PiEmpty />
              </div>
              <div className="stat-title">Empty rooms</div>
              <div className="stat-value">95</div>
              <div className="stat-desc"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
