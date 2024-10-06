import React, { useEffect, useState } from "react";
import BuildingCard from "../../../components/layout/Customer/Building Card/BuildingCard";
import Googlemap from "../../../components/layout/Customer/Googlemap/Googlemap";
import "./LocationPage.scss";
import { Link, useSearchParams } from "react-router-dom";
import LocationFilter from "../../../components/layout/Customer/LocationFilter/LocationFilter";
import { getBuildingFromSearch } from "../../../config/api";
import MapLocation from "../../../components/layout/Customer/MapLocation/MapLocation";
import noDataIcon from "../../../assets/no-data.png";

const LocationPage = () => {
  // const Buildings = [
  //   {
  //     city: "TP. HỒ CHÍ MINH",
  //     locations: [
  //       {
  //         name: "WORKZY Công Nghệ Cao",
  //         address:
  //           "Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh",
  //         googleMapsEmbedLink:
  //           "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.4287485048703!2d106.80730807508958!3d10.841127589311627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e1!3m2!1svi!2s!4v1726936398545!5m2!1svi!2s",
  //       },
  //       {
  //         name: "WORKZY Nhà Văn Hóa",
  //         address:
  //           "Lưu Hữu Phước Tân Lập, Khu phố, Dĩ An, Bình Dương, Việt Nam",
  //         googleMapsEmbedLink:
  //           "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.9779058595473!2d106.79815067509004!3d10.87514208927968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a6b19d6763%3A0x143c54525028b2e!2zTmjDoCBWxINuIGjDs2EgU2luaCB2acOqbiBUUC5IQ00!5e1!3m2!1svi!2s!4v1726936985311!5m2!1svi!2s",
  //       },
  //     ],
  //   },

  //   {
  //     city: "Hà Nội",
  //     locations: [
  //       {
  //         name: "WORKZY Hòa Lạc",
  //         address:
  //           "Khu Công Nghệ Cao Hòa Lạc, km 29, Đại lộ, Thăng Long, Hà Nội, Việt Nam",
  //         googleMapsEmbedLink:
  //           "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.3031724570537!2d105.5227142753006!3d21.012416680632796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abc60e7d3f19%3A0x2be9d7d0b5abcbf4!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgSMOgIE7hu5lp!5e1!3m2!1svi!2s!4v1726937026839!5m2!1svi!2s",
  //       },
  //     ],
  //   },
  // ];

  // Get from API
  const [googleMapsEmbedLink, setGoogleMapsEmbedLink] = useState(
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.4287485048703!2d106.80730807508958!3d10.841127589311627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e1!3m2!1svi!2s!4v1726936398545!5m2!1svi!2s"
  );
  const [buildingImage, setBuildingImage] = useState([]);

  // request param in react router dom
  const [searchParams] = useSearchParams();
  const [dataBuilding, setDataBuilding] = useState([]);

  // Get location and workspaceType from param in URL took from search bar
  const location = searchParams.get("location") || "";
  const workSpaceType = searchParams.get("workspaceType") || "";

  useEffect(() => {
    // Tạo query string từ các giá trị location và workspaceType
    // const queryParams = new URLSearchParams();

    let queryString = "?";

    if (location) {
      queryString += `location=${location}`;
    }
    if (workSpaceType) {
      queryString += `${location ? "&" : ""}workspaceType=${workSpaceType}`;
    }

    const fetchBuildingLocation = async () => {
      try {
        const res = await getBuildingFromSearch(queryString);

        // Kiểm tra kết quả trả về và cập nhật state
        if (res && res.data && res.err === 0) {
          const buildingData = res?.data?.rows;
          setDataBuilding(buildingData);
        } else {
          setDataBuilding([]);
        }
      } catch (error) {
        console.error("Error fetching building data:", error);
      }
    };

    fetchBuildingLocation();
  }, [location, workSpaceType]);

  const [hoveredLocation, setHoveredLocation] = useState(googleMapsEmbedLink);

  return (
    <>
      <div className="header-location">
        <div className="title">
          <span className="text-amber-500">Our</span> Location
        </div>
        <div className="back-title">
          To find out which details best suit you and your company's needs,
          please see more details of the branches here.
        </div>
      </div>

      <div>
        <LocationFilter location={location} workSpaceType={workSpaceType} />
      </div>

      <div className="building-container">
        <div className="building-list">
          {dataBuilding && dataBuilding.length > 0 ? (
            dataBuilding.map((building, index) => (
              <BuildingCard
                key={`Building-${index}`}
                name={building.building_name}
                address={building.address}
                onHover={() => setHoveredLocation(building)}
              />
            ))
          ) : (
            <div className="no-data">
              <img src={noDataIcon} alt="No Data" className="no-data-icon" />
              <p>No Building Found</p>
            </div>
          )}
        </div>
        <div className="map-container">
          {/* <Googlemap src={googleMapsEmbedLink} /> */}
          <MapLocation dataBuilding={dataBuilding} />
        </div>
      </div>
    </>
  );
};

export default LocationPage;
