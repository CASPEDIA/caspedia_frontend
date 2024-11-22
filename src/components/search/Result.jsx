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
          <img src={imageUrl} alt="noImage" width="80vw"/>
        </Link>
      </td>
      <td width="30%" style={{textAlign:"left"}}>
        <Link to={`/boardgame/${id}`}>
          {nameKor}
          {/* {'('}{nameEng}{')'} */}
          {'('}{yearPublished}{')'}
        </Link>
        </td>
      <td width="15%">
        {liked}&nbsp;
        <img src="/img/F2_heart_liked.png" alt="heart" width="16vw" />
      </td>
      <td width="15%">
        {geekScore}&nbsp;<img src="/img/F2_geek_logo.png" alt="logo" width="13vw" />
      </td>
      <td width="15%">
        {castScore} &nbsp;<img src="/img/F2_cast_rating_logo.png" alt="logo" width="13vw" />
      </td>
    </tr>
  )
}
