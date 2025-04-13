import React, { useState, useRef } from 'react';
import './BasicInfo.css';
import RecentBoardgame from './RecentBoardgame';
import RecentUser from './RecentUser';

export default function BasicInfo() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const startX = useRef(0);

  const images = [
    "/main/F5_event_01.png",
    "/main/F5_best_review_02.png",
    "/main/F5_best_review_01.png",
  ];

  // 터치 시작
  const handleTouchStart = (e) => {
    setIsDragging(true);
    startX.current = e.touches[0].clientX;
  };

  // 터치 중 (이미지 이동)
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const moveX = e.touches[0].clientX - startX.current;
    setTranslateX(moveX);
  };

  // 터치 종료
  const handleTouchEnd = () => {
    setIsDragging(false);

    // 슬라이드 감도 설정 (50px 이상 움직이면 넘김)
    if (translateX < -50) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    } else if (translateX > 50) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }

    setTranslateX(0); // 슬라이드 종료 후 초기화
  };

  return (
    <div>
      <div className="m-3">
        <div 
          className="image-slider"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="image-container"
            style={{
              width: "100%",
              transform: `translateX(${translateX - currentImageIndex * 100}%)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out'
            }}
          >
            {images.map((src, index) => (
              <img key={index} src={src} alt="caspedia" className="slider-image" />
            ))}
          </div>
        </div>

        {/* 이미지 인디케이터 */}
        <div className="carousel-indicator">
          {images.map((_, index) => (
            <span 
              key={index} 
              className={`dot ${currentImageIndex === index ? 'active' : ''}`}
            ></span>
          ))}
        </div>
      </div>

      <div className="div-index_introduction">
        이용 중 불편하신 점이 있다면 관리자에게 문의 바랍니다. <br />
        <br />
        관리자: 박성완, 박하민, 윤병민, 김고은, 석명진 <br />
        버그 리포트 :&nbsp;
        <a href="https://forms.gle/LrPrHjuNeZy6bphc6" target="_blank" style={{color:"#00BFFF"}} rel="noopener noreferrer">
          구글폼 링크
        </a>
      </div>

      <div className="div-recent-info">
        <RecentBoardgame />
        <RecentUser />
      </div>
    </div>
  );
}
