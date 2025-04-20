import CustomCard from 'components/common/CustomCard'
import React, { useState } from 'react'
import './RatingRequests.css'
import { useNavigate } from 'react-router-dom';

export default function RatingRequests() {
  const [items, setItems] = useState([]);

  return (
    <div>
      <CustomCard
        height='100%'
        padding='3%'
      >
        <div>
          <div className='div-rr-title'>
            같이 리뷰해요
          </div>
          <RecentRequestItem />
          <RecentRequestItem />
          <RecentRequestItem />
          <RecentRequestItem />
          <RecentRequestItem />
        </div>
      </CustomCard>

    </div>
  )
}

export function RecentRequestItem({
  reqKey=1,
  boardgameKey=66690,
  nameEng="noName",
  nameKor="이름없음",
  imageUrl="/img/F2_no_image.png",
  nanoid="guest",
  nickname="guest",
  userImageKey=1,
  createdAt="",
}) {
  const navigate = useNavigate();
  return (
    <div className='div-recent-request-item'>
      <div className='div-recent-request-inner-boardgame'>
        <img className='custom-link' src={imageUrl || "/img/F2_no_image.png"} width="20%" alt={nameKor} onClick={() => navigate("/boardgame/" + boardgameKey)}/>
        <span className='custom-link' style={{"marginLeft" : "10px"}} onClick={() => navigate("/boardgame/" + boardgameKey)}>
          { nameKor || nameEng }
        </span>
      </div>
      <div className='div-recent-request-inner-user'>
        <img className='custom-link' src={`/user_profile/profile_${userImageKey < 10 ? "0" : ""}${userImageKey}.png` || "/user_profile/profile_01.png"} width="20%" alt="이미지" onClick={() => navigate("/user/" + nanoid)}/>
        <span className='custom-link' style={{"marginLeft" : "10px"}} onClick={() => navigate("/user/" + nanoid)}>
          {nickname}
        </span>
      </div>
    </div>
  )
}