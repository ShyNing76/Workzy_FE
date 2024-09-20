import React from 'react'
import './Filter.scss'
import { CiLocationOn } from "react-icons/ci";
import { BsPersonWorkspace } from "react-icons/bs";


const Filter = () => {
  return (
    <div className="filter-container" >
        <h1>Working environment improves quality of life</h1>
        <div className='filter-container-child'>
        <h2>Do it your way, we've got you covered.</h2>
        <p>From ready-to-use offices to shared office space, meeting rooms and technology, discover workspace solutions for every team.</p>
        <div className='search-container'>
        <form>
        <div className="input-container"> 
        <CiLocationOn className="location-icon" /> 
        <select className="select select-bordered w-full max-w-xs select-location">          
            <option disabled selected>Select location</option>
            <option>Ho Chi Minh city</option>
            <option>Ha Noi</option>
        </select>
        </div>

        <div className="input-container"> 
        <BsPersonWorkspace className='workspace-icon'/>
        <select className="select select-bordered w-full max-w-xs select-workspace">
            <option disabled selected>Select workspace type</option>
            <option>Type 1</option>
            <option>Type 2</option>
            <option>Type 3</option>
            <option>Type 4</option>
            <option>Type 5</option>
        </select> 
        </div>
        <button className="btn">Search</button>
        </form>
        </div>
        </div>
    </div>
  )
}

export default Filter
