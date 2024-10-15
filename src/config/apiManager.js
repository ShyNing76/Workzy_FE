import axios from "./axios.customize";




 // api manager get all buildings
const getAllBuildings = () => {
    const URL_API = `/api/v1/building/`;
    return axios.get(URL_API);
}

const getAllStaffs = () => {
    const URL_API = `/api/v1/staff/`;
    return axios.get(URL_API);
}
const unassignStaffFromBuilding = (staffId) => {
    const URL_API = `/api/v1/staff/unassign/${staffId}`;
    return axios.put(URL_API);
}

const assignStaffToBuilding = (staffId, buildingId) => {
    const URL_API = `/api/v1/staff/assign/${staffId}`;     // URL_API is the api to assign staff to building with staffId on header
    return axios.put(URL_API, {building_id: buildingId});  // put request to assign staff to building with buildingId in body
}   // ==> need to have building_id in body to assign staff to building

const updateStaffStatus = (staffId) => {
    const URL_API = `/api/v1/staff/${staffId}`
    return axios.put(URL_API)
}

export {
    getAllBuildings,
    getAllStaffs,
    assignStaffToBuilding,
    unassignStaffFromBuilding,
    updateStaffStatus
}
