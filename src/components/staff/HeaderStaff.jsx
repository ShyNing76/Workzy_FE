import React, {useState} from "react";
const HeaderStaff = () => {
    const [location, setLocation] = useState('Ho Chi Minh');

    const changeLocation = () => {
        setLocation(prevLocation =>
            prevLocation === 'Ho Chi Minh' ? 'Ha Noi' : 'Ho Chi Minh'
        );
    };
    return (
        <header className="header">
            <div className="logo-title">
                <div className="logo">WY</div>
                <h1>Workzy Staff at {location}</h1> 
            </div>
            <button onClick={changeLocation}>Change Location</button> 
        </header>
    );
}

export default HeaderStaff;