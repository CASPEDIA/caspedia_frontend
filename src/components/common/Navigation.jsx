import React, { Component } from 'react'
import "./Navigation.css"
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { Col, Row } from 'react-bootstrap'

export default class Navigation extends Component {
  render() {
    return (
      <div className='navigation p-2'>
        <Row className='mt-2'>
          <Col>
            <Link to="/" className="nav-link">
              <img src="/img/toDashboard.svg" alt="Home" className="nav-icon" />
            </Link>
          </Col>
          <Col className='flex-grow-1'/>
          <Col>
            <Link to="/user/3" className="nav-link">
              <img src="/img/toUser.svg" alt="My Page" className="nav-icon" />
            </Link>
          </Col>
        </Row>
      </div>
    )
  }
}
