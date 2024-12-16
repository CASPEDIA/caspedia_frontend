import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { useLocation, useNavigate } from 'react-router-dom'
import BoardgameSearchBar from 'components/search/BoardgameSearchBar';
import UserSearchBar from 'components/search/UserSearchBar';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isRootPath, setIsRootPath] = useState(false);
  const isExtraPage = ['/search', '/boardgame'].some(path => location.pathname.includes(path));

  useEffect(() => {
    setIsRootPath(location.pathname.length === 1);
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
        </>
      }
    </div>
  )
}
