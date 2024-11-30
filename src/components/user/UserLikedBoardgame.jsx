import React from 'react'
import './UserLikedBoardgame.css'
import { useNavigate } from 'react-router-dom'


export default function UserLikedBoardgame({
  date,
  nanoid="guest",
  boardgame_key=66690,
  name_eng="noName",
  name_kor="이름없음",
  image_url="/img/F2_no_image.png",
}) {
  const navigate = useNavigate();
  return (
    <div className='div-boardgame-liked'>
      <img src={image_url} width="20%" alt={name_kor} onClick={() => navigate("/boardgame/" + boardgame_key)}/>
      <div style={{"width": "4vw"}}></div>
      <h1 onClick={() => navigate("/boardgame/" + boardgame_key)}>
        <strong>{name_kor}</strong>
      </h1>
    </div>
  )
}
