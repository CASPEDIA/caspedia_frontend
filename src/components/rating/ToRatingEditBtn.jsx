import React, { useEffect, useRef } from 'react'
import './ToRatingEditBtn.css'

export default function ToRatingEditBtn({
  onClick,
  src="/img/F3_create_review.png" 
}) {
  const imageRef = useRef(null);
  const handleResize = () => {
    const width = window.innerWidth;

    if(imageRef.current){
      if ( width < 800) {
        imageRef.current.style.right = "20px";
        console.log("hello")
      } else {
        imageRef.current.style.right = (( width - 800) / 2 + 20) + "px";        
        console.log("bye")
      }
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <img 
      src={src} 
      ref={imageRef}
      id="toRatingEditbtn"
      alt="리뷰작성" 
      className='create-rating-btn'
      onClick={onClick}
    />
  )
}
