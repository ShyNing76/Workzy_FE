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

const assignStaffToBuilding = (buildingId, staffId) => {}

export {
    getAllBuildings,
    getAllStaffs
}
