import React, { useState } from 'react'
import { Button, InputGroup } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

export default function BoardgameSearchBar() {
  const [boardgameSearchQuery, setBoardgameSearchQuery] = useState('');
  const navigate = useNavigate();

  function boardgameSearch(){
    navigate(`/search?query=${encodeURIComponent(boardgameSearchQuery)}`);
    // setBoardgameSearchQuery('');
  }

  function keyPress(event){
    if(event.key === 'Enter') {
      boardgameSearch();
    }
  }
  return (
    <InputGroup>
      <Form.Control
        type="text"
        id="boardgamesearch"
        placeholder="보드게임 검색..."
        aria-label="Search"
        value={boardgameSearchQuery}
        onChange={(e) => setBoardgameSearchQuery(e.target.value)}
        onKeyDown={keyPress}
      />
      <Button variant="light" onClick={boardgameSearch}>
        <img src="/img/F5_search.png" alt="Search" className="search-icon" />
      </Button>
    </InputGroup>
  )
}
