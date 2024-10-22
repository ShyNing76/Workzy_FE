import axios from "./axios.customize";

//Amenities Manager APIs_________________________________________________________
const getAmenity = (amenity_id, amenity_name, image, original_price, depreciation_price, rent_price, status) =>  {
  const URL_API = "api/v1/amenity/"
  const data = {
    amenity_id,
    amenity_name,
    image,
    original_price,
    depreciation_price,
    rent_price,
    status,
  }
  return axios.get(URL_API, data)
}

const getAmenityById = (amenity_id) =>  {
  const URL_API = `api/v1/amenity/${amenity_id}`
  return axios.get(URL_API);
}

const postAmenity = (newAmenity) => {
  const URL_API = "api/v1/amenity"
  return axios.post(URL_API, newAmenity)
}

const putAmenity = (amenity_id, updatedAmenity) => {
  const URL_API = `api/v1/amenity/${amenity_id}`
  return axios.put(URL_API, updatedAmenity)
}

const deleteAmenity = (amenity_id) => {
  const URL_API = `api/v1/amenity/${amenity_id}`
  return axios.delete(URL_API)
}




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

  const getManager = () =>  {
    const URL_API = "/api/v1/manager/"   
    return axios.get(URL_API)
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

  const getStaff = () => {
    const URL_API = "/api/v1/staff/"
    return axios.get(URL_API)
  }

  const getStaffById = (user_id) => {
    const URL_API = `/api/v1/staff/${user_id}`
    return axios.get(URL_API)
  }

  const postStaff = (newStaff) => {
    const URL_API = `/api/v1/staff/`
    return axios.post(URL_API, newStaff)
  }

  const putStaff = (user_id, updatedStaff) => {
    const URL_API = `/api/v1/staff/${user_id}`
    return axios.put(URL_API, updatedStaff)
  }

  const unassignStaffFromBuilding = (staffId) => {
    const URL_API = `/api/v1/staff/unassign/${staffId}`;
    return axios.put(URL_API);
}

const assignStaffToBuilding = (staffId, buildingId) => {
    const URL_API = `/api/v1/staff/assign/${staffId}`;     // URL_API is the api to assign staff to building with staffId on header
    return axios.put(URL_API, {building_id: buildingId});  // put request to assign staff to building with buildingId in body
}   // ==> need to have building_id in body to assign staff to building

  const deleteStaff = (user_id) => {
    const URL_API = `/api/v1/staff/unactive/${user_id}`
    return axios.put(URL_API)
  }

  //Customers Manager APIs___________________________________________________________
  const getCustomer = (user_id, name, email, phone, gender, date_of_birth, status) => {
    const URL_API = "/api/v1/customer"
    const data = {
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

  const getCustomerById = (user_id) => {
    const URL_API = `/api/v1/customer/${user_id}`
    return axios.get(URL_API)
  }

  const removeCustomer = (user_id) => {
    const URL_API = `/api/v1/customer/remove/${user_id}`
    return axios.put(URL_API)
  }

  //Bookings Manager APIs___________________________________________________________

  const getBookingByBuildingId = (building_id) =>  {
    const URL_API = `/api/v1/booking/get?building_id=${building_id}`
    return axios.get(URL_API)
  }

  //Buildings Manager APIs_________________________________________________________
  const getBuilding = () => {
    const URL_API = "/api/v1/building/"
    return axios.get(URL_API)

  }

  const getBuildingById = (building_id) => {
    const URL_API = `/api/v1/building/${building_id}`
    return axios.get(URL_API)
  }

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

  const putBuilding = (building_id, updatedBuilding) => {
    const URL_API = `/api/v1/building/${building_id}`
    return axios.put(URL_API, updatedBuilding)
  }

  const assignManagerToBuilding = (building_id, manager_id) => {
    const URL_API = `/api/v1/building/${building_id}/manager`
    return axios.put(URL_API, { manager_id })
  }

  const removeManagerFromBuilding = (building_id) => {
    const URL_API = `/api/v1/building/${building_id}/manager/remove`
    return axios.put(URL_API)
  }

  const deleteBuilding = (building_id) => {
    const URL_API = `/api/v1/building/${building_id}`
    return axios.delete(URL_API)
  }

  //Workspace Manager APIs_________________________________________________________
const getWorkspace = (workspace_id, workspace_type_name, building_id, workspace_name, price_per_hour, price_per_day, price_per_month, area, capacity, description, status) => {
  const URL_API = "/api/v1/workspace"
  const data = {
    workspace_id,
    workspace_type_name,
    building_id,
    workspace_name,
    price_per_hour,
    price_per_day,
    price_per_month,
    area,
    capacity,
    description,
    status,
  }
  return axios.get(URL_API)
}

const getWorkspaceById = (workspace_id) => {
  const URL_API = `/api/v1/workspace/${workspace_id}`
  return axios.get(URL_API)
}

const postWorkspace = (newWorkspace) => {
  const URL_API = "/api/v1/workspace"
  return axios.post(URL_API, newWorkspace)
}

const putWorkspace = (workspace_id, updatedWorkspace) => {
  const URL_API = `/api/v1/workspace/${workspace_id}`
  return axios.put(URL_API, updatedWorkspace)
}

const deleteWorkspace = (workspace_id) => {
  const URL_API = `/api/v1/workspace/delete/${workspace_id}`
  return axios.delete(URL_API)
}


  //Voucher Manager APIs___________________________________________________________
const getVoucher = (voucher_id, voucher_name, voucher_code, description, discount, quantity, expired_date, status) => {
  const URL_API = "/api/v1/voucher";
  const data = {
    voucher_id,
    voucher_name,
    voucher_code,
    description,
    discount,
    quantity,
    expired_date,
    status
  }
  return axios.get(URL_API)
}

const getVoucherById = (voucher_id) => {
  const URL_API = `/api/v1/voucher/${voucher_id}`
  return axios.get(URL_API)
}

const postVoucher = (newVoucher) => {
  const URL_API = "/api/v1/voucher"
  return axios.post(URL_API, newVoucher)
}

const putVoucher = (voucher_id, updatedVoucher) => {
  const URL_API = `/api/v1/voucher/${voucher_id}`
  return axios.put(URL_API, updatedVoucher)
}

const deleteVoucher = (voucher_id) => {
  const URL_API = `/api/v1/voucher/${voucher_id}`
  return axios.put(URL_API)
}

//Review manager APIs___________________________________________________________
const getReview = (review_id, booking_id, workspace_id, review_content, rating) => {
  const URL_API = "/api/v1/review"
  const data = {
    review_id,
    booking_id,
    workspace_id,
    review_content,
    rating
  }
  return axios.get(URL_API, data)
}

const getReviewById = (review_id) => {
  const URL_API = `/api/v1/review/${review_id}`
  return axios.get(URL_API)
}

const deleteReview = (review_id) => {
  const URL_API = `/api/v1/review/delete/${review_id}`
  return axios.put(URL_API)
}

  
//=========================================================================================================================
  export {
    getAmenity,
    getAmenityById,
    postAmenity,
    putAmenity,
    deleteAmenity,
    
    getWorkspaceType,
    getWorkspaceTypeById,
    postWorkspaceType,
    putWorkspaceType,
    deleteWorkspaceType,

    getWorkspace,
    getWorkspaceById,
    postWorkspace,
    putWorkspace,
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
    
  };