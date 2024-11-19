import React, { useState } from 'react'
import './UserRating.css'
import { useNavigate } from 'react-router-dom'
import CancelButton from '../common/CancelButton';

export default function UserRating({
  nanoid="guest",
  rating_key=10,
  boardgame_key=66690,
  image_url="https://cf.geekdo-images.com/fEawLvevkxPv9AQ3mSiwVQ__itemrep/img/6UJpoKwtjxUm965dI017XMrgGDE=/fit-in/246x300/filters:strip_icc()/pic1747320.jpg",
  comment="좋았어요!!",
  score=10,
  name_eng="Dominion : Prosperity",
  name_kor="도미니언 : 약속된 번영",
  created="2024-11-16T15:47:37.450685",
  updated="2024-11-16T19:24:48.835425",
  tag_key="111110000000000000000000"
}) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <div className='div-user-rating-card'>
      <div className='div-user-rating-basic-info'>
        <div className='div-user-rating'>
          <img src={image_url} width="15%" alt="이미지" onClick={() => navigate("/boardgame/" + boardgame_key)}/>
          <div style={{"textAlign":"left", "padding":"1rem"}}>
            <strong onClick={() => navigate("/boardgame/" + boardgame_key)}>{name_kor}</strong>
          </div>
        </div>
        <div className='rating-circle'>
          {score}
        </div>
      </div>
      {isExpanded ?
        <>
          <div className='div-tag-container'>
            <SelectedTag text="3인 베스트🤟"/>
            <SelectedTag text="숙련자들이 즐기는👨🏻‍🎓"/>
            <SelectedTag text="또 해보고 싶은💘"/>
          </div>
          <p style={{"textAlign": "left", "padding" : "0% 3% 1% 3%"}}>
            {comment}
          </p>
          <div className='div-collapse-rating'>
            <CancelButton 
              text="접기"
              onClick={toggleExpand}
            />
          </div>
        </>
        :
        <>
          <p className='p-rating-comment' onClick={toggleExpand}>
            {comment}
          </p>
        </>  
      }
    </div>
  )
}

function SelectedTag({
  text="Selected"
}) {
  return(
    <div className='div-tag-item'>
      {text}
    </div>
  );
}