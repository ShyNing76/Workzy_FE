import React from 'react';

const BookingFilters = ({ searchQuery, setSearchQuery, selectedDate, setSelectedDate }) => (
    <div className="filters-row" style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        gap: '20px'
    }}>
        <div className="search-container" style={{ 
            display: 'flex',
            alignItems: 'center',
            flex: '1'
        }}>
            <input
                type="text"
                placeholder="Search by Booking ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                style={{
                    padding: '8px',
                    marginRight: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    outline: 'none',
                    flex: '1'
                }}
            />
        </div>
        <div className="filter-section" style={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="input input-bordered input-sm"
                style={{
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    outline: 'none'
                }}
            />
        </div>
    </div>
);

export default BookingFilters;