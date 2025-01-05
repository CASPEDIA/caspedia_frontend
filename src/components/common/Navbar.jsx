import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { useLocation, useNavigate } from 'react-router-dom'
import BoardgameSearchBar from 'components/search/BoardgameSearchBar';
import UserSearchBar from 'components/search/UserSearchBar';
import { useHasAuth, useUserLogout } from 'hooks/userHooks';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/userstate/atom';
import { useHasAdmin } from 'hooks/adminHooks';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const hasAuth = useHasAuth();
  const hasAdmin = useHasAdmin();
  const userLogout = useUserLogout();

  const [isRootPath, setIsRootPath] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태 관리
  const isExtraPage = ['/search', '/boardgame'].some(path => location.pathname.includes(path));

  const user = useRecoilValue(userState);
  const handleMyPage = () => {
    if(hasAuth()){
      navigate(`/user/${user.nanoid}`)
    } else {
      alert("로그인 후 이용하세요");
    }
    setIsDropdownOpen();
  }
  
  const handleAdminPage = () => {
    navigate('/admin')
    setIsDropdownOpen();
  }
  
  const handleLogout = () => {
    userLogout();
    setIsDropdownOpen();
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState); // 드롭다운 열기/닫기 토글
  };

  useEffect(() => {
    setIsRootPath(location.pathname.length === 1);
    setIsDropdownOpen(false);
  },[location.pathname]);

  return (
    <div className='custom-navbar'>
      { location.pathname.includes('/signin') ?
        <>
        </>
        :
        <>
          <img src="/img/F5_navbar_logo.png" alt="Home" className="nav-icon" style={{"marginRight" : "2%" , "cursor" : "pointer"}} onClick={() => navigate('/')}/>
          { location.pathname.includes('/user') ? <UserSearchBar /> : 
            isExtraPage || isRootPath ? <BoardgameSearchBar /> : <></>
          }
          { hasAuth() ?
            <div className='div-user-menu-container'>
              <img 
                src="/img/F5_user_menu.png" 
                alt="User" 
                className="nav-icon" 
                style={{"marginRight" : "2%" , "cursor" : "pointer"}} 
                onClick={toggleDropdown}/>
              {isDropdownOpen ? 
                (
                  <div className="div-dropdown-menu">
                    <div onClick={handleMyPage}>마이페이지</div>
                    { hasAdmin() ? 
                      <div onClick={handleAdminPage}>유저목록</div>
                      :
                      <></>
                    }
                    <div onClick={handleLogout}>로그아웃</div>
                  </div>
                )
              :
                <></>
              }
            </div>
            :
            <></>
          }
        </>
      }
    </div>
  )
}