import React from 'react'
import CustomCard from '../common/CustomCard'
import './BoardgameRating.css'
import { Link, useNavigate } from 'react-router-dom'

export default function BoardgameRating({
  nanoid="guest",
  nickname="guest",
  image_url="/user_profile/profile_1.png",
  comment="좋았어요!!",
  score=10,
  created="2024-11-16T15:47:37.450685",
  updated="2024-11-16T19:24:48.835425",
  tag_keys=[1,2,3,5,7]
}) {
  const navigate = useNavigate();
  return (
    <CustomCard padding="2%" justifyContent="space-between">
      <div className='div-boardgame-rating'>
        <img src={image_url} width="15%" alt="이미지" onClick={() => navigate("/user/" + nanoid)}/>
        <div style={{"textAlign":"left", "padding":"1rem"}}>
          <strong onClick={() => navigate("/user/" + nanoid)}>{nickname}</strong>
          <br />
          {comment}
        </div>
      </div>
      <div className='rating-circle'>
        {score}
      </div>
    </CustomCard>
  )
}
