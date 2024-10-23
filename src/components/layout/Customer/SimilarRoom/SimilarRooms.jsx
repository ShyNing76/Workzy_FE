import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { getAllWorkspacesByWorkspaceTypeName } from "../../../../config/api";
import RoomCard from "../RoomCard/RoomCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SimilarRooms = ({
  currentBuildingId,
  workspaceTypeName,
  currentRoomId,
}) => {
  const [similarRooms, setSimilarRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSimilarRooms = async () => {
      if (!workspaceTypeName) return;

      try {
        setIsLoading(true);
        const res = await getAllWorkspacesByWorkspaceTypeName(
          workspaceTypeName
        );

        if (res && res.data && res.err === 0) {
          // Filter out the current room
          const filteredRooms = res.data.filter(
            (room) =>
              room.Building.building_id === currentBuildingId &&
              room.workspace_id !== currentRoomId
          );
          setSimilarRooms(filteredRooms);
        }
      } catch (error) {
        console.error("Error fetching similar rooms:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimilarRooms();
  }, [currentBuildingId, workspaceTypeName]);

  if (!similarRooms.length) return null;

  return (
    <div className=" py-12 px-8 mx-auto max-w-7xl">
      {/* Header Section */}
      <div className="mb-8 flex items-center justify-between px-4 sm:px-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Similar Rooms
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Explore other spaces you might like
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-3">
          <button
            className="similar-prev-button group relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white transition-all hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="h-5 w-5 text-gray-600 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            className="similar-next-button group relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white transition-all hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Next slide"
          >
            <FaChevronRight className="h-5 w-5 text-gray-600 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Swiper Container */}
      <div className="relative px-4 sm:px-0">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: ".similar-prev-button",
            nextEl: ".similar-next-button",
            disabledClass: "opacity-50 cursor-not-allowed",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={24}
          slidesPerView={4}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          style={{ padding: 10 }}
        >
          {similarRooms.map((workspace, index) => (
            <SwiperSlide
              key={workspace.workspace_id}
              className="h-auto transition-opacity duration-300 hover:opacity-95"
            >
              <div className="swiper-card-shadow h-full rounded-lg">
                <RoomCard
                  workspace={workspace}
                  image={`https://picsum.photos/500/300?random=${index}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SimilarRooms;
