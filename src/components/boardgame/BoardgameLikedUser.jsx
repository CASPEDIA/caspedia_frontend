import React from 'react'
import './BoardgameLikedUser.css'
import { useNavigate } from 'react-router-dom'

export default function BoardgameLikedUser({
  nanoid="guest",
  nickname="guest",
  userImageKey=1,
}) {
  const navigate = useNavigate();
  return (
    <div className='div-boardgame-liked'>
      <img src={`/user_profile/profile_${userImageKey}.png` || "/user_profile/profile_1.png"} width="25%" alt="이미지" onClick={() => navigate("/user/" + nanoid)}/>
      <div style={{"width": "4vw"}}></div>
      <h1 onClick={() => navigate("/user/" + nanoid)}>
        <strong>{nickname}</strong>
      </h1>
    </div>
  )
}
