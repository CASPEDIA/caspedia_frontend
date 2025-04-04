import React, { useEffect, useState } from 'react'
import './UserRating.css'
import { useNavigate } from 'react-router-dom'
import { REVIEW_TAGLIST } from 'recoil/tag/atom';
import { useIsMyInfo } from 'hooks/userHooks';

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
  const isMyInfo = useIsMyInfo();
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
    <div className='custom-link div-user-rating-card' onClick={toggleExpand}>
      <div className='div-user-rating-basic-info'>
        <div className='div-user-rating'>
          <img className='custom-link' src={imageUrl || "/img/F2_no_image.png"} width="15%" alt="이미지" onClick={() => navigate("/boardgame/" + boardgameKey)}/>
          <div style={{"textAlign":"left", "padding":"0 1rem 0 1rem"}}>
            <strong className='custom-link' onClick={() => navigate("/boardgame/" + boardgameKey)}>{nameKor || nameEng}</strong>
          </div>
          {
            isMyInfo(nanoid) ?
            <img className='custom-link' src="/img/F1_edit_pencil.png" width="5%" alt="수정하기" onClick={() => navigate(`/rating/${boardgameKey}`)}/>
            :
            <></>
          }
        </div>
        <div className='user-rating-circle'>
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
          <p className='custom-whitespace ' style={{"textAlign": "left", "padding" : "0% 3% 1% 3%"}}>
            {comment}
          </p>
        </>
        :
        <>
          <p className='p-rating-comment custom-whitespace '>
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