import React from 'react'
import "./Navbar.css"
import { useLocation } from 'react-router-dom'
import BoardgameSearchBar from 'components/search/BoardgameSearchBar';
import UserSearchBar from 'components/search/UserSearchBar';

export default function Navbar() {
  const location = useLocation();
  
  return (
    <div className='custom-navbar'>
      { location.pathname.includes('/signin') ?
        <>
        </>
        :
        <>
          <img src="/img/F5_navbar_logo.png" alt="Home" className="nav-icon" />
          { location.pathname.includes('/user') ? <UserSearchBar /> : 
            location.pathname.includes('/rating') ? <></> :
            <BoardgameSearchBar />
          }
        </>
      }
    </div>
  )
}
