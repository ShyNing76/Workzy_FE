import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { FiClock, FiCalendar } from "react-icons/fi";
import { MdOutlineWorkspaces } from "react-icons/md";
import Hourly from "../../../components/layout/staff/building/RoomRow/Hourly";
import Daily from "../../../components/layout/staff/building/RoomRow/Daily";
import Monthly from "../../../components/layout/staff/building/RoomRow/Monthly";
import {
  getWorkspaceByBuildingId,
  getBookingWorkspace,
} from "../../../config/api.staff";

const convertToVietnamTime = (date) => {
  return new Date(date).toLocaleString("sv-SE", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
};

const WorkspaceStatus = () => {
  const { buildingId } = useOutletContext();
  const [workspaces, setWorkspaces] = useState([]);
  const [workspaceTypes, setWorkspaceTypes] = useState([]);
  const [bookingsCache, setBookingsCache] = useState({});
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [currentDate, setCurrentDate] = useState(selectedDate);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("hourly");
  const [workspaceType, setWorkspaceType] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!buildingId) return;

    const fetchWorkspaces = async () => {
      try {
        const response = await getWorkspaceByBuildingId(buildingId);
        if (response?.err === 0) {
          setWorkspaces(response.data);
          const types = [
            ...new Set(
              response.data.map((ws) => ws.WorkspaceType.workspace_type_name)
            ),
          ];
          setWorkspaceTypes(types);
          localStorage.setItem("workspaces", JSON.stringify(response.data));
        }
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      }
    };

    fetchWorkspaces();
  }, [buildingId]);

  const fetchBookingsForWorkspaces = useCallback(
    async () => {
      if (!workspaces.length || !buildingId) return;

      try {
        const updatedWorkspaces = await Promise.all(
          workspaces.map(async (workspace) => {
            const cacheKey = `${workspace.workspace_id}_${selectedDate}`;

            if (bookingsCache[cacheKey]) {
              return { ...workspace, bookings: bookingsCache[cacheKey] };
            }

            const response = await getBookingWorkspace(
              buildingId,
              workspace.workspace_id,
              selectedDate
            );
            const bookings =
              response?.data?.rows.map((booking) => {
                const startTime = convertToVietnamTime(booking.start_time_date);
                const endTime = convertToVietnamTime(booking.end_time_date);
                return {
                  startTime: new Date(startTime),
                  endTime: new Date(endTime),
                  status: booking.BookingStatuses[0]?.status,
                  customerName: booking.Customer?.User?.name,
                };
              }) || [];

            setBookingsCache((prevCache) => ({
              ...prevCache,
              [cacheKey]: bookings,
            }));
            return { ...workspace, bookings };
          })
        );

        setWorkspaces(updatedWorkspaces);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    },
    [workspaces, selectedDate, buildingId]
  );

  useEffect(() => {
    fetchBookingsForWorkspaces();
  }, [fetchBookingsForWorkspaces]);

  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    let date;
    if (selectedType === "monthly") {
      const [year, month] = dateValue.split("-");
      date = new Date(year, month);
      setSelectedYear(year);
    } else {
      date = new Date(dateValue);
    }

    if (!isNaN(date.getTime())) {
      const dateString = date.toISOString().split("T")[0];
      if (dateString !== currentDate) {
        setBookingsCache({});
        setCurrentDate(dateString);
        setSelectedDate(dateString);
      }
    } else {
      console.error("Invalid date selected");
    }
  };

  const handleWorkspaceClick = useCallback((workspace) => {
    setSelectedWorkspace(workspace);
    setIsModalOpen(true);
  }, []);

  const renderTable = () => {
    const filteredWorkspaces = workspaceType
      ? workspaces.filter(
          (ws) => ws.WorkspaceType.workspace_type_name === workspaceType
        )
      : workspaces;

    switch (selectedType) {
      case "hourly":
        return (
          <Hourly
            selectedDate={currentDate}
            selectedStatus={selectedStatus}
            workspaces={filteredWorkspaces}
            onWorkspaceClick={handleWorkspaceClick}
          />
        );
      case "daily":
        return (
          <Daily
            selectedDate={currentDate}
            selectedStatus={selectedStatus}
            selectedType={selectedType}
            workspaces={filteredWorkspaces}
            onWorkspaceClick={handleWorkspaceClick}
          />
        );
      case "monthly":
        return (
          <Monthly
            selectedDate={currentDate}
            selectedStatus={selectedStatus}
            workspaces={filteredWorkspaces}
            onWorkspaceClick={handleWorkspaceClick}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-base-content">
          Workspace Status
        </h2>
      </div>

      {/* Controls Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Workspace Type Select */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold">Workspace Type</span>
          </label>
          <div className="join w-full">
            <div className="btn btn-sm join-item">
              <MdOutlineWorkspaces className="h-4 w-4" />
            </div>
            <select 
              className="select select-bordered select-sm w-full join-item"
              value={workspaceType}
              onChange={(e) => setWorkspaceType(e.target.value)}
            >
              <option value="">All Types</option>
              {workspaceTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* View Type Select */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold">View Type</span>
          </label>
          <div className="join w-full">
            <div className="btn btn-sm join-item">
              <FiClock className="h-4 w-4" />
            </div>
            <select
              className="select select-bordered select-sm w-full join-item"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>

        {/* Date Picker */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold">Select Date</span>
          </label>
          <div className="join w-full">
            <div className="btn btn-sm join-item">
              <FiCalendar className="h-4 w-4" />
            </div>
            {selectedType === "monthly" ? (
              <input
                type="month"
                className="input input-bordered input-sm w-full join-item"
                value={currentDate.slice(0, 7)}
                onChange={handleDateChange}
              />
            ) : (
              <input
                type="date"
                className="input input-bordered input-sm w-full join-item"
                value={currentDate}
                onChange={handleDateChange}
              />
            )}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            {renderTable()}
          </div>
        </div>
      </div>

      {/* Status Note */}
      <div className="mt-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title text-sm mb-4">Status Note</h3>
            <div className="flex flex-wrap gap-6 justify-center">
              {[
                { status: "Available", color: "white", border: true },
                { status: "Booked", color: "#90EE90" },
                { status: "Usage", color: "#ADD8E6" },
                { status: "Damaged-Payment", color: "#F95454" }
              ].map((label, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor: label.color,
                      border: label.border ? '1px solid currentColor' : 'none'
                    }}
                  ></div>
                  <span className="text-sm">{label.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceStatus;