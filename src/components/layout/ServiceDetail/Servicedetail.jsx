import React from 'react'
import "./Servicedetail.scss"
const Servicedetail = ( props ) => {
    const {Icon, detail} = props
  return (
    <div className="service-detail-container">
      <div className='desciption-icon'>
        <Icon/>
        <span>{detail}</span>
      </div>
     
    </div>
  )
}

export default Servicedetail
