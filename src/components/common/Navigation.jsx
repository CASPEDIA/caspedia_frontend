import React from 'react'
import "./Navigation.css"
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default function Navigation() {

  return (
    <div className='custom-navigation p-3'>
      <Row className='justify-content-md-center align-items-center'>
        <Col>
          <Link to="/">
            <img src="/img/F5_toHome.png" alt="Home" className="nav-icon" />
          </Link>
        </Col>
        <Col />
        <Col>
          <Link to="/user/3">
            <img src="/img/F5_toMypage.png" alt="My Page" className="nav-icon" />
          </Link>
        </Col>
      </Row>
    </div>
  )
}
