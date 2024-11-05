import React from 'react'
import "./Navbar.css"
import { Button, Col, InputGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';

export default function Navbar() {
  return (
    <div className='custom-navbar'>
      <Row className='my-3 justify-content-md-center align-items-center'>
        <Col md="1">
          <Link to="/">
            <img src="/img/home_icon.png" alt="Home" className="nav-icon" />
          </Link>
        </Col>
        <Col md="9">
          <div className='mr-4'>
            <InputGroup>
              <Form.Control
                type="text"
                id="boardgamesearch"
                placeholder="Search..."
                aria-label="Search"
              />
              <Button variant="light">
                <img src="/img/search.svg" alt="Search" className="search-icon" />
              </Button>
            </InputGroup>
          </div>
        </Col>
      </Row>
    </div>
  )
}
