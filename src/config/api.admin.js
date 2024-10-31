import axios from "./axios.customize";
//Admin Dashboard APIs____________________________________________________________
const getTotalRavenue = () => {
  const URL_API = "api/v1/booking/total-price-of-all-booking-in-month";
  return axios.get(URL_API);
};

const getTotalBooking = () => {
  const URL_API = "api/v1/booking/total";
  return axios.get(URL_API);
};

const getTotalVoucher = () => {
  const URL_API = "api/v1/voucher/total";
  return axios.get(URL_API);
};

const getTotalUser = (manager, staff, customer) => {
  const URL_API = "api/v1/user/total-user";
  const data = {
    manager,
    staff,
    customer,
  };
  return axios.get(URL_API, data);
};

const getTotalAmenity = () => {
  const URL_API = "api/v1/amenity/total";
  return axios.get(URL_API);
};

const getTotalBuilding = () => {
  const URL_API = "api/v1/building/total";
  return axios.get(URL_API);
};

const getTotalWorkspace = () => {
  const URL_API = "api/v1/workspace/total";
  return axios.get(URL_API);
};

const getRecentBooking = (
  workspace_name,
  workspace_type_name,
  booking_id,
  createAt,
  name
) => {
  const URL_API = "api/v1/booking/5recent";
  const data = {
    workspace_name,
    workspace_type_name,
    booking_id,
    createAt,
    name,
  };
  return axios.get(URL_API, data);
};

const getTop5Customers = (name, point) => {
  const URL_API = "api/v1/customer/top5customers";
  const data = {
    name,
    point,
  };
  return axios.get(URL_API, data);
};

//Amenities Manager APIs_________________________________________________________
const getAmenity = (search, page, limit) => {
  let URL_API = `/api/v1/amenity?page=${page}&limit=${limit}`;
  if (search) URL_API += `&amenity_name=${search}`;
  return axios.get(URL_API);
};

const getAmenityById = (amenity_id) => {
  const URL_API = `api/v1/amenity/${amenity_id}`;
  return axios.get(URL_API);
};

const postAmenity = (newAmenity) => {
  const URL_API = "api/v1/amenity";
  const formData = new FormData();
  formData.append("image", newAmenity.image);
  formData.append("amenity_name", newAmenity.amenity_name);
  formData.append("original_price", newAmenity.original_price);
  formData.append("rent_price", newAmenity.rent_price);
  return axios.post(URL_API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const putAmenity = (amenity_id, updatedAmenity) => {
  const URL_API = `api/v1/amenity/${amenity_id}`;
  const formData = new FormData();
  if (updatedAmenity.image) formData.append("image", updatedAmenity.image);
  if (updatedAmenity.amenity_name)
    formData.append("amenity_name", updatedAmenity.amenity_name);
  if (updatedAmenity.original_price)
    formData.append("original_price", updatedAmenity.original_price);
  if (updatedAmenity.rent_price)
    formData.append("rent_price", updatedAmenity.rent_price);

  return axios.put(URL_API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const blockAmenity = (amenity_id) => {
  const URL_API = `api/v1/amenity/delete/${amenity_id}`;
  return axios.put(URL_API);
};

//Workspace Types Manager APIs____________________________________________________

const getWorkspaceType = (search, page, limit) => {
  let URL_API = `/api/v1/workspace-type?`;
  if (search) URL_API += `workspace_type_name=${search}`;
  URL_API += `&page=${page}&limit=${limit}`;
  return axios.get(URL_API);
};

const getAllWorkspaceType = () => {
  const URL_API = `api/v1/workspace-type/`;
  return axios.get(URL_API);
};

const getWorkspaceTypeById = (workspace_type_id) => {
  const URL_API = `/api/v1/workspace-type/${workspace_type_id}`;
  return axios.get(URL_API);
};

const postWorkspaceType = (newWorkspaceType) => {
  const URL_API = "/api/v1/workspace-type";

  const formData = new FormData();
  if (newWorkspaceType.image) formData.append("image", newWorkspaceType.image);
  if (newWorkspaceType.workspace_type_name)
    formData.append(
      "workspace_type_name",
      newWorkspaceType.workspace_type_name
    );
  if (newWorkspaceType.description)
    formData.append("description", newWorkspaceType.description);

  console.log(
    "🚀 ~ postWorkspaceType ~ newWorkspaceType.image:",
    newWorkspaceType.image
  );

  return axios.post(URL_API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const putWorkspaceType = (workspace_type_id, updatedWorkspaceType) => {
  const URL_API = `/api/v1/workspace-type/${workspace_type_id}`;
  const formData = new FormData();
  if (updatedWorkspaceType.image)
    formData.append("image", updatedWorkspaceType.image);
  if (updatedWorkspaceType.workspace_type_name)
    formData.append(
      "workspace_type_name",
      updatedWorkspaceType.workspace_type_name
    );
  if (updatedWorkspaceType.description)
    formData.append("description", updatedWorkspaceType.description);

  return axios.put(URL_API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteWorkspaceType = (workspace_type_id) => {
  const URL_API = `/api/v1/workspace-type/delete/${workspace_type_id}`;

  return axios.put(URL_API);
};

const getManager = () => {
  const URL_API = "/api/v1/manager/";
  return axios.get(URL_API);
};

const getManagerById = (user_id) => {
  const URL_API = `/api/v1/manager/${user_id}`;
  return axios.get(URL_API);
};

const postManager = (newManager) => {
  const URL_API = "/api/v1/manager";
  return axios.post(URL_API, newManager);
};

const putManager = (user_id, updatedManager) => {
  const URL_API = `/api/v1/manager/${user_id}`;
  return axios.put(URL_API, updatedManager);
};

const deleteManager = (user_id) => {
  const URL_API = `/api/v1/manager/${user_id}`;
  return axios.delete(URL_API);
};

//Staffs Manager APIs__________________________________________________________

const getStaff = () => {
  const URL_API = "/api/v1/staff/";
  return axios.get(URL_API);
};

const getStaffById = (user_id) => {
  const URL_API = `/api/v1/staff/${user_id}`;
  return axios.get(URL_API);
};

const postStaff = (newStaff) => {
  const URL_API = `/api/v1/staff/`;
  return axios.post(URL_API, newStaff);
};

const putStaff = (user_id, updatedStaff) => {
  const URL_API = `/api/v1/staff/${user_id}`;
  return axios.put(URL_API, updatedStaff);
};

const unassignStaffFromBuilding = (staffId) => {
  const URL_API = `/api/v1/staff/unassign/${staffId}`;
  return axios.put(URL_API);
};

const assignStaffToBuilding = (staffId, buildingId) => {
  const URL_API = `/api/v1/staff/assign/${staffId}`; // URL_API is the api to assign staff to building with staffId on header
  return axios.put(URL_API, { building_id: buildingId }); // put request to assign staff to building with buildingId in body
}; // ==> need to have building_id in body to assign staff to building

const deleteStaff = (user_id) => {
  const URL_API = `/api/v1/staff/unactive/${user_id}`;
  return axios.put(URL_API);
};

//Customers Manager APIs___________________________________________________________
const getCustomer = (
  user_id,
  name,
  email,
  phone,
  gender,
  date_of_birth,
  status
) => {
  const URL_API = "/api/v1/customer";
  const data = {
    user_id,
    name,
    email,
    phone,
    gender,
    date_of_birth,
    status,
  };
  return axios.get(URL_API, data);
};

const getAllBooking = () => {
  const URL_API = `/api/v1/booking/get`;
  return axios.get(URL_API);
};

//Buildings Manager APIs_________________________________________________________
const getBuilding = () => {
  const URL_API = "/api/v1/building/";
  return axios.get(URL_API);
};

const postNewBuilding = (newBuilding) => {
  const URL_API = "/api/v1/building/";
  return axios.post(URL_API, newBuilding);
};

const changeBuildingStatus = (building_id, newStatus) => {
  const URL_API = `/api/v1/building/${building_id}/status`;
  return axios.put(URL_API, { status: newStatus });
};

const getCustomerById = (user_id) => {
  const URL_API = `/api/v1/customer/${user_id}`;
  return axios.get(URL_API);
};

const removeCustomer = (user_id) => {
  const URL_API = `/api/v1/customer/remove/${user_id}`;
  return axios.put(URL_API);
};

const putCustomer = (user_id) => {
  const URL_API = `/api/v1/customer/remove/${user_id}`;
  return axios.put(URL_API);
};

//Bookings Manager APIs___________________________________________________________

const getBookingByBuildingId = (building_id) => {
  const URL_API = `/api/v1/booking/get?building_id=${building_id}`;
  return axios.get(URL_API);
};

const getBuildingById = (building_id) => {
  const URL_API = `/api/v1/building/${building_id}`;
  return axios.get(URL_API);
};

// const postNewBuilding = (newBuilding) => {
//   const URL_API = "/api/v1/building/"
//   return axios.post(URL_API, newBuilding)
// }

const postBuilding = (newBuilding) => {
  const URL_API = "api/v1/building/";
  const formData = new FormData();

  // Giả sử `newBuilding` là một đối tượng có các thuộc tính cần gửi
  // Bạn sẽ thêm các thuộc tính này vào formData
  for (const key in newBuilding) {
    formData.append(key, newBuilding[key]);
  }

  try {
    // Có thể thêm xử lý khác trong khối này nếu cần
  } catch (error) {
    console.error("Error creating new building:", error);
  }

  return axios.post(URL_API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const putBuilding = (building_id, formData) => {
  const URL_API = `/api/v1/building/${building_id}`;

  return axios.put(URL_API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const assignManagerToBuilding = (building_id, manager_id) => {
  const URL_API = `/api/v1/building/${building_id}/manager`;
  console.log("URL_API:", URL_API);
  return axios.put(URL_API, { manager_id });
};

const removeManagerFromBuilding = (building_id) => {
  const URL_API = `/api/v1/building/${building_id}/manager/remove`;
  return axios.put(URL_API);
};

const deleteBuilding = (building_id) => {
  const URL_API = `/api/v1/building/${building_id}`;
  return axios.delete(URL_API);
};

//Workspace Manager APIs_________________________________________________________
const getWorkspace = () => {
  const URL_API = "/api/v1/workspace/";
  return axios.get(URL_API);
};

const getWorkspaceByBuildingId = (building_id) => {
  const URL_API = `/api/v1/workspace?building_id=${building_id}`;
  return axios.get(URL_API);
};

const getWorkspaceById = (workspace_id) => {
  const URL_API = `/api/v1/workspace/${workspace_id}`;
  return axios.get(URL_API);
};

// add new workspace
const postWorkspace = (newWorkspace) => {
  const URL_API = "/api/v1/workspace";
  return axios.post(URL_API, newWorkspace, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// update workspace
const putWorkspace = (workspace_id, updatedWorkspace) => {
  const URL_API = `/api/v1/workspace/${workspace_id}`;
  return axios.put(URL_API, updatedWorkspace, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteWorkspace = (workspace_id) => {
  const URL_API = `/api/v1/workspace/delete/${workspace_id}`;
  return axios.put(URL_API);
};
const assignWorkspaceToBuilding = (building_id, workspace_ids) => {
  const URL_API = `api/v1/workspace/assign/${building_id}`;
  return axios.put(URL_API, { workspace_ids });
};

const unassignWorkspaceFromBuilding = (building_id, workspace_ids) => {
  const URL_API = `api/v1/workspace/unassign/${building_id}`;
  return axios.put(URL_API, { workspace_ids });
};

//Voucher Manager APIs___________________________________________________________
const getVoucher = (
  voucher_id,
  voucher_name,
  voucher_code,
  description,
  discount,
  quantity,
  expired_date,
  status
) => {
  const URL_API = "/api/v1/voucher";
  const data = {
    voucher_id,
    voucher_name,
    voucher_code,
    description,
    discount,
    quantity,
    expired_date,
    status,
  };
  return axios.get(URL_API);
};

const getVoucherById = (voucher_id) => {
  const URL_API = `/api/v1/voucher/${voucher_id}`;
  return axios.get(URL_API);
};

const postVoucher = (newVoucher) => {
  const URL_API = "/api/v1/voucher";
  return axios.post(URL_API, newVoucher);
};

const putVoucher = (voucher_id, updatedVoucher) => {
  const URL_API = `/api/v1/voucher/${voucher_id}`;
  return axios.put(URL_API, updatedVoucher);
};

const deleteVoucher = (voucher_id) => {
  const URL_API = `/api/v1/voucher/${voucher_id}`;
  return axios.put(URL_API);
};

//Review manager APIs___________________________________________________________
const getReview = () => {
  const URL_API = "/api/v1/review/";
  return axios.get(URL_API);
};

const getReviewById = (review_id) => {
  const URL_API = `/api/v1/review/${review_id}`;
  return axios.get(URL_API);
};

const deleteReview = (review_id) => {
  const URL_API = `/api/v1/review/delete/${review_id}`;
  return axios.delete(URL_API);
};

const getRevenueDataIn6Days = (building_id) => {
  const URL_API = `api/v1/booking/revenue-in-6-days-ago?building_id=${building_id}`;
  return axios.get(URL_API);
};

const getBookingDataIn6Days = (building_id) => {
  const URL_API = `api/v1/booking/total-booking-in-6-days-ago?building_id=${building_id}`;
  return axios.get(URL_API);
};

const getRevenueDataIn6DaysAdmin = () => {
  const URL_API = `api/v1/booking/revenue-in-6-days-ago`;
  return axios.get(URL_API);
};

const getBookingDataIn6DaysAdmin = () => {
  const URL_API = `api/v1/booking/total-booking-in-6-days-ago`;
  return axios.get(URL_API);
};

//=========================================================================================================================
export {
  getTotalRavenue,
  getTotalBooking,
  getTotalVoucher,
  getTotalUser,
  getTotalAmenity,
  getTotalBuilding,
  getTotalWorkspace,
  getRecentBooking,
  getTop5Customers,
  getAmenity,
  getAmenityById,
  postAmenity,
  putAmenity,
  blockAmenity,
  getWorkspaceType,
  getWorkspaceTypeById,
  postWorkspaceType,
  putWorkspaceType,
  deleteWorkspaceType,
  getWorkspace,
  getWorkspaceById,
  postWorkspace,
  putWorkspace,
  assignWorkspaceToBuilding,
  unassignWorkspaceFromBuilding,
  deleteWorkspace,
  getManager,
  getManagerById,
  postManager,
  putManager,
  deleteManager,
  getStaff,
  getStaffById,
  postStaff,
  putStaff,
  deleteStaff,
  unassignStaffFromBuilding,
  assignStaffToBuilding,
  getCustomer,
  getCustomerById,
  removeCustomer,
  putCustomer,
  getBookingByBuildingId,
  getBuilding,
  getBuildingById,
  postBuilding,
  putBuilding,
  assignManagerToBuilding,
  removeManagerFromBuilding,
  deleteBuilding,
  getVoucher,
  getVoucherById,
  postVoucher,
  putVoucher,
  deleteVoucher,
  getReview,
  getReviewById,
  deleteReview,
  getRevenueDataIn6Days,
  getWorkspaceByBuildingId,
  getAllBooking,
  getBookingDataIn6Days,
  getRevenueDataIn6DaysAdmin,
  getBookingDataIn6DaysAdmin,
  postNewBuilding,
  changeBuildingStatus,
  getAllWorkspaceType,
};
