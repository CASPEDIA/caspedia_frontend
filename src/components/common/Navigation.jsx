import React from 'react'
import "./Navigation.css"
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default function Navigation() {

  return (
    <div className='navigation p-2'>
      <Row className='mt-2'>
        <Col>
          <Link to="/">
            <img src="/img/toDashboard.svg" alt="Home" className="nav-icon" />
          </Link>
        </Col>
        <Col className='flex-grow-1'/>
        <Col>
          <Link to="/user/3">
            <img src="/img/toUser.svg" alt="My Page" className="nav-icon" />
          </Link>
        </Col>
      </Row>
    </div>
  )
}
