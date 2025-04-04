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
      <img className='custom-link' src={imageUrl || "/img/F2_no_image.png"} width="20%" alt={nameKor} onClick={() => navigate("/boardgame/" + boardgameKey)}/>
      <div style={{"width": "2em"}}></div>
      <h3 className='custom-link' onClick={() => navigate("/boardgame/" + boardgameKey)}>
        <strong>{ nameKor || nameEng }</strong>
      </h3>
    </div>
  )
}
