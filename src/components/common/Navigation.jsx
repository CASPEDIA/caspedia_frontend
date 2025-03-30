import React from 'react'
import "./Navigation.css"
import { useNavigate } from 'react-router-dom'
import { useHasAuth } from 'hooks/userHooks';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/userstate/atom';
import { useHasAdmin } from 'hooks/adminHooks';


export default function Navigation() {
  const hasAuth = useHasAuth();
  const hasAdmin = useHasAdmin();
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const handleMyPage = () => {
    if(hasAuth()){
      navigate(`/user/${user.nanoid}`)
    } else {
      alert("로그인 후 이용하세요");
    }
  }
  return (
    <div className='custom-navigation'>
      <img src="/img/F5_toHome.png" alt="Home" className="nav-icon custom-link" onClick={() => navigate('/')}/>
      { hasAdmin() ?
        <img src="/img/F5_toAdmin.png" alt="Admin" className="nav-icon custom-link" onClick={() => navigate('/admin')}/>
        :
        <div></div>
      }
      <img src="/img/F5_toMypage.png" alt="My Page" className="nav-icon" onClick={() => handleMyPage()}/>
    </div>
  )
}
