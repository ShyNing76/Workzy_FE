import axios from "./axios.customize"

const getStaffBuildingId = () => {
    
  const URL_API = "/api/v1/staff/building";
  
  return axios.get(URL_API);
};

const getBuildingById = (building_id) => {
   
  const URL_API = `/api/v1/building/${building_id}`;
  
  return axios.get(URL_API);
};

const getWorkspaceByBuildingId = (building_id) => {
  const URL_API = `/api/v1/workspace/?building_id=${building_id}`;
  return axios.get(URL_API);
}; 

const getWorkspaceById = (workspace_id) => {
  const URL_API = `/api/v1/workspace/${workspace_id}`;
  return axios.get(URL_API);
};

const getBooking = () =>{
  const URL_API = "/api/v1/booking/get";
  return axios.get(URL_API);
};

export {
  getStaffBuildingId,
  getBuildingById,
  getWorkspaceByBuildingId,
  getBooking,
  getWorkspaceById,
};