import React, { useState } from 'react';
import './BasicInfo.css';
import RecentBoardgame from './RecentBoardgame';
import RecentUser from './RecentUser';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function BasicInfo() {
  // 이미지 상태를 관리하는 상태 변수
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 이미지 배열
  const images = [
    "/main/F5_event_01.png",
    "/main/F5_best_review_01.png"
  ];

  // 이미지 변경 함수
  const changeImage = (direction) => {
    setCurrentImageIndex((prevIndex) => {
      if (direction === 'next') {
        return (prevIndex + 1) % images.length;
      } else {
        return (prevIndex - 1 + images.length) % images.length;
      }
    });
  };

  return (
    <div>
      <div className='m-3'>
        <div className='image-slider'>
          {/* 좌측 버튼 */}
          <button className='slider-btn left' onClick={() => changeImage('prev')}>
            <FaChevronLeft />
          </button>
          
          {/* 현재 이미지 표시 */}
          <img 
            src={images[currentImageIndex]} 
            alt="caspedia" 
            style={{ height: "auto", width: "100%" }} 
          />
          
          {/* 우측 버튼 */}
          <button className='slider-btn right' onClick={() => changeImage('next')}>
            <FaChevronRight />
          </button>
        </div>
      </div>
      
      <div className='div-index_introduction'>
        이용 중 불편하신 점이 있다면 관리자에게 문의 바랍니다. <br />
        <br />
        관리자: 박성완, 박하민, 윤병민, 김고은, 석명진 <br />
        버그 리포트 :&nbsp;
        <a href="https://forms.gle/LrPrHjuNeZy6bphc6" target="_blank" style={{color:"#00BFFF"}} rel="noopener noreferrer">
          구글폼 링크
        </a>
      </div>
      
      <div className='div-recent-info'>
        <RecentBoardgame />
        <RecentUser />
      </div>
    </div>
  );
}
