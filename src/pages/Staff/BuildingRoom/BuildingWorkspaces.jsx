import React, { useState } from "react";
import RoomControls from "../../../components/layout/staff/building/RoomControls/RoomControls";
import "./BuildingWorkspaces.scss";

const BuildingWorkspaces = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("hourly");
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <div>
      <RoomControls
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <br />
    </div>
  );
};

export default BuildingWorkspaces;
