import React, { useEffect, useState } from 'react'
import './BoardgameRating.css'
import { useNavigate } from 'react-router-dom'
import { REVIEW_TAGLIST } from 'recoil/tag/atom';
import { useIsMyInfo } from 'hooks/userHooks';

export default function BoardgameRating({
  boardgameKey=1,
  nanoid="guest",
  nickname="guest",
  userImageKey=1,
  comment="좋았어요!!",
  score=10,
  createdAt="2024-11-16T15:47:37.450685",
  updatedAt="2024-11-16T19:24:48.835425",
  tagKeys="111110000000000000000000",
}) {
  const navigate = useNavigate();
  const isMyInfo = useIsMyInfo();
  const [isExpanded, setIsExpanded] = useState(false);
  const [tagList, setTagList] = useState([]);
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    var tmpList = []
    for (let i = 0; i < tagKeys.length; i++){
      if(tagKeys[i] === '1') {
        tmpList.push(REVIEW_TAGLIST[i]);
      } 
    }
    setTagList(tmpList);
  }, [])
  return (
    <div className={`custom-link div-boardgame-rating-card ${isMyInfo(nanoid) ? "div-my-rating" : ""}`} onClick={toggleExpand}>
      <div className='div-boardgame-rating-basic-info'>
        <div className='div-boardgame-rating'>
          <img className='custom-link' src={`/user_profile/profile_${userImageKey < 10 ? "0" : ""}${userImageKey}.png` || "/user_profile/profile_01.png"} style={{"borderRadius": "50%", "width" : "6em", "height" : "6em"}} alt="이미지" onClick={() => navigate("/user/" + nanoid)}/>
          <div style={{"textAlign":"left", "padding":"0 1rem 0 1rem"}}>
            <strong className='custom-link' style={{"paddingRight":"0.5rem" }} onClick={() => navigate("/user/" + nanoid)}>{nickname}</strong>
            {isMyInfo(nanoid) ?
              <img className='custom-link' src="/img/F1_edit_pencil.png" width="7%" alt="수정하기" onClick={() => navigate(`/rating/${boardgameKey}`)}/>
              :
              <></>
            }
            <br />
            {isExpanded ? 
              <>
              </>
              :
              <>
                <p className='p-rating-comment custom-whitespace '>
                  {comment}
                </p>
              </>
            }
          </div>
        </div>
        <div className='boardgame-rating-circle'>
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
          <p className='custom-whitespace' style={{"textAlign": "left", "padding" : "0% 3% 1% 3%"}}>
            {comment}
          </p>
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