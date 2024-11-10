import React, { useEffect, useState } from "react";
import {
  MdLockOutline,
  MdOutlineEmail,
  MdOutlineLocalPhone,
} from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import defaultProfile from "../../../assets/default-profile.jpg";
import {
  getUserAuthen,
  putUpdateCustomerInfo,
  putUpdateCustomerPassword,
  putUpdateImage,
} from "../../../config/api";
import { convertDateToYYYYMMDD } from "../../../components/context/dateFormat";
import { toast, ToastContainer } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import ModalUpdatePassword from "../../../components/layout/Customer/UserModal/UpdatePasswordModal/ModalUpdatePassword";
import UpdatePhoneModal from "../../../components/layout/Customer/UserModal/UpdatePhoneModal/UpdatePhoneModal";

const Profile = (props) => {
  const { handleUpdate } = useOutletContext();

  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [googleToken, setGoogleToken] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    date: "",
    gender: "",
  });
  const AUTO_DISMISS_DURATION = 3000; // 3 seconds

  useEffect(() => {
    setSuccessMessage("");
  }, [name, date, gender]);

  // FetchUserInfo
  const fetchUserInfo = async () => {
    const res = await getUserAuthen();

    const data = res?.data;

    if (res && res.data && res.err === 0) {
      setName(data?.name);
      setDate(convertDateToYYYYMMDD(data?.date_of_birth));
      setGender(data?.gender);
      setPhone(data?.phone);
      setEmail(data?.email);
      setAvatar(data?.image);
      setGoogleToken(data?.google_token || null);
    }
  };

  useEffect(() => {
    let timeoutId;
    if (successMessage) {
      timeoutId = setTimeout(() => {
        setSuccessMessage("");
      }, AUTO_DISMISS_DURATION);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [successMessage]);

  // Call function in the first time
  useEffect(() => {
    fetchUserInfo();
  }, []);

  // When update it will rerender
  useEffect(() => {
    if (updateSuccess) {
      fetchUserInfo();
      setUpdateSuccess(false);
      handleUpdate();
    }
  }, [updateSuccess]);

  // Handle gender Change
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  // handleAvaterChange
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setAvatar(imageURL);

      const res = await putUpdateImage(file);

      if (res && res.err === 0) {
        setUpdateSuccess(true);
        toast.success(res.message);
      }
    }
  };

  const handleClickFileHidden = () => {
    document.getElementById("avatarInput").click();
  };

  // Handle submit
  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Reset errors
    setErrors({
      name: "",
      date: "",
      gender: "",
    });

    let hasErrors = false;
    const today = new Date();
    const dob = new Date(date);
    const maxAgeLimit = 120;
    const minDate = new Date(
      today.getFullYear() - maxAgeLimit,
      today.getMonth(),
      today.getDate()
    );

    // Validate name
    if (!name) {
      setErrors((prev) => ({
        ...prev,
        name: "Name needs to be filled",
      }));
      hasErrors = true;
    }

    // Validate date of birth
    if (!date) {
      setErrors((prev) => ({
        ...prev,
        date: "Date of Birth needs to be filled",
      }));
      hasErrors = true;
    } else if (!dob || isNaN(dob.getTime())) {
      setErrors((prev) => ({
        ...prev,
        date: "Invalid date format",
      }));
      hasErrors = true;
    } else if (dob >= today) {
      setErrors((prev) => ({
        ...prev,
        date: `Date of Birth cannot be larger than ${today.toLocaleDateString()}`,
      }));
      hasErrors = true;
    } else if (dob <= minDate) {
      setErrors((prev) => ({
        ...prev,
        date: `Date of Birth cannot be more than ${maxAgeLimit} years ago`,
      }));
      hasErrors = true;
    }

    // Validate gender
    if (!gender) {
      setErrors((prev) => ({
        ...prev,
        gender: "Gender needs to be selected",
      }));
      hasErrors = true;
    }

    if (hasErrors) {
      setLoading(false);
      return;
    }

    try {
      const res = await putUpdateCustomerInfo(name, date, gender);

      if (res && res.err === 0) {
        setUpdateSuccess(true);
        setSuccessMessage("Profile updated successfully!");
        window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top to show success message
      } else {
        setErrors((prev) => ({
          ...prev,
          submit: res.message,
        }));
      }
    } catch (error) {
      console.error(error);
      setErrors((prev) => ({
        ...prev,
        submit: "An error occurred while updating profile",
      }));
    }
    setLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="max-w-5xl container mx-auto my-20 p-8 bg-white rounded-lg shadow-lg">
        {/* Success Message */}
        {successMessage && (
          <div className="alert alert-success mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{successMessage}</span>
          </div>
        )}
        <div className="flex">
          {/* Left Content */}
          <div className="left-content w-1/2 pr-8">
            <form action="" onSubmit={handleSubmitProfile}>
              <h1 className="text-2xl font-semibold mb-4">
                Personal Information
              </h1>

              {/* Avatar and Name */}
              <div className="avatar-name flex items-center mb-6 cursor-pointer">
                <div
                  className="relative avatar mr-4"
                  onClick={handleClickFileHidden}
                >
                  <div className="w-36 rounded-full ring-offset-base-100 ring ring-offset-2 ring-neutral">
                    <img
                      src={avatar === null ? defaultProfile : avatar}
                      alt="User avatar"
                    />
                  </div>
                  {/* Pencil Icon */}
                  <div className="absolute bottom-0 right-0 bg-gray-300 p-1 rounded-full shadow-md">
                    <GoPencil className="text-gray-600 w-5 h-5" />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`input input-bordered w-full max-w-xs ${
                      errors.name ? "input-error" : ""
                    }`}
                  />
                  {errors.name && (
                    <span className="text-error text-sm mt-1">
                      {errors.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="avatarInput"
                onChange={handleAvatarChange}
              />

              {/* Date of Birth */}
              <div className="mb-4">
                <label className="block font-semibold mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className={`input input-bordered w-full ${
                    errors.date ? "input-error" : ""
                  }`}
                  value={date || ""}
                  onChange={(e) => setDate(e.target.value)}
                />
                {errors.date && (
                  <span className="text-error text-sm mt-1">{errors.date}</span>
                )}
              </div>

              {/* Gender */}
              <div className="mb-4">
                <label className="block font-semibold mb-2">Gender</label>
                <div className="flex flex-col">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={gender === "Male"}
                        onChange={handleGenderChange}
                        className={`radio mr-2 ${
                          errors.gender ? "radio-error" : ""
                        }`}
                      />
                      <span>Male</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={gender === "Female"}
                        onChange={handleGenderChange}
                        className={`radio mr-2 ${
                          errors.gender ? "radio-error" : ""
                        }`}
                      />
                      <span>Female</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Others"
                        checked={gender === "Others"}
                        onChange={handleGenderChange}
                        className={`radio mr-2 ${
                          errors.gender ? "radio-error" : ""
                        }`}
                      />
                      <span>Others</span>
                    </label>
                  </div>
                  {errors.gender && (
                    <span className="text-error text-sm mt-1">
                      {errors.gender}
                    </span>
                  )}
                </div>
              </div>

              {/* General submit error */}
              {errors.submit && (
                <div className="alert alert-error mb-4">
                  <span>{errors.submit}</span>
                </div>
              )}

              <div className="text-center mt-10">
                {!loading ? (
                  <button type="submit" className="btn btn-neutral">
                    Save changes
                  </button>
                ) : (
                  <button className="btn">
                    <span className="loading loading-spinner"></span>
                    loading
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Divider Line */}
          <div className="border-l border-gray-300"></div>

          {/* Right Content */}
          <div className="right-content w-1/2 pl-8">
            {/* Phone Number */}
            <h1 className="text-xl font-semibold mb-4">Phone Number</h1>
            <div className="flex items-center mb-4 justify-between">
              <div className="flex">
                <MdOutlineLocalPhone className="text-xl mr-3" />
                <p>{phone ? phone : "No Phone Number"}</p>
              </div>
              <button
                className="btn btn-outline btn-sm"
                onClick={() =>
                  document.getElementById("modal-update-phone").showModal()
                }
              >
                {phone ? "Update" : "Add"}
              </button>
            </div>

            {/* Email */}
            <h1 className="text-xl font-semibold mb-4">Email</h1>
            <div className="flex items-center mb-4 justify-between">
              <div className="flex">
                <MdOutlineEmail className="text-xl mr-3" />
                <p>{email ? email : "No Email"}</p>
              </div>
              {/* <button className="btn btn-outline btn-sm">Update</button> */}
            </div>

            {/* Change Password */}
            <h1 className="text-xl font-semibold mb-4">Security</h1>
            <div className="flex items-center mb-4 justify-between">
              <div className="flex">
                <MdLockOutline className="text-xl mr-3" />
                <p>Password</p>
              </div>
              <button
                className={`btn ${
                  googleToken ? "btn-disabled" : "btn-outline"
                }  btn-sm`}
                onClick={() =>
                  document.getElementById("modal-update-password").showModal()
                }
              >
                Update
              </button>
            </div>
            {/* <div className="flex items-center mb-4 justify-between">
              <div className="flex">
                <FaRegTrashAlt className="text-xl mr-3" />
                <p>Request account deletion</p>
              </div>
              <button className="btn btn-outline btn-sm">Request</button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Modal Update Password  */}
      <ModalUpdatePassword />
      <UpdatePhoneModal setUpdateSuccess={setUpdateSuccess} />
    </>
  );
};

export default Profile;
