import React from 'react'
import "./Navigation.css"
import { Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'


export default function Navigation() {
  const history = useHistory();
  return (
    <div className='navigation p-2'>
      <Row className='mt-2'>
        <Col onClick={history.push('/')}>
          <img src="/img/toDashboard.svg" alt="Home" className="nav-icon" />
        </Col>
        <Col className='flex-grow-1'/>
        <Col onClick={history.push('/user/3')}>
          <img src="/img/toUser.svg" alt="My Page" className="nav-icon"/>
        </Col>
      </Row>
    </div>
  )
}
