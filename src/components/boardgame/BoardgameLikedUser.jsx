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
      <img src={`/user_profile/profile_${userImageKey < 10 ? "0" : ""}${userImageKey}.png` || "/user_profile/profile_01.png"} style={{"cursor" : "pointer", "borderRadius": "50%", "width" : "16vw", "height" : "16vw"}} alt="이미지" onClick={() => navigate("/user/" + nanoid)}/>
      <div style={{"width": "4vw"}}></div>
      <h3 style={{"cursor" : "pointer"}} onClick={() => navigate("/user/" + nanoid)}>
        <strong>{nickname}</strong>
      </h3>
    </div>
  )
}
