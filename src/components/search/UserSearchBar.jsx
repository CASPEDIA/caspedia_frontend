import React, { useCallback, useEffect, useRef, useState } from 'react'
import './UserSearchBar.css'
import { debounce } from 'lodash';
import { autoFillUser } from 'hooks/userHooks';
import { useNavigate } from 'react-router-dom';

export default function UserSearchBar() {
  const navigate = useNavigate();
  const [userQuery, setUserQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1); // 활성화된 항목 인덱스
  const [isOpen, setIsOpen] = useState(false); // 자동완성 박스 열림 상태
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const debouncedUserSearch = useCallback(
    debounce((query) => 
      autoFillUser(query)
        .then((data) => {
          const parsedData = data.map((item) => {
            return {
              id: item.id,
              nanoid: item.nanoid,
              nickname: item.nickname,
              name: item.name
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

  const handleUserQuery = (e) => {
    const query = e.target.value;
    setUserQuery(query);
    if (query.length < 1) {
      setSearchResults([]);
      setIsOpen(false);
      return;
    }
    debouncedUserSearch(query);
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
        handleSelect(searchResults[activeIndex].nanoid);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelect = (userNanoid) => {
    setUserQuery('');
    setIsOpen(false);
    setActiveIndex(-1);
    navigate(`/user/${userNanoid}`)
  };

  const resetSearch = () => {
    setUserQuery('');
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

  return (
    <div className='div-usersearch-container' ref={containerRef}>
      <input
        type="text"
        className='input-user-search'
        id="usersearch"
        placeholder="유저 검색..."
        // aria-label="Search"
        value={userQuery}
        onChange={handleUserQuery}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        autoComplete='off'
        />
      {userQuery.length > 0 && ( // 입력이 있을 때만 렌더링
        <div className='div-usersearch-result'>
          {searchResults.length > 0 ? (
            searchResults.map((item, index) => (
              <div
                key={item.id}
                className={`usersearch-result-item ${
                  index === activeIndex ? 'active' : ''
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => handleSelect(item.nanoid)}
              >                
              {highlightMatch(item.nickname, userQuery)} ({highlightMatch(item.name, userQuery)})
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
