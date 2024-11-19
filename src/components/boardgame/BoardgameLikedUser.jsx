import React from 'react'
import './BoardgameLikedUser.css'
import { useNavigate } from 'react-router-dom'

export default function BoardgameLikedUser({
  nanoid="guest",
  nickname="guest",
  image_url="/user_profile/profile_1.png",
}) {
  const navigate = useNavigate();
  return (
    <div className='div-boardgame-liked'>
      <img src={image_url} width="25%" alt="이미지" onClick={() => navigate("/user/" + nanoid)}/>
      <div></div>
      <h1 onClick={() => navigate("/user/" + nanoid)}>
        <strong>{nickname}</strong>
      </h1>
    </div>
  )
}
