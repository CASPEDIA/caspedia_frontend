import React from 'react'
import "./Navigation.css"
// import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


export default function Navigation() {
  const navigate = useNavigate();
  return (
    <div className='custom-navigation'>
      <img src="/img/F5_toHome.png" alt="Home" className="nav-icon" onClick={() => navigate('/')}/>
      <div></div>
      <img src="/img/F5_toMypage.png" alt="My Page" className="nav-icon" onClick={() => navigate('/user/3')}/>
    </div>
  )
}
