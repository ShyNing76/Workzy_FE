import React from 'react'
import { Link } from 'react-router-dom'
import "./ManagerHeader.scss"

import { AuthContext } from '../../../context/auth.context'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'


const ManagerHeader = () => {
  const { auth, setAuth, setRoleId } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear("access_token", "roleId");
    setAuth({
      isAuthenticated: false,
    });
    setRoleId(null);
    navigate("/");
  };

  return (
    <div className='workzy-manager-header-container'>
      <div className='workzy-manager-header-content'> {/* Div chung cho cả Link và button */}
        <Link to='/manager' className='title-manager-header'>
          <span>WORKZY MANAGER</span>
        </Link>
        <button onClick={handleLogout} className='btn'>Logout</button>
      </div>
    </div>
    
  )
}

export default ManagerHeader;
