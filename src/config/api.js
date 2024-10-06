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

export {
  loginApi,
  registerApi,
  getUserAuthen,
  putUpdateCustomerInfo,
  putUpdateCustomerPassword,
  getGoogleCallBack,
};
