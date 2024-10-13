import axios from "./axios.customize";

//Workspace Types Manager APIs____________________________________________________  

const getWorkspaceType = (workspace_type_id, workspace_type_name, image, description, status) => {
    const URL_API = "/api/v1/workspace-type"
    const data = {
        workspace_type_id,
        workspace_type_name,
        image,
        description,
        status,
    }
    return axios.get(URL_API, data)
  }

  const getWorkspaceTypeById = (workspace_type_id) => {
    const URL_API = `/api/v1/workspace-type/${workspace_type_id}`;
    return axios.get(URL_API);
  }

  const postWorkspaceType =  (newWorkspaceType) => {
    const URL_API = "/api/v1/workspace-type";
    return axios.post(URL_API, newWorkspaceType);
  };

  const putWorkspaceType = (workspace_type_id, updatedWorkspaceType) => {
    const URL_API = `/api/v1/workspace-type/${workspace_type_id}`;
    return axios.put(URL_API, updatedWorkspaceType);
  }

  const deleteWorkspaceType = (workspace_type_id) => {
    const URL_API = `/api/v1/workspace-type/${workspace_type_id}`
    return axios.delete(URL_API);
  }


  //Managers Manager APIs__________________________________________________________

  const getManager = (user_id, name, gender, date_of_birth, status) =>  {
    const URL_API = "/api/v1/manager"
    const data = {
      user_id,
      name,
      gender,
      date_of_birth,
      status,
    }
    return axios.get(URL_API, data)
  }

  const getManagerById = (user_id) => {
    const URL_API = `/api/v1/manager/${user_id}`
    return axios.get(URL_API);
  }

  const postManager = (newManager) => {
    const URL_API = "/api/v1/manager"
    return axios.post(URL_API, newManager)
  }

  const putManager = (user_id, updatedManager) => {
    const URL_API = `/api/v1/manager/${user_id}`
    return axios.put(URL_API, updatedManager)
  }

  const deleteManager = (user_id) =>  {
    const URL_API = `/api/v1/manager/${user_id}`
    return axios.delete(URL_API)
  }

  //Staffs Manager APIs__________________________________________________________

  const getStaff = (user_id, name, email, phone, gender, date_of_birth, status) => {
    const URL_API = "/api/v1/staff"
    const data =  {
      user_id,
      name,
      email,
      phone,
      gender,
      date_of_birth,
      status,
    }
    return axios.get(URL_API, data)
  }

  const postStaff = (newStaff) => {
    const URL_API = `/api/v1/staff/`
    return axios.post(URL_API, newStaff)
  }

  export {
    getWorkspaceType,
    getWorkspaceTypeById,
    postWorkspaceType,
    putWorkspaceType,
    deleteWorkspaceType,

    getManager,
    getManagerById,
    postManager,
    putManager,
    deleteManager,

    getStaff,
    postStaff,
  };