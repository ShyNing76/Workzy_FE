import React, { useEffect, useState } from "react";
import { PiMonitor } from "react-icons/pi";
import GallerySwiper from "../../../components/layout/Customer/GallerySwiper/GallerySwiper";
import "./RoomDetail.scss";
import Googlemap from "../../../components/layout/Customer/Googlemap/Googlemap";
import BookingRoom from "../../../components/layout/Customer/BookingRoom/BookingRoom";
import { useParams } from "react-router-dom";
import {
  getWorkSpaceAmenitiesById,
  getWorkSpaceById,
  getWorkSpaceTypeNameById,
} from "../../../config/api";
import { toast } from "react-toastify";
import { RiHomeWifiLine } from "react-icons/ri";
import { LiaFaxSolid } from "react-icons/lia";
import { TbHomeOff } from "react-icons/tb";

const RoomDetail = () => {
  const { roomid } = useParams();
  const [roomData, setRoomData] = useState("");
  const [workSpaceTypeName, setWorkSpaceTypeName] = useState("");
  const [workSpaceAmenities, setWorkSpaceAmenities] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  // fetch room data
  useEffect(() => {
    const fetchWorkspaceData = async () => {
      try {
        setIsLoading(true);
        const res = await getWorkSpaceById(roomid);

        if (res && res.data && res.err === 0) {
          setRoomData(res.data); // Set the room data
        } else {
          navigate("/404");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkspaceData();
  }, [roomid]);

  // fetch workspace type data based on roomData
  useEffect(() => {
    const fetchWorkSpaceTypeName = async () => {
      if (roomData && roomData.workspace_type_id) {
        try {
          const res = await getWorkSpaceTypeNameById(
            roomData.workspace_type_id
          );

          if (res && res.data && res.err === 0) {
            setWorkSpaceTypeName(res.data.workspace_type_name); // Set workspace type name
          } else {
            toast.error("Failed to fetch workspace type");
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    };

    const fetchWorkSpaceAmenities = async () => {
      if (roomData && roomData.workspace_id) {
        try {
          const res = await getWorkSpaceAmenitiesById(roomData.workspace_id);

          if (res && res.data && res.err === 0) {
            setWorkSpaceAmenities(res.data); // Set workspace type name
          } else {
            setWorkSpaceAmenities([]);
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    };

    fetchWorkSpaceAmenities();
    fetchWorkSpaceTypeName();
  }, [roomData]); // Trigger this effect when roomData changes

  const getAmenityIcon = (amenityName) => {
    switch (amenityName) {
      case "Moniter Machine":
        return <PiMonitor className="text-2xl mr-2" />;
      case "Fax Machine":
        return <LiaFaxSolid className="text-2xl mr-2" />;
      case "Printer Machine":
        return <PiPrinter className="text-2xl mr-2" />;
      default:
        return <RiHomeWifiLine className="text-2xl mr-2" />; // Default icon
    }
  };

  return (
    <>
      {!isLoading ? (
        <div className="detail-room-container mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-10 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div className="detail-room-container-left-col">
            <div className="gallery-contain">
              <GallerySwiper />
            </div>

            <div className="time-booking-container">
              <h2 className="text-2xl font-bold mb-4">Time Booking</h2>

              {/* AM Time Row */}
              <div className="time-row">
                <div className="am-label">AM</div>
                <div className="time-slot-grid">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} className="time-slot">
                      {`${i.toString().padStart(2, "0")}:00`}
                    </div>
                  ))}
                </div>
              </div>

              {/* PM Time Row */}
              <div className="time-row">
                <div className="pm-label">PM</div>
                <div className="time-slot-grid">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} className="time-slot">
                      {`${(i + 12).toString().padStart(2, "0")}:00`}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="room-descriptions-container mt-4 mb-4">
              <h2 className="room-descriptions-title text-2xl font-bold mb-4">
                Room Description
              </h2>
              <div className="room-descriptions-list-container list-disc px-8">
                {roomData?.description || "No Description"}
              </div>
            </div>

            <div className="room-amenities-container">
              <h2 className="text-2xl font-bold mb-4">Amenities</h2>
              <ul className="amenities-list mx-auto grid grid-cols-1 items-start gap-y-6 px-4 py-12 sm:px-6 sm:py-10 lg:max-w-7xl lg:grid-cols-2 lg:px-8 item-center">
                {workSpaceAmenities.length > 1 ? (
                  workSpaceAmenities.map((amenities, index) => (
                    <li key={`amenities-${index}`} className="amenities-1 flex">
                      {getAmenityIcon(amenities)} &nbsp;
                      {amenities}
                    </li>
                  ))
                ) : (
                  <li className="amenities-2 flex">
                    <TbHomeOff className="text-2xl" /> &nbsp; No Amenities in
                    Workspace
                  </li>
                )}

                {/* <li className="amenities-2 flex">
              <PiNoteBlankLight className="text-2xl" /> &nbsp; Note paper
            </li>
            <li className="amenities-3 flex">
              <BsProjector className="text-2xl" /> &nbsp; Projector
            </li>
            <li className="amenities-4 flex">
              <IoCafeOutline className="text-2xl" /> &nbsp; Beverages
            </li> */}
              </ul>
            </div>

            <div className="map-building  ">
              <h2 className="text-2xl font-bold mb-4">Map</h2>
              <Googlemap src={roomData?.Building?.google_address} />
            </div>
          </div>

          <div className="detail-room-container-right-col">
            <BookingRoom
              roomData={roomData}
              workSpaceTypeName={workSpaceTypeName}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </>
  );
};

export default RoomDetail;
