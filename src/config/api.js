import axios from "./axios.customize";

const loginApi = (email, password) => {
  const URL_API = "api/v1/auth/login";
  const data = {
    email,
    password,
  };

  return axios.post(URL_API, data);
};

const registerApi = (name, email, password) => {
  const URL_API = "api/v1/auth/register";
  const data = {
    name,
    email,
    password,
  };

  return axios.post(URL_API, data);
};

const getUserAuthen = () => {
  const URL_API = "api/v1/user/profile";

  return axios.get(URL_API);
};

const putUpdateCustomerInfo = (name, date_of_birth, gender) => {
  const URL_API = "api/v1/user/profile";
  const data = {
    name,
    date_of_birth,
    gender,
  };

  return axios.put(URL_API, data);
};

const putUpdateCustomerPassword = (currentPassword, newPassword) => {
  const URL_API = "api/v1/user/password";
  const data = {
    current_password: currentPassword,
    new_password: newPassword,
  };

  return axios.put(URL_API, data);
};

const getGoogleCallBack = (code) => {
  return axios.get("api/v1/auth/google/callback", {
    code,
  });
};

const getBuildingFromSearch = (queryString) => {
  const URL_API = `api/v1/search/${queryString}`;

  return axios.get(URL_API);
};

const getLatLonFromAddress = async (address) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`
    );
    if (response) {
      const { lat, lon } = response[0];
      return { lat, lon };
    }
    return null;
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
};

const getBuildingById = (buildingId) => {
  const URL_API = `api/v1/building/${buildingId}`;

  return axios.get(URL_API);
};

const putUpdatePhoneNumber = (phoneNumber) => {
  const URL_API = "api/v1/user/phone";
  const data = {
    phone: phoneNumber,
  };

  return axios.put(URL_API, data);
};

const putUpdateImage = (image) => {
  const URL_API = "api/v1/user/image";

  const formData = new FormData();
  formData.append("image", image);

  try {
    // Check if the image is a valid file type (e.g., JPEG, PNG, GIF) before uploading
  } catch (error) {
    console.error("Error uploading image:", error);
  }

  return axios.put(URL_API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getWorkspaceByBuildingId = (buildingId, limit, page, queryString) => {
  const URL_API = `api/v1/workspace/?building_id=${buildingId}&limit=${limit}&page=${page}&${queryString}status=active`;

  return axios.get(URL_API);
};

const getAllWorkspacesByBuildingId = (buildingId, queryString) => {
  const URL_API = `api/v1/workspace/?building_id=${buildingId}&${queryString}status=active`; // No pagination in this call
  return axios.get(URL_API);
};

const postCreateBooking = (
  workspaceId,
  type,
  startTime,
  endTime,
  totalPrice
) => {
  const URL_API = "api/v1/booking/create";
  const data = {
    workspace_id: workspaceId,
    type,
    start_time: startTime,
    end_time: endTime,
    total_price: totalPrice,
  };

  return axios.post(URL_API, data);
};

const getWorkSpaceById = (workspaceId) => {
  const URL_API = `api/v1/workspace/${workspaceId}`; // No pagination in this call

  return axios.get(URL_API);
};

const getWorkSpaceTypeNameById = (workspacetypeId) => {
  const URL_API = `api/v1/workspace-type/${workspacetypeId}`; // No pagination in this call

  return axios.get(URL_API);
};

const getWorkSpaceAmenitiesById = (workspacetypeId) => {
  const URL_API = `api/v1/amenityWorkspace/${workspacetypeId}`; // No pagination in this call

  return axios.get(URL_API);
};

const postCreatePaypalOrder = (bookingId) => {
  const URL_API = "api/v1/booking/checkout/paypal";
  const data = {
    booking_id: bookingId,
  };

  return axios.post(URL_API, data);
};

const postApprovePaypalOrder = (orderId, bookingId) => {
  const URL_API = "api/v1/booking/checkout/paypal/success";
  const data = {
    booking_id: bookingId,
    order_id: orderId,
  };

  return axios.post(URL_API, data);
};

const getBookingOfCustomer = (limit, page) => {
  const URL_API = `api/v1/booking/customer?limit=${limit}&page=${page}`;

  return axios.get(URL_API);
};

const getAllBookingType = () => {
  const URL_API = `api/v1/bookingType/`;

  return axios.get(URL_API);
};

const putCancelBooking = (bookingId) => {
  const URL_API = `api/v1/booking/cancel/${bookingId}`;

  return axios.put(URL_API);
};

const getBookingById = (booking_id) => {
  const URL_API = `api/v1/booking/get/${booking_id}`;

  return axios.get(URL_API);
};

const putChangeStatus = (bookingId, status) => {
  const URL_API = `api/v1/customer/change-status/${bookingId}`;
  const data = {
    status,
  };

  return axios.put(URL_API, data);
};

const getAllAmenities = (limit, page) => {
  const URL_API = `api/v1/amenity?limit=${limit}&page=${page}`;

  return axios.get(URL_API);
};

const postCreatePaypalOrderAmenities = (
  addAmenities,
  booking_id,
  total_amenities_price
) => {
  const URL_API = "api/v1/booking/checkout/paypal/amenities";

  const data = {
    addAmenities,
    booking_id,
    total_amenities_price,
  };

  return axios.post(URL_API, data);
};

const postApprovePaypalOrderAmenities = (orderId, bookingId) => {
  const URL_API = "api/v1/booking/checkout/paypal/amenities/success";
  const data = {
    booking_id: bookingId,
    order_id: orderId,
  };

  return axios.post(URL_API, data);
};

const postBookingAddToCalendar = (bookingId) => {
  const URL_API = "api/v1/booking/add-to-calendar";

  const data = {
    booking_id: bookingId,
  };

  return axios.post(URL_API, data);
};

const postBookingRefund = (bookingId) => {
  const URL_API = `api/v1/booking/refund/${bookingId}`;

  return axios.post(URL_API);
};

const getAllWorkspacesByWorkspaceTypeName = (WorkspaceTypeName) => {
  const URL_API = `api/v1/workspace/?workspace_type_name=${WorkspaceTypeName}&status=active`; // No pagination in this call
  return axios.get(URL_API);
};

const getReviewByWorkspaceName = (WorkspaceName, limit, page) => {
  const URL_API = `api/v1/review/?workspace_name=${WorkspaceName}&limit=${limit}&page=${page}`;
  return axios.get(URL_API);
};

const postCreateReview = (booking_id, rating, review_content) => {
  const URL_API = `api/v1/review`;
  const data = {
    booking_id,
    rating,
    review_content,
  };

  return axios.post(URL_API, data);
};

const getAllWorkspaceType = () => {
  const URL_API = `api/v1/workspace-type`;
  return axios.get(URL_API);
};

const getPointOfCustomer = () => {
  const URL_API = `api/v1/customer/point`;
  return axios.get(URL_API);
};

const getTimeBookingInRoomAndDate = (workspace_id, date) => {
  const URL_API = `/api/v1/booking/time-booking/${workspace_id}/?date=${date}`;
  return axios.get(URL_API);
};

export {
  loginApi,
  registerApi,
  getUserAuthen,
  putUpdateCustomerInfo,
  putUpdateCustomerPassword,
  getGoogleCallBack,
  getBuildingFromSearch,
  getLatLonFromAddress,
  getBuildingById,
  putUpdatePhoneNumber,
  putUpdateImage,
  getWorkspaceByBuildingId,
  getAllWorkspacesByBuildingId,
  postCreateBooking,
  getWorkSpaceById,
  getWorkSpaceTypeNameById,
  getWorkSpaceAmenitiesById,
  postCreatePaypalOrder,
  postApprovePaypalOrder,
  getBookingOfCustomer,
  getAllBookingType,
  putCancelBooking,
  getBookingById,
  putChangeStatus,
  getAllAmenities,
  postCreatePaypalOrderAmenities,
  postApprovePaypalOrderAmenities,
  postBookingAddToCalendar,
  postBookingRefund,
  getAllWorkspacesByWorkspaceTypeName,
  getReviewByWorkspaceName,
  postCreateReview,
  getAllWorkspaceType,
  getPointOfCustomer,
  getTimeBookingInRoomAndDate,
};
