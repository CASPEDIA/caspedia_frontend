import React from 'react'
import './Result.css'
import { Link } from 'react-router-dom'

export default function Result({
  id=36218,
  imageUrl = "/img/noImage.jpg",
  nameKor = "도미니언",
  nameEng = "Dominion",
  yearPublished = 2008,
  liked = 777,
  geekScore = 7.6,
  castScore = 8.0
  
}) {
  return (
    <tr>
      <td width="20%">
        <Link to={`/boardgame/${id}`}>
          <img src={imageUrl} alt="noImage" width="70%"/>
        </Link>
      </td>
      <td>
        <Link to={`/boardgame/${id}`}>
          {nameKor}<br />{'('}{nameEng}{')'}{'('}{yearPublished}{')'}
        </Link>
        </td>
      <td>
        {liked}&nbsp;
        <img src="/img/heart.png" alt="heart" width="8%" />
      </td>
      <td>
        {geekScore} &nbsp;
        <img src="/img/bggLogo.svg" alt="logo" width="12%" />
      </td>
      <td>{castScore}</td>
    </tr>
  )
}
