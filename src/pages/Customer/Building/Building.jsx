import React, { useEffect, useState } from "react";
import Googlemap from "../../../components/layout/Customer/Googlemap/Googlemap";
import { IoLocationOutline } from "react-icons/io5";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
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
import noDataIcon from "../../../assets/no-data.png";
import "./Building.scss";

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
  const [isLoadingRoom, setIsLoadingRoom] = useState(false);

  const navigate = useNavigate();

  // Filter
  const [searchParams] = useSearchParams();
  const officeSize = searchParams.get("officeSize") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const workSpaceType = searchParams.get("workspaceType") || "";

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
    let queryString = "";

    // Thêm officeSize nếu có giá trị
    if (officeSize) {
      queryString += `&office_size=${officeSize}`;
    }

    // Thêm workspaceType nếu có giá trị
    if (workSpaceType) {
      queryString += `&workspace_type_name=${workSpaceType}`;
    }

    // Thêm minPrice và maxPrice nếu có giá trị
    if (minPrice && maxPrice) {
      queryString += `&min_price=${minPrice}&max_price=${maxPrice}`;
    }

    const fetchTotalWorkspaces = async () => {
      try {
        const res = await getAllWorkspacesByBuildingId(buildingId, queryString);
        if (res && res.data && res.err === 0) {
          setTotalWorkspaces(res.data.length); // Total workspaces
        } else {
          setTotalWorkspaces(0);
        }
      } catch (error) {
        toast.error(error);
      }
    };

    const fetchWorkspaceData = async () => {
      setIsLoadingRoom(true);
      try {
        const res = await getWorkspaceByBuildingId(
          buildingId,
          limit,
          page,
          queryString
        );

        if (res && res.data && res.err === 0) {
          setWorkspaceData(res.data);
        } else {
          setWorkspaceData([]);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoadingRoom(false);
      }
    };

    fetchTotalWorkspaces();
    fetchWorkspaceData();
  }, [buildingId, limit, page, officeSize, minPrice, maxPrice, workSpaceType]);

  // Count Total page
  useEffect(() => {
    if (totalWorkspaces > 0) {
      setTotalPages(Math.ceil(totalWorkspaces / limit)); // Calculate total pages
    } else {
      setTotalPages(1);
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
            <FilterBar
              officeSize={officeSize}
              minPrice={minPrice}
              maxPrice={maxPrice}
              workSpaceType={workSpaceType}
              buildingId={buildingId}
            />
          </div>

          {isLoadingRoom && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-12">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="flex w-72 flex-col gap-4 my-10">
                  <div className="skeleton h-52 w-full"></div>
                  <div className="skeleton h-4 w-40"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="flex justify-between">
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-28"></div>
                  </div>
                  <div className="skeleton h-12 w-full"></div>
                </div>
              ))}
            </div>
          )}

          <div className="room-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-12 my-10">
            {workspaceData && workspaceData.length && !isLoadingRoom > 0 ? (
              workspaceData.map((workspace, index) => (
                <RoomCard
                  key={`workspace-${workspace.workspace_id}`}
                  workspace={workspace}
                  image={`https://picsum.photos/500/300?random=${index}`}
                />
              ))
            ) : (
              <div className="no-data-room">
                <img
                  src={noDataIcon}
                  alt="No Data"
                  className="no-data-icon-room"
                />
                <p>No Room Found</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          )}

          <div className="workzy-branch-maps">
            <div className="maps-container">
              <div>
                <Googlemap src={buildingData.google_address} />
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
