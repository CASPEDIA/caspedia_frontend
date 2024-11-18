import React from 'react'
import "./Navbar.css"
import { Col, Row } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import BoardgameSearchBar from '../search/BoardgameSearchBar';
import UserSearchBar from '../search/UserSearchBar';

export default function Navbar() {
  const location = useLocation();
  
  return (
    <div className='custom-navbar'>
      { location.pathname.includes('/signin') ?
        <>
        </>
        :
        <>
          <Row className='my-3 justify-content-md-center align-items-center'>
            <Col md="1">
              <Link to="/">
                <img src="/img/F5_navbar_logo.png" alt="Home" className="nav-icon" />
              </Link>
            </Col>
            <Col md="9">
              <div className='mr-4'>
                { location.pathname.includes('/user') ? <UserSearchBar /> : 
                  location.pathname.includes('/rating') ? <></> :
                  <BoardgameSearchBar />
                }
              </div>
            </Col>
          </Row>
        </>
      }
    </div>
  )
}
