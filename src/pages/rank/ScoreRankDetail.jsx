import React, { useState } from 'react'
import './ScoreRankDetail.css'
import { useNavigate } from 'react-router-dom'
import ScoreRankItem from 'components/rank/ScoreRankItem';

export default function ScoreRankDetail() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className='custom-score-rank'>
      <table className='table-score-rank'>
        <thead>
          <tr>
            <th>순위</th>
            <th>평점 TOP 100</th>
            <th className='wide-column'>게임명</th>
            <th>좋아요</th>
            <th>BGG 평점</th>
            <th>CAST 평점</th>
          </tr>
        </thead>
        <tbody>
          {/* {searchResult.map((item,index) => {
            return (
              <Result 
              key={index}
              boardgameKey={item.boardgameKey}
              imageUrl={item.imageUrl}
              nameKor ={item.nameKor}
              nameEng ={item.nameEng}
              yearPublished = {item.yearPublished}
              likes = {item.likes}
              geekScore = {item.geekScore}
              castScore = {item.castScore}
              />
            )
          })} */}
          <ScoreRankItem />
          <ScoreRankItem />
          <ScoreRankItem />
          <ScoreRankItem />
          <ScoreRankItem />
          <ScoreRankItem />
          <ScoreRankItem />
          <ScoreRankItem />
          <ScoreRankItem />
          <ScoreRankItem />
          <ScoreRankItem />
          <ScoreRankItem />
        </tbody>
      </table>
    </div>
  )
}
