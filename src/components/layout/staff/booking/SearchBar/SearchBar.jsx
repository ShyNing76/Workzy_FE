import React, { useState } from 'react';
import './SearchBar.scss'
const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value); 
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        onSearch(''); // Reset search
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search by Booking ID"
                value={searchTerm}
                onChange={handleInputChange}
            />
            <button onClick={handleClearSearch}>Clear</button>
        </div>
    );
};

export default SearchBar;
