import React from 'react'
import './UserLikedBoardgame.css'
import { useNavigate } from 'react-router-dom'


export default function UserLikedBoardgame({
  date,
  nanoid="guest",
  boardgameKey=66690,
  nameEng="noName",
  nameKor="이름없음",
  imageUrl="/img/F2_no_image.png",
}) {
  const navigate = useNavigate();
  return (
    <div className='div-boardgame-liked'>
      <img src={imageUrl} width="20%" alt={nameKor} style={{"cursor" : "pointer"}} onClick={() => navigate("/boardgame/" + boardgameKey)}/>
      <div style={{"width": "4vw"}}></div>
      <h3 style={{"cursor" : "pointer"}} onClick={() => navigate("/boardgame/" + boardgameKey)}>
        <strong>{ nameKor || nameEng }</strong>
      </h3>
    </div>
  )
}
