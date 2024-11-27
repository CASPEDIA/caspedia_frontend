import React from 'react'
import "./Navigation.css"
// import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { hasAuth } from 'hooks/userHooks';


export default function Navigation() {
  const [cookies,,] = useCookies(["jwtToken", "nanoid"]);
  const navigate = useNavigate();
  const handleMyPage = () => {
    if(hasAuth(cookies)){
      navigate(`/user/${cookies.nanoid}`)
    } else {
      alert("로그인 후 이용하세요");
    }
  }
  return (
    <div className='custom-navigation'>
      <img src="/img/F5_toHome.png" alt="Home" className="nav-icon" onClick={() => navigate('/')}/>
      <div></div>
      <img src="/img/F5_toMypage.png" alt="My Page" className="nav-icon" onClick={() => handleMyPage()}/>
    </div>
  )
}
