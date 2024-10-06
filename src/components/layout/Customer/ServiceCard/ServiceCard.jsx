import React from 'react'
import './ServiceCard.scss'
import { useNavigate } from 'react-router-dom'


const ServiceCard = (props) => {
    const { title, description, Icon, link } = props

  const navigate = useNavigate();
  const handleOnclick = () => {
      navigate (link)
  }
  return (
    <div className='service-card' onClick={handleOnclick}>
        <div className='description-icon'>
          <Icon/>
        </div>
        
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default ServiceCard
