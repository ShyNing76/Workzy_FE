import axios from "./axios.customize";

//Amenities Manager APIs_________________________________________________________
const getAmenity = (page, limit) => {
    const URL_API = `/api/v1/amenity?page=${page}&limit=${limit}`;
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
    return axios.put(URL_API, updatedAmenity);
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

const getWorkspaceTypeById = (workspace_type_id) => {
    const URL_API = `/api/v1/workspace-type/${workspace_type_id}`;
    return axios.get(URL_API);
};

const postWorkspaceType = (newWorkspaceType) => {
    const URL_API = "/api/v1/workspace-type";

    const formData = new FormData();
    if (newWorkspaceType.image)
        formData.append("image", newWorkspaceType.image);
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
    return axios.put(URL_API, updatedWorkspaceType);
};

const deleteWorkspaceType = (workspace_type_id) => {
    const URL_API = `/api/v1/workspace-type/delete/${workspace_type_id}`;
    
    return axios.put(URL_API);
};

//Managers Manager APIs__________________________________________________________

const getManager = (user_id, name, gender, date_of_birth, status) => {
    const URL_API = "/api/v1/manager";
    const data = {
        user_id,
        name,
        gender,
        date_of_birth,
        status,
    };
    return axios.get(URL_API, data);
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

const getStaff = (
    user_id,
    name,
    email,
    phone,
    gender,
    date_of_birth,
    status
) => {
    const URL_API = "/api/v1/staff";
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

const getCustomerById = (user_id) => {
    const URL_API = `/api/v1/customer/${user_id}`;
    return axios.get(URL_API);
};

const removeCustomer = (user_id) => {
    const URL_API = `/api/v1/customer/remove/${user_id}`;
    return axios.put(URL_API);
};

//Bookings Manager APIs___________________________________________________________

const getBookingByBuildingId = (building_id) => {
    const URL_API = `/api/v1/booking/get?building_id=${building_id}`;
    return axios.get(URL_API);
};

//Buildings Manager APIs_________________________________________________________
const getBuilding = (
    building_id,
    manager_id,
    building_name,
    location,
    address,
    google_address,
    description,
    rating,
    status,
    BuildingImages
) => {
    const URL_API = "/api/v1/building";
    const data = {
        building_id,
        manager_id,
        building_name,
        location,
        address,
        google_address,
        description,
        rating,
        status,
        BuildingImages,
    };
    return axios.get(URL_API, data);
};

const getBuildingById = (building_id) => {
    const URL_API = `/api/v1/building/${building_id}`;
    return axios.get(URL_API);
};

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
    const URL_API = `/api/v1/building/${building_id}`;
    return axios.put(URL_API, updatedBuilding);
};

const assignManagerToBuilding = (building_id, manager_id) => {
    const URL_API = `/api/v1/building/${building_id}/manager`;
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
const getWorkspace = (
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
    status
) => {
    const URL_API = "/api/v1/workspace";
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
    };
    return axios.get(URL_API);
};

const getWorkspaceById = (workspace_id) => {
    const URL_API = `/api/v1/workspace/${workspace_id}`;
    return axios.get(URL_API);
};

const postWorkspace = (newWorkspace) => {
    const URL_API = "/api/v1/workspace";
    return axios.post(URL_API, newWorkspace);
};

const putWorkspace = (workspace_id, updatedWorkspace) => {
    const URL_API = `/api/v1/workspace/${workspace_id}`;
    return axios.put(URL_API, updatedWorkspace);
};

const deleteWorkspace = (workspace_id) => {
    const URL_API = `/api/v1/workspace/delete/${workspace_id}`;
    return axios.delete(URL_API);
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
const getReview = (
    review_id,
    booking_id,
    workspace_id,
    review_content,
    rating
) => {
    const URL_API = "/api/v1/review";
    const data = {
        review_id,
        booking_id,
        workspace_id,
        review_content,
        rating,
    };
    return axios.get(URL_API, data);
};

const getReviewById = (review_id) => {
    const URL_API = `/api/v1/review/${review_id}`;
    return axios.get(URL_API);
};

const deleteReview = (review_id) => {
    const URL_API = `/api/v1/review/delete/${review_id}`;
    return axios.put(URL_API);
};

//=========================================================================================================================
export {
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
