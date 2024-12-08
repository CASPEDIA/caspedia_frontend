import React, { useCallback, useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash';
import { useLocation, useNavigate } from 'react-router-dom';
import './BoardgameSearchBar.css'
import { autoFillBoardgame } from 'hooks/boardgameHooks';

export default function BoardgameSearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [boardgameQuery, setBoardgameQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1); // 활성화된 항목 인덱스
  const [isOpen, setIsOpen] = useState(false); // 자동완성 박스 열림 상태
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const debouncedBoardgameSearch = useCallback(
    debounce((query) => 
      autoFillBoardgame(query)
        .then((data) => {
          // console.log(data);
          const parsedData = data.map((item) => {
            return {
              boardgameKey: item.boardgame_key,
              name: item.name,
              yearPublished: item.year_published
            }
          });
          setSearchResults(parsedData);
          setIsOpen(data.length > 0); // 입력값이 있어야 열림
        })
        .catch((e) => {
          console.log(e);
          setSearchResults([]);
        })
        , 500),
    []
  );

  const highlightMatch = (text, query) => {
    if (!query) return text; 
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <strong key={i} style={{ fontWeight: 'bold' }}>{part}</strong>
      ) : (
        part
      )
    );
  };

  const handleBoardgameQuery = (e) => {
    const query = e.target.value;
    setBoardgameQuery(query);
    if (query.length < 1) {
      setSearchResults([]);
      setIsOpen(false);
      return;
    }
    debouncedBoardgameSearch(query);
  }

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      setActiveIndex((prevIndex) =>
        prevIndex < searchResults.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : searchResults.length - 1
      );
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0) {
        handleSelect(searchResults[activeIndex].boardgameKey);
      } else {
        navigate(`/search?query=${boardgameQuery}&page=1`);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelect = (boardgameKey) => {
    setBoardgameQuery('');
    setIsOpen(false);
    setActiveIndex(-1);
    navigate(`/boardgame/${boardgameKey}`);
    // inputRef.current.blur();
  };

  const resetSearch = () => {
    setBoardgameQuery('');
    setSearchResults([]);
    setIsOpen(false);
    setActiveIndex(-1);
  }

  const handleClickOutside = (e) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target)// 입력창 및 검색 결과 외부 클릭 확인
    ) {
      resetSearch();
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [])
  
  useEffect(() => {
    if(location.pathname.includes('/search')){
      setBoardgameQuery('');
      setSearchResults([]);
    }
  }, [location])


  return (
    <div className='div-boardgamesearch-container' ref={containerRef}>
      <input
        type="text"
        className='input-boardgame-search'
        id="boardgamesearch"
        placeholder="보드게임 검색..."
        // aria-label="Search"
        value={boardgameQuery}
        onChange={handleBoardgameQuery}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        autoComplete='off'
        />
      {boardgameQuery.length > 0 && ( // 입력이 있을 때만 렌더링
        <div className='div-boardgamesearch-result'>
          {searchResults.length > 0 ? (
            searchResults.map((item, index) => (
              <div
                key={index}
                className={`boardgamesearch-result-item ${
                  index === activeIndex ? 'active' : ''
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => handleSelect(item.boardgameKey)}
              >                
              {highlightMatch(item.name, boardgameQuery)} ({item.yearPublished})
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  )
}
