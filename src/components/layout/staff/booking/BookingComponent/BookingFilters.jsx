import React from 'react';

const BookingFilters = ({ searchQuery, setSearchQuery, selectedDate, setSelectedDate }) => (
    <div className="flex justify-between items-center gap-6 w-full">
        {/* Search Input */}
        <div className="form-control w-full max-w-md flex items-center">
            <div className="flex w-full">
                <input
                    type="text"
                    placeholder="Search by Booking ID"
                    className="input input-bordered w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    className="btn btn-active ml-2"
                    onClick={() => setSearchQuery('')}
                >
                    Clear
                </button>
            </div>
        </div>

        {/* Date Filter */}
        <div className="form-control w-auto">
            <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="input input-bordered"
            />
        </div>
    </div>
);

export default BookingFilters;