import React, { useEffect, useState } from "react";
import GallerySwiper from "../../../components/layout/Customer/GallerySwiper/GallerySwiper";
import "./RoomDetail.scss";
import Googlemap from "../../../components/layout/Customer/Googlemap/Googlemap";
import BookingRoom from "../../../components/layout/Customer/BookingRoom/BookingRoom";
import { useParams } from "react-router-dom";
import {
  getReviewByWorkspaceName,
  getWorkSpaceAmenitiesById,
  getWorkSpaceById,
  getWorkSpaceTypeNameById,
} from "../../../config/api";
import { toast } from "react-toastify";
import { TbHomeOff } from "react-icons/tb";
import { getAmenityIcon } from "../../../components/context/iconGenerate";
import SimilarRooms from "../../../components/layout/Customer/SimilarRoom/SimilarRooms";
import WorkspaceReview from "../../../components/layout/Customer/WorkspaceReview/WorkspaceReview";
import TimeBooking from "../../../components/layout/Customer/TimeBooking/TimeBooking";

const RoomDetail = () => {
  const { roomid } = useParams();
  const [roomData, setRoomData] = useState("");
  const [workSpaceTypeName, setWorkSpaceTypeName] = useState("");
  const [workSpaceAmenities, setWorkSpaceAmenities] = useState([]);
  const [roomReviews, setRoomReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const LIMIT_REVIEW = 5;

  // Lấy ngày hôm nay
  const today = new Date();
  // SelectedDate (Time)
  const [selectedDate, setSelectedDate] = useState(today);

  // Tab hiện tại
  const [currentTab, setCurrentTab] = useState("Hourly");

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

    const fetchReviews = async () => {
      if (roomData && roomData.workspace_name) {
        try {
          const res = await getReviewByWorkspaceName(
            roomData.workspace_name,
            LIMIT_REVIEW,
            page
          );
          if (res && res.err === 0) {
            // Ensure the data is in the correct format
            setRoomReviews({
              data: {
                count: res.data.count || 0,
                rows: res.data.rows || [],
              },
            });
          } else {
            // Set default empty state if no data
            setRoomReviews({ data: { count: 0, rows: [] } });
          }
        } catch (error) {
          toast.error("Failed to fetch reviews");
          // Set default empty state on error
          setRoomReviews({ data: { count: 0, rows: [] } });
        }
      }
    };

    fetchReviews();
    fetchWorkSpaceAmenities();
    fetchWorkSpaceTypeName();
  }, [roomData, page, setPage]); // Trigger this effect when roomData changes

  return (
    <>
      {!isLoading ? (
        <>
          <div className="detail-room-container mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-10 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
            <div className="detail-room-container-left-col">
              <div className="gallery-contain">
                <GallerySwiper />
              </div>

              {currentTab === "Hourly" && (
                <TimeBooking
                  workspaceId={roomData.workspace_id}
                  selectedDate={selectedDate}
                />
              )}

              <div className="room-descriptions-container mt-4 mb-4">
                <h2 className="room-descriptions-title text-2xl font-bold mb-4">
                  Room Description
                </h2>
                <div className="room-descriptions-list-container list-disc px-8">
                  {roomData?.description || "No Description"}
                </div>
              </div>

              <div className="room-amenities-container">
                <h2 className="text-2xl font-bold ">Amenities</h2>
                <ul className="amenities-list mx-auto grid grid-cols-1 items-start gap-6 sm:p-6 lg:grid-cols-2 item-center">
                  {workSpaceAmenities.length > 1 ? (
                    workSpaceAmenities.map((amenities, index) => (
                      <li
                        key={`amenities-${index}`}
                        className="amenities-1 flex items-center gap-2 bg-white shadow-md p-4 rounded-lg border border-gray-100 hover:bg-gray-50"
                      >
                        {getAmenityIcon(amenities)}
                        <span className="text-gray-800 font-medium">
                          {amenities}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="amenities-2 flex items-center gap-2 bg-red-100 text-red-700 p-4 rounded-lg border border-red-300 shadow-md">
                      <TbHomeOff className="text-2xl" />
                      <span>No Amenities in Workspace</span>
                    </li>
                  )}
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
                today={today}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
              />
            </div>
          </div>
          <hr />
          <WorkspaceReview
            data={roomReviews}
            page={page}
            setPage={setPage}
            limit={LIMIT_REVIEW}
          />
          <hr />
          <SimilarRooms
            currentBuildingId={roomData.building_id}
            currentRoomId={roomData.workspace_id}
            workspaceTypeName={workSpaceTypeName}
          />
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </>
  );
};

export default RoomDetail;
