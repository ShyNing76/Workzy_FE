import React, { useEffect, useState } from "react";
import {
  MdLockOutline,
  MdOutlineEmail,
  MdOutlineLocalPhone,
} from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import defaultProfile from "../../assets/default-profile.jpg";
import {
  getUserAuthen,
  putUpdateCustomerInfo,
  putUpdateCustomerPassword,
} from "../../config/api";
import { convertDateToYYYYMMDD } from "../../components/context/dateFormat";
import { toast } from "react-toastify";
import ModalUpdatePassword from "../../components/layout/UserModal/UpdatePasswordModal/ModalUpdatePassword";
import { useOutletContext } from "react-router-dom";

const Profile = (props) => {
  const { handleUpdate } = useOutletContext();

  const [avatar, setAvatar] = useState(defaultProfile);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // FetchUserInfo
  const fetchUserInfo = async () => {
    const res = await getUserAuthen();

    if (res && res.data && res.err === 1) {
      setName(res?.data?.name);
      setDate(convertDateToYYYYMMDD(res?.data?.Customer?.date_of_birth));
      setGender(res?.data?.Customer?.gender);
      setPhone(res?.data?.Customer?.phone);
      setEmail(res?.data?.email);
    }
  };

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
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setAvatar(imageURL);
    }
  };

  const handleClickFileHidden = () => {
    document.getElementById("avatarInput").click();
  };

  // Handle submit
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await putUpdateCustomerInfo(name, date, gender);

      if (res && res.err === 1) {
        setUpdateSuccess(true);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="max-w-5xl container mx-auto p-8 bg-white rounded-lg shadow-lg">
        <div className="flex">
          {/* Left Content */}
          <div className="left-content w-1/2 pr-8">
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
                  <img src={avatar} alt="User avatar" />
                </div>
                {/* Pencil Icon */}
                <div className="absolute bottom-0 right-0 bg-gray-300 p-1 rounded-full shadow-md">
                  <GoPencil className="text-gray-600 w-5 h-5" />
                </div>
              </div>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
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
              <label className="block font-semibold mb-2">Date of Birth</label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={date || ""}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block font-semibold mb-2">Gender</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={handleGenderChange}
                    className="radio  mr-2"
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
                    className="radio  mr-2"
                  />
                  <span>Female</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={gender === "Other"}
                    onChange={handleGenderChange}
                    className="radio mr-2"
                  />
                  <span>Other</span>
                </label>
              </div>
            </div>

            <div className="text-center mt-10">
              {!loading ? (
                <button className="btn btn-neutral " onClick={handleSubmit}>
                  Save changes
                </button>
              ) : (
                <button className="btn">
                  <span className="loading loading-spinner"></span>
                  loading
                </button>
              )}
            </div>
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
              <button className="btn btn-outline btn-sm">Update</button>
            </div>

            {/* Email */}
            <h1 className="text-xl font-semibold mb-4">Email</h1>
            <div className="flex items-center mb-4 justify-between">
              <div className="flex">
                <MdOutlineEmail className="text-xl mr-3" />
                <p>{email ? email : "No Email"}</p>
              </div>
              <button className="btn btn-outline btn-sm">Update</button>
            </div>

            {/* Change Password */}
            <h1 className="text-xl font-semibold mb-4">Security</h1>
            <div className="flex items-center mb-4 justify-between">
              <div className="flex">
                <MdLockOutline className="text-xl mr-3" />
                <p>Password</p>
              </div>
              <button
                className="btn btn-outline btn-sm"
                onClick={() =>
                  document.getElementById("modal-update-password").showModal()
                }
              >
                Update
              </button>
            </div>
            <div className="flex items-center mb-4 justify-between">
              <div className="flex">
                <FaRegTrashAlt className="text-xl mr-3" />
                <p>Request account deletion</p>
              </div>
              <button className="btn btn-outline btn-sm">Request</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Update Password  */}
      <ModalUpdatePassword />
    </>
  );
};

export default Profile;
