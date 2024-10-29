import axios from "./axios.customize"

const getStaffBuildingId = () => {   
  const URL_API = "/api/v1/staff/building";  
  return axios.get(URL_API);
};

const getWorkspaceByBuildingId = (building_id) => {
  const URL_API = `/api/v1/workspace/?building_id=${building_id}`;
  return axios.get(URL_API);
}; 

const getBooking = (building_id, page, limit) => {
  const URL_API = `/api/v1/booking/get/?building_id=${building_id}&page=${page}&limit=${limit}`;
  return axios.get(URL_API);
};

const getBookingWorkspace = (building_id, workspace_id) => {
  const URL_API = `/api/v1/booking/get/?building_id=${building_id}&workspace_id=${workspace_id}`;
  return axios.get(URL_API);
};


const postBookingStatus = (booking_id, status) => {
  const URL_API = `/api/v1/staff/change-status/${booking_id}`;
  const data = {
    status
  };
  return axios.post(URL_API, data);
};

const getAmenitiesByBookingId = (booking_id) => {
  const URL_API = `/api/v1/staff/check-amenities/booking/${booking_id}`;
  return axios.get(URL_API);
};

const sendBrokenAmenities = (data) => {
  const URL_API = "/api/v1/staff/broken-amenities-booking"; 
  return axios.post(URL_API, data);  
};

const getBookingTypeById = (booking_type_id) => {
  const URL_API = `/api/v1/staff/booking-type/${booking_type_id}`;
  return axios.get(URL_API);
};

const getWishlist = () => {
  const URL_API = "/api/v1/wishList/";
  return axios.get(URL_API);
}

export {
  getStaffBuildingId,
  getWorkspaceByBuildingId,
  getBooking,
  postBookingStatus,
  getAmenitiesByBookingId,
  sendBrokenAmenities, 
  getBookingWorkspace,
  getBookingTypeById,
  getWishlist,
};