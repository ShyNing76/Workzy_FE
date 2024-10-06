import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { getLatLonFromAddress } from "../../../../config/api";

// Xóa icon mặc định của Leaflet (nếu không muốn custom)
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const MapLocation = (props) => {
  const { dataBuilding } = props;

  const [buildingsWithCoords, setBuildingsWithCoords] = useState([]);
  const defaultPosition = [15.9266657, 107.9650855]; // Vị trí mặc định cho map

  useEffect(() => {
    const fetchCoordinates = async (buildings) => {
      if (buildings.length > 0) {
        const updatedBuildings = await Promise.all(
          buildings.map(async (building) => {
            // Gọi API lấy tọa độ
            const coords = await getLatLonFromAddress(building.address);

            if (coords) {
              return {
                ...building,
                latitude: coords.lat,
                longitude: coords.lon,
              };
            } else {
            }
            return null;
          })
        );

        // Lọc bỏ các building không có tọa độ
        setBuildingsWithCoords(updatedBuildings.filter((b) => b !== null));
      } else {
        setBuildingsWithCoords([]);
      }
    };

    // Kiểm tra nếu có dữ liệu building thì gọi hàm fetchCoordinates
    if (dataBuilding) {
      console.log("Data Building before fetching coordinates:", dataBuilding); // Log toàn bộ data

      fetchCoordinates(dataBuilding);
    }

    console.log("dataBuilding updated:", dataBuilding);
  }, [dataBuilding]);

  return (
    <MapContainer
      center={defaultPosition}
      zoom={6}
      style={{ height: "100vh", width: "100%" }}
    >
      {/* Lớp bản đồ nền từ OpenStreetMap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Vẽ các điểm Marker cho các tòa nhà */}
      {buildingsWithCoords.length > 0 ? (
        buildingsWithCoords.map((building, index) => (
          <Marker
            key={`building-${index}`}
            position={[building.latitude, building.longitude]}
          >
            <Popup>
              <b>{building.building_name}</b>
              <br />
              {building.address}
              <br />
              <a
                target="_blank"
                href="https://maps.app.goo.gl/fKFitckfdfeZJLij7"
              >
                Show Location
              </a>
            </Popup>
          </Marker>
        ))
      ) : (
        <div>No buildings with coordinates found.</div>
      )}
    </MapContainer>
  );
};

export default MapLocation;
