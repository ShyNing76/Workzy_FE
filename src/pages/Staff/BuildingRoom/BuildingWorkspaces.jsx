import React, { useEffect, useState, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import Hourly from '../../../components/layout/staff/building/RoomRow/Hourly';
import Daily from '../../../components/layout/staff/building/RoomRow/Daily';
import Monthly from '../../../components/layout/staff/building/RoomRow/Monthly';
import { getWorkspaceByBuildingId, getBookingWorkspace } from '../../../config/api.staff';
import "./BuildingWorkspaces.scss";

// Hàm chuyển đổi thời gian về múi giờ Việt Nam
const convertToVietnamTime = (date) => {
  return new Date(date).toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' });
};

const BuildingWorkspaces = () => {
  const { buildingId } = useOutletContext();
  const [workspaces, setWorkspaces] = useState([]);
  const [workspaceTypes, setWorkspaceTypes] = useState([]);
  const [bookingsCache, setBookingsCache] = useState({});
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentDate, setCurrentDate] = useState(selectedDate);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('hourly');
  const [workspaceType, setWorkspaceType] = useState('');
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
          const types = [...new Set(response.data.map(ws => ws.WorkspaceType.workspace_type_name))];
          setWorkspaceTypes(types);
          localStorage.setItem('workspaces', JSON.stringify(response.data));
        }
      } catch (error) {
        console.error('Error fetching workspaces:', error);
      }
    };

    fetchWorkspaces();
  }, [buildingId]);

  // Fetch bookings for each workspace
  const fetchBookingsForWorkspaces = useCallback(async () => {
    if (workspaces.length === 0) return;

    try {
      const updatedWorkspaces = await Promise.all(
        workspaces.map(async (workspace) => {
          const cacheKey = `${workspace.workspace_id}_${selectedDate}`;
          if (bookingsCache[cacheKey]) return { ...workspace, bookings: bookingsCache[cacheKey] };

          const response = await getBookingWorkspace(buildingId, workspace.workspace_id, selectedDate);
          const bookings = response?.data?.rows.map(booking => {
            const startTime = convertToVietnamTime(booking.start_time_date);
            const endTime = convertToVietnamTime(booking.end_time_date);

            // Kiểm tra thời gian để xử lý các booking từ 00:00 đến 07:00
            const vietnamStartTime = new Date(startTime);
            const startHour = vietnamStartTime.getHours();
            if (startHour >= 0 && startHour < 7) {
              // Booking trong khoảng từ 00:00 đến 07:00 vẫn giữ nguyên hiển thị cho đúng ngày
              vietnamStartTime.setDate(vietnamStartTime.getDate() + 1);
            }

            return {
              startTime: vietnamStartTime,
              endTime: new Date(endTime),
              status: booking.BookingStatuses[0]?.status,
              customerName: booking.Customer?.User?.name,
            };
          }) || [];

          setBookingsCache(prevCache => {
            const newCache = { ...prevCache, [cacheKey]: bookings };
            // Giới hạn kích thước cache, chỉ lưu tối đa 50 items
            if (Object.keys(newCache).length > 50) {
              delete newCache[Object.keys(newCache)[0]];
            }
            return newCache;
          });

          return { ...workspace, bookings };
        })
      );
      setWorkspaces(updatedWorkspaces);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  }, [workspaces, selectedDate, bookingsCache, buildingId]);

  // Fetch bookings when selectedDate or workspaces change
  useEffect(() => {
    fetchBookingsForWorkspaces();
  }, [fetchBookingsForWorkspaces, selectedDate]);

  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    let date;
    console.log(dateValue)
    if (selectedType === 'monthly') {
      const [year, month] = dateValue.split('-');
      date = new Date(year, month - 1);
      setSelectedYear(year);
    } else {
      date = new Date(dateValue);
    }

    if (!isNaN(date.getTime())) { // Kiểm tra nếu ngày hợp lệ
      const dateString = date.toISOString().split('T')[0];
      if (dateString !== currentDate) {
        setBookingsCache({});
        setCurrentDate(dateString);
        setSelectedDate(dateString);
      }
    } else {
      console.error('Invalid date selected');
    }

    const dateString = date.toISOString().split('T')[0];
    if (dateString !== currentDate) {
      setCurrentDate(dateString);
      setSelectedDate(dateString);
    }
  };

  const handleWorkspaceClick = useCallback((workspace) => {
    setSelectedWorkspace(workspace);
    setIsModalOpen(true);
  }, []);

  const renderTable = () => {
    const filteredWorkspaces = workspaceType
      ? workspaces.filter(ws => ws.WorkspaceType.workspace_type_name === workspaceType)
      : workspaces;

    switch (selectedType) {
      case 'hourly':
        return <Hourly selectedDate={currentDate} selectedStatus={selectedStatus} workspaces={filteredWorkspaces} onWorkspaceClick={handleWorkspaceClick} />;
      case 'daily':
        return <Daily selectedDate={currentDate} selectedStatus={selectedStatus} selectedType={selectedType} workspaces={filteredWorkspaces} onWorkspaceClick={handleWorkspaceClick} />;
      case 'monthly':
        return <Monthly selectedStatus={selectedStatus} workspaces={filteredWorkspaces} onWorkspaceClick={handleWorkspaceClick} />;
      default:
        return null;
    }
  };

  const renderStatusLabels = () => {
    const statusLabels = [
      { status: 'Available', color: 'white' },
      { status: 'Booked', color: '#90EE90' },
      { status: 'Usage', color: '#ADD8E6' },
      { status: 'Damaged-payment', color: '#F95454' },
    ];

    return (
      <div className="status-labels">
        {statusLabels.map((label, index) => (
          <div key={index} className="status-label">
            <div className="circle" style={{ backgroundColor: label.color }}></div>
            <span>{label.status}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="room-controls-wrapper" style={{ width: '100%' }}>
      <div className="room-controls">
        <div className="control-row">
          <div className="control">
            <label htmlFor="workspace-type-select">Select Workspace Type</label>
            <select id="workspace-type-select" value={workspaceType} onChange={(e) => setWorkspaceType(e.target.value)}>
              <option value="">All Workspace Types</option>
              {workspaceTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="control">
            <label htmlFor="type-select">Select Booking Type</label>
            <select id="type-select" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="control">
            <label htmlFor="date-picker">
              Select {selectedType === 'hourly' ? 'Date' : selectedType === 'daily' ? 'Month and Year' : 'Year'}
            </label>
            {selectedType === 'monthly' ? (
              <input type="month" id="date-picker" value={currentDate.slice(0, 7)} onChange={handleDateChange} />
            ) : (
              <input type="date" id="date-picker" value={currentDate} onChange={handleDateChange} />
            )}
          </div>
        </div>
      <div className="room-tables">
        {renderTable()}
      </div>
      {renderStatusLabels()} 
    </div>
    </div>
  );
};

export default BuildingWorkspaces;
