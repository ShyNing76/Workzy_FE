import React from 'react';

const BookingPagination = ({ currentPage, totalFilteredPages, setCurrentPage, isLoading }) => (
    <div className="join flex justify-center mb-10">
        <button 
            className='join-item btn'
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1 || isLoading}
        >
            Prev
        </button>
        <span className='join-item btn'>
            {`${currentPage}`}
        </span>
        <button 
            className='join-item btn'
            onClick={() => setCurrentPage(prev => Math.min(totalFilteredPages, prev + 1))}
            disabled={currentPage === totalFilteredPages || isLoading}
        >
            Next
        </button>
    </div>
);

export default BookingPagination;
