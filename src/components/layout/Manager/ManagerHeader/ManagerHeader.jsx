import React from 'react'
import { Link } from 'react-router-dom'
import "./ManagerHeader.scss"
const ManagerHeader = () => {
  return (
    <div className='workzy-manager-header-container'>
      <Link to='/manager'><span className='text-3xl font-black title-manager-header'>WORKZY MANAGER</span></Link>
    </div>
  )
}

export default ManagerHeader
