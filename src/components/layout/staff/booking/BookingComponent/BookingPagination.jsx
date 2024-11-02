import React from 'react';

const BookingPagination = ({ currentPage, totalFilteredPages, setCurrentPage, isLoading }) => (
    <div className="pagination">
        <button 
            className='btn btn-xs btn-outline'
            style={{ marginRight: "20px" }}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1 || isLoading}
        >
            Previous
        </button>
        <span style={{ marginRight: "20px"}}>
            {`Page ${currentPage} of ${totalFilteredPages || 1}`}
        </span>
        <button 
            className='btn btn-xs btn-outline'
            onClick={() => setCurrentPage(prev => Math.min(totalFilteredPages, prev + 1))}
            disabled={currentPage === totalFilteredPages || isLoading}
        >
            Next
        </button>
    </div>
);

export default BookingPagination;