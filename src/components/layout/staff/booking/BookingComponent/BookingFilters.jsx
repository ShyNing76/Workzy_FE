import React from 'react';

const BookingFilters = ({ searchQuery, setSearchQuery, selectedDate, setSelectedDate }) => (
    <div className="flex justify-between items-center gap-6 w-full">
        {/* Search Input */}
        <div className="form-control w-full max-w-md">
            <label className="input-group">
                <input
                    type="text"
                    placeholder="Search by Booking ID"
                    className="input input-bordered w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </label>
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
