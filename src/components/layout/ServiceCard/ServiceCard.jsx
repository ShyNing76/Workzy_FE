import React from 'react'
import './ServiceCard.scss'
import { BsPersonFill } from "react-icons/bs";

const ServiceCard = (props) => {
    const { title, description } = props
  return (
    <div className='service-card'>
        <BsPersonFill className='description-icon'/>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default ServiceCard
