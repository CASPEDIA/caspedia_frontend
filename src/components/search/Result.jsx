import React from 'react'
import './Result.css'
import { Link } from 'react-router-dom'

export default function Result({
  id=36218,
  imageUrl = "/img/F2_no_image.png",
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
        <img src="/img/F2_heart_liked.png" alt="heart" width="16%" />
      </td>
      <td>
        {geekScore} &nbsp;
        <img src="/img/F2_geek_logo.png" alt="logo" width="13%" />
      </td>
      <td>{castScore} &nbsp;
        <img src="/img/F2_cast_rating_logo.png" alt="logo" width="13%" />
      </td>
    </tr>
  )
}
