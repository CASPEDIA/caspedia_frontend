import React, { useEffect, useState } from 'react'
import './BoardgameRating.css'
import { useNavigate } from 'react-router-dom'
import CancelButton from 'components/common/CancelButton';
import { REVIEW_TAGLIST } from 'recoil/tag/atom';
import { isMyInfo } from 'hooks/userHooks';
import { useCookies } from 'react-cookie';

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
  const [cookies,,] = useCookies(["nanoid"]);
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
    <div className='div-boardgame-rating-card'>
      <div className='div-boardgame-rating-basic-info'>
        <div className='div-boardgame-rating'>
          <img src={`/user_profile/profile_${userImageKey}.png` || "/user_profile/profile_1.png"} style={{"cursor" : "pointer"}} width="15%" alt="이미지" onClick={() => navigate("/user/" + nanoid)}/>
          <div style={{"textAlign":"left", "padding":"0 1rem 0 1rem"}}>
            <strong style={{"paddingRight":"0.5rem" , "cursor" : "pointer"}} onClick={() => navigate("/user/" + nanoid)}>{nickname}</strong>
            {isMyInfo(cookies, nanoid) ?
              <img src="/img/F1_edit_pencil.png" style={{"cursor" : "pointer"}} width="7%" alt="수정하기" onClick={() => navigate(`/rating/${boardgameKey}`)}/>
              :
              <></>
            }
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