import React, { useEffect, useState } from "react";
import Googlemap from "../../../components/layout/Customer/Googlemap/Googlemap";
import { IoLocationOutline } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import Carousel from "../../../components/layout/Customer/Carousel/Carousel";
import RoomCard from "../../../components/layout/Customer/RoomCard/RoomCard";
import FilterBar from "../../../components/layout/Customer/FilterBar/FilterBar";
import buildingImage from "../../../assets/8.jpg";
import {
  getAllWorkspacesByBuildingId,
  getBuildingById,
  getWorkspaceByBuildingId,
} from "../../../config/api";
import { toast, ToastContainer } from "react-toastify";
import Pagination from "../../../components/layout/Shared/Pagination/Pagination";

const Building = () => {
  const { buildingId } = useParams();
  const [buildingData, setBuildingData] = useState("");
  const [workspaceData, setWorkspaceData] = useState("");

  const ROOM_LIMIT = 8;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(ROOM_LIMIT);
  const [totalWorkspaces, setTotalWorkspaces] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Is loading
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const images = [
    "https://picsum.photos/500/300?random=1",
    "https://picsum.photos/500/300?random=2",
    "https://picsum.photos/500/300?random=3",
    "https://picsum.photos/500/300?random=4",
    "https://picsum.photos/500/300?random=5",
  ];

  useEffect(() => {
    const fetchBuildingData = async () => {
      try {
        setIsLoading(true);
        const res = await getBuildingById(buildingId);

        if (res && res.data && res.err === 0) {
          setBuildingData(res.data);
        } else {
          navigate("/404");
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBuildingData();
  }, [buildingId]);

  useEffect(() => {
    const fetchTotalWorkspaces = async () => {
      try {
        const res = await getAllWorkspacesByBuildingId(buildingId);
        if (res && res.data && res.err === 0) {
          setTotalWorkspaces(res.data.length); // Total workspaces
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    const fetchWorkspaceData = async () => {
      try {
        const res = await getWorkspaceByBuildingId(buildingId, limit, page);

        if (res && res.data && res.err === 0) {
          setWorkspaceData(res.data);
        }
      } catch (error) {
        toast.error(error);
      }
    };

    fetchTotalWorkspaces();
    fetchWorkspaceData();
  }, [buildingId, limit, page]);

  // Count Total page
  useEffect(() => {
    if (totalWorkspaces > 0) {
      setTotalPages(Math.ceil(totalWorkspaces / limit)); // Calculate total pages
    }
  }, [totalWorkspaces, limit]); // Depend on totalWorkspaces and limit

  return (
    <>
      {!isLoading ? (
        <>
          <ToastContainer />
          <div className="body-content mt-0">
            <div className="body-content-container mx-auto grid max-w-2xl lg:max-w-7xl lg:grid-cols-2 items-center gap-x-16 gap-y-16 px-4 py-24 sm:px-6 sm:py-10 lg:px-8">
              {/* Nội dung văn bản */}
              <div className="body-content-text">
                <div className="building-title text-3xl font-black tracking-tight sm:text-5xl text-left">
                  <h1>{buildingData.building_name}</h1>
                  <br />
                </div>

                <div className="building-address">
                  <p className="building-address-detail text-sm flex font-semibold">
                    <IoLocationOutline className="text-xl" /> &nbsp;{" "}
                    {buildingData.address}
                  </p>
                </div>

                <div className="building-detail body-content-normal-text text-justify mt-12">
                  {buildingData.description}
                </div>
              </div>

              {/* Hình ảnh */}
              <div className="building-img flex justify-center items-center border">
                <img
                  src={buildingImage}
                  alt="Building"
                  className="max-w-full h-full"
                />
              </div>
            </div>
          </div>

          <div className="my-6">
            <Carousel images={images} />
          </div>

          <div className="mt-10">
            <h1 className="text-4xl font-bold m-5 ml-20">
              Available{" "}
              <span className="text-amber-500 text-5xl">Workspace</span>
            </h1>
            <FilterBar />
          </div>

          <div className="room-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-12">
            {workspaceData &&
              workspaceData.map((workspace, index) => (
                <RoomCard
                  key={`workspace-${workspace.workspace_id}`}
                  workspace={workspace}
                  image={`https://picsum.photos/500/300?random=${index}`}
                />
              ))}
          </div>

          {totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          )}

          <div className="workzy-branch-maps">
            <div className="maps-container">
              <div>
                <Googlemap src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6099415304884!2d106.80730807470056!3d10.841132857997573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1726955415730!5m2!1svi!2s" />
              </div>
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

export default Building;
