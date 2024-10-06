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

export {
  loginApi,
  registerApi,
  getUserAuthen,
  putUpdateCustomerInfo,
  putUpdateCustomerPassword,
  getGoogleCallBack,
  getBuildingFromSearch,
  getLatLonFromAddress,
};
