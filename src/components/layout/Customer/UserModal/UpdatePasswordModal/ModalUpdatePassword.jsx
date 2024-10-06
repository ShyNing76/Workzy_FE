import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { putUpdateCustomerPassword } from "../../../../../config/api";
import { toast } from "react-toastify";

const ModalUpdatePassword = (props) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [currentPassWord, setCurrentPassWord] = useState("");
  const [newPassWord, setNewPassWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Show password
  const handleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };
  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  // Handle Change password
  const handleChangePassword = async () => {
    setIsLoading(true);

    try {
      const res = await putUpdateCustomerPassword(currentPassWord, newPassWord);
      const modal = document.getElementById("modal-update-password");

      if (res && res.err === 0) {
        toast.success(res.message);
        if (modal) {
          setCurrentPassWord("");
          setNewPassWord("");
          modal.close();
        }
      } else {
        toast.error(res.message || "Unknown error occurred");
        if (modal) {
          setCurrentPassWord("");
          setNewPassWord("");
          modal.close();
        }
      }
    } catch (error) {
      toast.error(
        "API Error: ",
        error.response ? error.response.data : error.message
      );
    }
    setIsLoading(false);
  };

  return (
    <>
      <dialog id="modal-update-password" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Change Password!</h3>
          <form>
            <div className="form-control mt-4" style={{ display: "none" }}>
              {/* Ẩn trường nhập */}
              <label className="label">Username</label>
              <input
                type="text"
                className="input input-bordered w-full"
                // value={username}
                // onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                autoComplete="username" // Thêm thuộc tính autocomplete
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">Current Password</label>
              <div className="password-container">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  className="input input-bordered w-full password-input"
                  value={currentPassWord}
                  onChange={(e) => setCurrentPassWord(e.target.value)}
                  placeholder="Enter your current password"
                  required
                  autoComplete="current-password"
                />
                {showCurrentPassword ? (
                  <FaEyeSlash
                    className="eye-icon"
                    onClick={handleShowCurrentPassword}
                  />
                ) : (
                  <FaEye
                    className="eye-icon"
                    onClick={handleShowCurrentPassword}
                  />
                )}
              </div>
            </div>
            <div className="form-control mt-4">
              <label className="label">New Password</label>
              <div className="password-container">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="input input-bordered w-full password-input"
                  value={newPassWord}
                  onChange={(e) => setNewPassWord(e.target.value)}
                  placeholder="Enter your new password"
                  autoComplete="new-password"
                  required
                />
                {showNewPassword ? (
                  <FaEyeSlash
                    className="eye-icon"
                    onClick={handleShowNewPassword}
                  />
                ) : (
                  <FaEye className="eye-icon" onClick={handleShowNewPassword} />
                )}
              </div>
            </div>
          </form>

          <div className="mt-8 text-center">
            {!isLoading ? (
              <button
                className="btn btn-active btn-neutral"
                onClick={handleChangePassword}
              >
                Save Password
              </button>
            ) : (
              <button className="btn">
                <span className="loading loading-spinner"></span>
                loading
              </button>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ModalUpdatePassword;
