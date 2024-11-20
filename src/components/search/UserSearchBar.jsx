import React, { useState } from 'react'
import { InputGroup } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';

export default function UserSearchBar() {
  const [userSearchQuery, setUserSearchQuery] = useState('');
  // const navigate = useNavigate();

  function userSearch(event){
    setUserSearchQuery(event.target.value)
    console.log("user 자동완성");
  }

  return (
    <InputGroup>
      <Form.Control
        type="text"
        id="usersearch"
        placeholder="유저 검색..."
        aria-label="Search"
        value={userSearchQuery}
        onChange={userSearch}
      />
    </InputGroup>
  )
}
