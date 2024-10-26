import axios from "./axios.customize";

// API for Manager Dashboard

const getAllManagerBuilding = () => {
    const URL_API = "/api/v1/manager/buildings"
    return axios.get(URL_API)
}

const getBuildingById = (building_id) => {
  const URL_API = `/api/v1/building/${building_id}`;
  return axios.get(URL_API, building_id);
};

const getTotalRevenue = (building_id) => {
  const URL_API = `api/v1/booking/total-price-of-all-booking-in-month?building_id=${building_id}`;
  return axios.get(URL_API, building_id);
};

const getTotalBooking = (building_id) => {
  const URL_API = `api/v1/booking/total?building_id=${building_id}`;
  return axios.get(URL_API, building_id);
};

const getTotalWorkspace = (building_id) => {
  const URL_API = `api/v1/workspace/total?building_id=${building_id}`;
  return axios.get(URL_API, building_id);
};

const getInUseWorkspace = (building_id) => {
  const URL_API = `/api/v1/workspace/total-usage-workspace?building_id=${building_id}`;
  return axios.get(URL_API, building_id);
};

const getEmptyWorkspace = (building_id) => {
  const URL_API = `api/v1/workspace/total-workspace-not-in-booking?building_id=${building_id}`;
  return axios.get(URL_API, building_id);
};

const getRecentBooking = (building_id) => {
  const URL_API = `api/v1/booking/5recent?building_id=${building_id}`;
  return axios.get(URL_API, building_id);
};

// api manager get all buildings
const getBuildingsByManager = () => {
  const URL_API = `/api/v1/manager/buildings/`;
  return axios.get(URL_API);
};

const getAllStaffs = () => {
  const URL_API = `/api/v1/staff/`;
  return axios.get(URL_API);
};
const unassignStaffFromBuilding = (staffId) => {
  const URL_API = `/api/v1/staff/unassign/${staffId}`;
  return axios.put(URL_API);
};

const assignStaffToBuilding = (staffId, buildingId) => {
  const URL_API = `/api/v1/staff/assign/${staffId}`; // URL_API is the api to assign staff to building with staffId on header
  return axios.put(URL_API, { building_id: buildingId }); // put request to assign staff to building with buildingId in body
}; // ==> need to have building_id in body to assign staff to building

const activeStaff = (staffId) => {
  const URL_API = `/api/v1/staff/active/${staffId}`;
  return axios.put(URL_API);
};

const inactiveStaff = (staffId) => {
  const URL_API = `/api/v1/staff/unactive/${staffId}`;
  return axios.put(URL_API);
};

const getAllReview = () => {
  const URL_API = `/api/v1/review/`;
  return axios.get(URL_API);
};

const deleteReview = (reviewId) => {
  const URL_API = `/api/v1/review/delete/${reviewId}`;
  return axios.delete(URL_API);
};

const getAllWorkSpaces = (buildingId) => {
  const URL_API = `/api/v1/workspace?building_id=${buildingId}`;
  return axios.get(URL_API);
};

export {
  getAllManagerBuilding,
  getBuildingById,
  getTotalRevenue,
  getTotalBooking,
  getTotalWorkspace,
  getInUseWorkspace,
  getEmptyWorkspace,
  getRecentBooking,
  getBuildingsByManager,
  getAllStaffs,
  assignStaffToBuilding,
  unassignStaffFromBuilding,
  activeStaff,
  inactiveStaff,
  getAllReview,
  deleteReview,
  getAllWorkSpaces,
};
