import React from "react";

const Pagination = (props) => {
  const { page, totalPages, setPage } = props;
  const maxVisiblePages = 5; // Số lượng nút trang tối đa hiển thị cùng lúc

  // Xác định phạm vi trang xung quanh trang hiện tại
  const startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Nếu phạm vi vượt quá giới hạn cuối, điều chỉnh lại startPage
  const adjustedStartPage = Math.max(1, endPage - maxVisiblePages + 1);
  const pageCount =
    endPage >= adjustedStartPage ? endPage - adjustedStartPage + 1 : 0; // Đảm bảo độ dài không âm

  return (
    <div>
      <div className="join flex justify-center mb-10">
        <button
          className="join-item btn"
          onClick={() => setPage(page > 1 ? page - 1 : 1)} // Go to previous page
          disabled={page === 1}
        >
          Prev
        </button>

        {/* Trang đầu tiên */}
        {adjustedStartPage > 1 && (
          <>
            <button
              className={`join-item btn ${page === 1 ? "btn-active" : ""}`}
              onClick={() => setPage(1)}
            >
              1
            </button>
            {adjustedStartPage > 2 && <span className="join-item">...</span>}
          </>
        )}

        {/* Các trang trong phạm vi */}
        {pageCount > 0 &&
          [...Array(pageCount)].map((_, index) => {
            const pageNumber = adjustedStartPage + index;
            return (
              <button
                key={pageNumber}
                className={`join-item btn ${
                  page === pageNumber ? "btn-active" : ""
                }`}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}

        {/* Trang cuối */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="join-item">...</span>}
            <button
              className={`join-item btn ${
                page === totalPages ? "btn-active" : ""
              }`}
              onClick={() => setPage(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          className="join-item btn"
          onClick={() => setPage(page < totalPages ? page + 1 : totalPages)} // Go to next page
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
