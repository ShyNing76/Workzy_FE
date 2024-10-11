import React from "react";

const Pagination = (props) => {
  const { page, totalPages, setPage } = props;

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

        {[...Array(totalPages)].map(
          (
            _,
            index // Dynamically generate the correct number of pages
          ) => (
            <button
              key={index + 1}
              className={`join-item btn ${
                page === index + 1 ? "btn-active" : ""
              }`}
              onClick={() => setPage(index + 1)} // Go to specific page
            >
              {index + 1}
            </button>
          )
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
