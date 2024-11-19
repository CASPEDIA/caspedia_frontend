import React, { useState } from 'react'
import './BoardgameRating.css'
import { useNavigate } from 'react-router-dom'
import CancelButton from '../common/CancelButton';

export default function BoardgameRating({
  nanoid="guest",
  nickname="guest",
  image_url="/user_profile/profile_1.png",
  comment="좋았어요!!",
  score=10,
  created="2024-11-16T15:47:37.450685",
  updated="2024-11-16T19:24:48.835425",
  tag_info="111110000000000000000000"
}) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <div className='div-boardgame-rating-card'>
      <div className='div-boardgame-rating-basic-info'>
        <div className='div-boardgame-rating'>
          <img src={image_url} width="15%" alt="이미지" onClick={() => navigate("/user/" + nanoid)}/>
          <div style={{"textAlign":"left", "padding":"1rem"}}>
            <strong onClick={() => navigate("/user/" + nanoid)}>{nickname}</strong>
            <br />
            {isExpanded ? 
              <>
              </>
              :
              <>
                <p className='p-rating-comment' onClick={toggleExpand}>
                  {comment}
                </p>
              </>
            }
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