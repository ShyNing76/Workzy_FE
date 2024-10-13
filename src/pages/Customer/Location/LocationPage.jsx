import React, { useEffect, useState } from "react";
import BuildingCard from "../../../components/layout/Customer/Building Card/BuildingCard";
import Googlemap from "../../../components/layout/Customer/Googlemap/Googlemap";
import "./LocationPage.scss";
import { Link, useSearchParams } from "react-router-dom";
import LocationFilter from "../../../components/layout/Customer/LocationFilter/LocationFilter";
import { getBuildingFromSearch } from "../../../config/api";
import MapLocation from "../../../components/layout/Customer/MapLocation/MapLocation";
import noDataIcon from "../../../assets/no-data.png";
import PerfectScrollbar from "react-perfect-scrollbar";

const LocationPage = () => {
  // Get from API
  const [buildingImage, setBuildingImage] = useState([]);

  // request param in react router dom
  const [searchParams] = useSearchParams();
  const [dataBuilding, setDataBuilding] = useState([]);

  // Get location and workspaceType from param in URL took from search bar
  const location = searchParams.get("location") || "";
  const workSpaceType = searchParams.get("workspaceType") || "";

  // Const isLoading
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Tạo query string từ các giá trị location và workspaceType
    // const queryParams = new URLSearchParams();

    let queryString = "?";

    if (location) {
      queryString += `location=${location}`;
    }
    if (workSpaceType) {
      queryString += `${
        location ? "&" : ""
      }workspace_type_name=${workSpaceType}`;
    }

    const fetchBuildingLocation = async () => {
      try {
        setIsLoading(true);
        const res = await getBuildingFromSearch(queryString);

        // Kiểm tra kết quả trả về và cập nhật state
        if (res && res.data && res.err === 0) {
          const buildingData = res?.data;
          setDataBuilding(buildingData);
        } else {
          setDataBuilding([]);
        }
      } catch (error) {
        console.error("Error fetching building data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBuildingLocation();
  }, [location, workSpaceType]);

  const [hoveredBuilding, setHoveredBuilding] = useState(null);

  return (
    <>
      {/* <div className="header-location">
        <div className="title">
          <span className="text-amber-500">Our</span> Location
        </div>
        <div className="back-title">
          To find out which details best suit you and your company's needs,
          please see more details of the branches here.
        </div>
      </div> */}

      {!isLoading ? (
        <>
          <div>
            <LocationFilter location={location} workSpaceType={workSpaceType} />
          </div>

          <div className="building-container">
            <div className="building-list">
              {dataBuilding && dataBuilding.length > 0 ? (
                <PerfectScrollbar>
                  {dataBuilding.map((building, index) => (
                    <BuildingCard
                      key={`Building-${building.building_id}`}
                      dataBuilding={dataBuilding[index]}
                      onHover={() => setHoveredBuilding(building)}
                    />
                  ))}
                </PerfectScrollbar>
              ) : (
                <div className="no-data">
                  <img
                    src={noDataIcon}
                    alt="No Data"
                    className="no-data-icon"
                  />
                  <p>No Building Found</p>
                </div>
              )}
            </div>
            <div className="map-container">
              {/* <Googlemap src={googleMapsEmbedLink} /> */}
              <MapLocation
                dataBuilding={dataBuilding}
                hoveredBuilding={hoveredBuilding}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </>
  );
};

export default LocationPage;
