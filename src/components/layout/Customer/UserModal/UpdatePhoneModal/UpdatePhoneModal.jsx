import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  putUpdateCustomerPassword,
  putUpdatePhoneNumber,
} from "../../../../../config/api";
import { toast } from "react-toastify";

const UpdatePhoneModal = (props) => {
  const { setUpdateSuccess } = props;

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //   validate Phone number
  function validateVietnamPhoneNumber(phone) {
    // Regex for 10-digit Vietnam phone numbers starting with +84 or 0
    const vietnamPhoneRegex = /^(?:\+84|0)(3|5|7|8|9)[0-9]{8}$/;

    return vietnamPhoneRegex.test(phone);
  }

  // Handle Change phone number
  const handleChangePhoneNumber = async () => {
    setIsLoading(true);

    try {
      const modal = document.getElementById("modal-update-phone");

      if (!validateVietnamPhoneNumber(phoneNumber)) {
        toast.error("Invalid Phone number");
        if (modal) {
          setPhoneNumber("");
          modal.close();
        }
        setIsLoading(false);
        return;
      }

      const res = await putUpdatePhoneNumber(phoneNumber);

      if (res && res.err === 0) {
        toast.success(res.message);
        setUpdateSuccess(true);
        if (modal) {
          setPhoneNumber("");
          modal.close();
        }
      } else {
        toast.error(res.message || "Unknown error occurred");
        if (modal) {
          setPhoneNumber("");
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
      <dialog id="modal-update-phone" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Change Phone Number!</h3>
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
              <label className="label">Phone Number</label>
              <div className="password-container">
                <input
                  type="text"
                  className="input input-bordered w-full password-input"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your current phone"
                  required
                  autoComplete=""
                />
              </div>
            </div>
          </form>

          <div className="mt-8 text-center">
            {!isLoading ? (
              <button
                className="btn btn-active btn-neutral"
                onClick={handleChangePhoneNumber}
              >
                Save Phone
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

export default UpdatePhoneModal;
