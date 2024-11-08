import React from 'react';
import { FiSearch } from "react-icons/fi";

const BookingFilters = ({ searchQuery, setSearchQuery, selectedDate, setSelectedDate }) => (
    <div className="filters-row" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        gap: '300px',  
        width: '100%' 
    }}>
        <div className="form-control" style={{ flex: 1 }}>
            <div className="join w-full" style={{ display: 'flex', alignItems: 'center' }}>
                <div className="join-item bg-base-200 px-3 flex items-center" style={{ height: '38px' }}>
                    <FiSearch className="w-5 h-5 text-base-content/70" style={{ height: '20px', width: '20px' }} />
                </div>
                <input
                    type="text"
                    placeholder="Search by Booking ID"
                    className="input input-bordered join-item w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        padding: '6px 12px',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        outline: 'none',
                        flex: 1,
                        height: '38px', 
                    }}
                />
            </div>
        </div>
        
        <div className="filter-section" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginLeft: 'auto', // Đẩy filter-section sang bên phải
            width: 'auto' // Đảm bảo kích thước không bị thay đổi
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
                    outline: 'none',
                    width: '100%',
                    height: '40px',
                }}
            />
        </div>
    </div>
);

export default BookingFilters;
