import React, { useEffect, useState } from 'react'
import './UserRating.css'
import { useNavigate } from 'react-router-dom'
import CancelButton from 'components/common/CancelButton';
import { REVIEW_TAGLIST } from 'recoil/tag/atom';

export default function UserRating({
  ratingKey=10,
  score=10,
  comment="좋았어요!!",
  boardgameKey=66690,
  nanoid="guest",
  nameEng="noName",
  nameKor="noName",
  tagKey="111110000000000000000000",
  imageUrl="/img/F2_no_image.png",
  createdAt="2024-11-16T15:47:37.450685",
  updatedAt="2024-11-16T19:24:48.835425",
}) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [tagList, setTagList] = useState([]);
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    const tmpList = [];
    for (let i = 0; i < tagKey.length; i++){
      if(tagKey[i] === '1') {
        tmpList.push(REVIEW_TAGLIST[i]);
      } 
    }
    setTagList(tmpList);
  }, [])

  return (
    <div className='div-user-rating-card'>
      <div className='div-user-rating-basic-info'>
        <div className='div-user-rating'>
          <img src={imageUrl} width="15%" alt="이미지" onClick={() => navigate("/boardgame/" + boardgameKey)}/>
          <div style={{"textAlign":"left", "padding":"1rem"}}>
            <strong onClick={() => navigate("/boardgame/" + boardgameKey)}>{nameKor || nameEng}</strong>
          </div>
        </div>
        <div className='rating-circle'>
          {score}
        </div>
      </div>
      {isExpanded ?
        <>
          <div className='div-tag-container'>
            {tagList.map((item, index) => {
              return(
                <SelectedTag 
                  key={index}
                  text={item}
                />
              )
            })}
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