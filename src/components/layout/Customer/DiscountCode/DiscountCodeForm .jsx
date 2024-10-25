import React, { useState } from "react";
import { getVoucherValid } from "../../../../config/api";

const DiscountCodeForm = (props) => {
  const {
    discountCode,
    setDiscountCode,
    message,
    setMessage,
    setDiscount,
    setVoucherId,
  } = props;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!discountCode.trim()) {
      setMessage({
        type: "error",
        content: "Please enter coupon code",
      });
      return;
    }

    setLoading(true);
    try {
      // Giả lập API call - thay thế bằng API thật của bạn
      const res = await getVoucherValid(discountCode);

      if (res && res.err === 0) {
        setMessage({
          type: "success",
          content: `Coupon code applied successfully! You get a discount ${
            res.data.discount * 100
          }%`,
        });
        setVoucherId(res.data.voucher_id);
        setDiscount(res.data.discount);
      } else {
        setMessage({
          type: "error",
          content: res.message,
        });
        setDiscount(0);
      }
    } catch (error) {
      setMessage({
        type: "error",
        content: "An error occurred, please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl space-y-4 mb-3">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Enter coupon code"
          className="input input-bordered flex-1"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
        />
        <button
          type="submit"
          className={`btn btn-neutral min-w-[120px] `}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading loading-spinner"></span>
              Processing
            </>
          ) : (
            "Apply"
          )}
        </button>
      </form>

      {message.content && (
        <div
          className={`alert ${
            message.type === "error" ? "alert-error" : "alert-success"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            {message.type === "success" ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            )}
          </svg>
          <span>{message.content}</span>
        </div>
      )}
    </div>
  );
};

export default DiscountCodeForm;
