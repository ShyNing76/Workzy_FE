import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import Hourly from "../../../components/layout/staff/building/RoomRow/Hourly";
import Daily from "../../../components/layout/staff/building/RoomRow/Daily";
import Monthly from "../../../components/layout/staff/building/RoomRow/Monthly";
import {
  getWorkspaceByBuildingId,
  getBookingWorkspace,
} from "../../../config/api.staff";
import "./BuildingWorkspaces.scss";

const convertToVietnamTime = (date) => {
  return new Date(date).toLocaleString("sv-SE", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
};

const BuildingWorkspaces = () => {
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

  // Fetch workspaces based on buildingId
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

  // Memoize bookingsCache to avoid re-fetching
  const fetchBookingsForWorkspaces = useCallback(
    async () => {
      if (!workspaces.length || !buildingId) return;

      try {
        const updatedWorkspaces = await Promise.all(
          workspaces.map(async (workspace) => {
            const cacheKey = `${workspace.workspace_id}_${selectedDate}`;

            // Kiểm tra cache trước khi gọi API
            if (bookingsCache[cacheKey])
              return { ...workspace, bookings: bookingsCache[cacheKey] };

            // Gọi API nếu cache không có
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

            // Cập nhật cache
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
    [workspaces, selectedDate, buildingId] // Chỉ để lại các dependency cần thiết
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

  const renderStatusLabels = () => {
    const statusLabels = [
      { status: "Available", color: "white" },
      { status: "Booked", color: "#90EE90" },
      { status: "Usage", color: "#ADD8E6" },
      { status: "Damaged-payment", color: "#F95454" },
    ];

    return (
      <div className="status-labels">
        {statusLabels.map((label, index) => (
          <div key={index} className="status-label">
            <div
              className="circle"
              style={{
                backgroundColor: label.color,
                border:
                  label.status === "Available" ? "1px solid black" : "none",
              }}
            ></div>
            <span>{label.status}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="room-controls-wrapper m-6" style={{ width: "100%" }}>
      <div className="room-controls">
        <div className="control-row">
          <div className="control">
            <label htmlFor="workspace-type-select">Select Workspace Type</label>
            <select
              id="workspace-type-select"
              value={workspaceType}
              onChange={(e) => setWorkspaceType(e.target.value)}
            >
              <option value="">All Workspace Types</option>
              {workspaceTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="control">
            <label htmlFor="type-select">Select Booking Type</label>
            <select
              id="type-select"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="control">
            <label htmlFor="date-picker">
              Select{" "}
              {selectedType === "hourly"
                ? "Date"
                : selectedType === "daily"
                ? "Month and Year"
                : "Year"}
            </label>
            {selectedType === "monthly" ? (
              <input
                type="month"
                id="date-picker"
                value={currentDate.slice(0, 7)}
                onChange={handleDateChange}
              />
            ) : (
              <input
                type="date"
                id="date-picker"
                value={currentDate}
                onChange={handleDateChange}
              />
            )}
          </div>
        </div>
        <div className="room-tables">{renderTable()}</div>
        {renderStatusLabels()}
      </div>
    </div>
  );
};

export default BuildingWorkspaces;
