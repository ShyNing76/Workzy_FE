import React from 'react'
import './ServiceCard.scss'


const ServiceCard = (props) => {
    const { title, description, Icon } = props
  return (
    <div className='service-card'>
        <div className='description-icon'>
          <Icon/>
        </div>
        
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default ServiceCard
