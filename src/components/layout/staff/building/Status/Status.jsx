import React from "react";

const Status = () => {
    const statussItems = [
        { color: '#FFFFFF', label: 'Available'},
        { color: '#4CFC38', label: 'Booked'},
        { color: '#379CFA', label: 'In Process'},
        { color: '#FF0000', label: 'Under Maintenance'},
    ];

    return(
        <div className="status">
            {statussItems.map((item, index) => (
                <div key={index} className="status-item">
                    <span className="status-color" style={{backgroundColor: item.color}}></span>
                    <span className="status-label">{item.label}</span>
                </div>
            ))}

        </div>
    );
}

export default Status;