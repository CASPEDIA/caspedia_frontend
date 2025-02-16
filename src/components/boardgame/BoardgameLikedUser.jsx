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
      <img className='custom-link' src={`/user_profile/profile_${userImageKey < 10 ? "0" : ""}${userImageKey}.png` || "/user_profile/profile_01.png"} style={{"borderRadius": "50%", "width" : "6em", "height" : "6em"}} alt="이미지" onClick={() => navigate("/user/" + nanoid)}/>
      <div style={{"width": "2em"}}></div>
      <h3 className='custom-link' onClick={() => navigate("/user/" + nanoid)}>
        <strong>{nickname}</strong>
      </h3>
    </div>
  )
}
