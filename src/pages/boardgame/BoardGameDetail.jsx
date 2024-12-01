import React from 'react'
import './BoardGameDetail.css'
import BoardgameBasicInfo from 'components/boardgame/BoardgameBasicInfo';
import BoardgameRatingInfo from 'components/boardgame/BoardgameRatingInfo';

export default function BoardGameDetail() {
  return (
    <div className='div-boardgame-detail'>
      <BoardgameBasicInfo />
      <BoardgameRatingInfo />
    </div>
  )
}
