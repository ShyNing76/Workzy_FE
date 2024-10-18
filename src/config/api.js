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
  const URL_API = `api/v1/workspace/?building_id=${buildingId}&limit=${limit}&page=${page}&${queryString}&status=active`;

  return axios.get(URL_API);
};

const getAllWorkspacesByBuildingId = (buildingId, queryString) => {
  const URL_API = `api/v1/workspace/?building_id=${buildingId}&${queryString}&status=active`; // No pagination in this call
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

const getBookingOfCustomer = () => {
  const URL_API = `api/v1/booking/customer`;

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

const getAllAmenities = () => {
  const URL_API = `api/v1/amenity`;

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

  console.log("booking id:", booking_id);
  console.log("addAmenities:", addAmenities);
  console.log("Total Price:", total_amenities_price);

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
};
