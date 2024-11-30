import React, { useEffect, useState } from 'react'
import './UserRating.css'
import { useNavigate } from 'react-router-dom'
import CancelButton from 'components/common/CancelButton';
import { REVIEW_TAGLIST } from 'recoil/tag/atom';

export default function UserRating({
  rating_key=10,
  score=10,
  comment="좋았어요!!",
  boardgame_key=66690,
  nanoid="guest",
  name_eng="noName",
  name_kor="noName",
  tag_key="111110000000000000000000",
  image_url="/img/F2_no_image.png",
  created_at="2024-11-16T15:47:37.450685",
  updated_at="2024-11-16T19:24:48.835425",
}) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [tagList, setTagList] = useState([]);
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    const tmpList = [];
    for (let i = 0; i < tag_key.length; i++){
      if(tag_key[i] === '1') {
        tmpList.push(REVIEW_TAGLIST[i]);
      } 
    }
    setTagList(tmpList);
  }, [])

  return (
    <div className='div-user-rating-card'>
      <div className='div-user-rating-basic-info'>
        <div className='div-user-rating'>
          <img src={image_url} width="15%" alt="이미지" onClick={() => navigate("/boardgame/" + boardgame_key)}/>
          <div style={{"textAlign":"left", "padding":"1rem"}}>
            <strong onClick={() => navigate("/boardgame/" + boardgame_key)}>{name_kor === "" ? name_eng : name_kor}</strong>
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