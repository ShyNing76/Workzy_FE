import React from 'react'
import "./BenefitService.scss"
import Servicedetail from '../ServiceDetail/Servicedetail'

const BenefitService = (props) => {
    const {detail, services} = props
  return (
    <div className='benefit-service-container'>
        <div className='benefit-container'>
            <h2>Benefit</h2>
            <p>{detail}</p>
            <div className="benefit-icons">
        {services.map((service, index ) => (
          <Servicedetail
            key={index}
            Icon={service.Icon}
            detail={service.detail}
          />
        ))}
      </div>
        </div>
       

        <div className="steps-container">
        <h3>Steps:</h3>
        <div className="step">
          <span className="step-number">1</span>
          <div className="step-content">
            <strong>Discover</strong>
            <p>Explore the location and workspace</p>
          </div>
        </div>
        <div className="step">
          <span className="step-number">2</span>
          <div className="step-content">
            <strong>Book and Get Consultation</strong>
            <p>Set the date and time, specify your requirements and additional services. Receive consultation from Workzy and book your session.</p>
          </div>
        </div>
        <div className="step">
          <span className="step-number">3</span>
          <div className="step-content">
            <strong>Utilize</strong>
            <p>Confirm and check in</p>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default BenefitService
