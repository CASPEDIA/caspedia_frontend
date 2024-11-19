import React from 'react'
import './UserLikedBoardgame.css'
import { useNavigate } from 'react-router-dom'


export default function UserLikedBoardgame({
  nanoid="guest",
  boardgame_key=66690,
  name_eng="Dominion : Prosperity",
  name_kor="도미니언 : 약속된 번영",
  image_url="https://cf.geekdo-images.com/fEawLvevkxPv9AQ3mSiwVQ__itemrep/img/6UJpoKwtjxUm965dI017XMrgGDE=/fit-in/246x300/filters:strip_icc()/pic1747320.jpg",
}) {
  const navigate = useNavigate();
  return (
    <div className='div-boardgame-liked'>
      <img src={image_url} width="20%" alt={name_kor} onClick={() => navigate("/boardgame/" + boardgame_key)}/>
      <div></div>
      <h1 onClick={() => navigate("/boardgame/" + boardgame_key)}>
        <strong>{name_kor}</strong>
      </h1>
    </div>
  )
}
