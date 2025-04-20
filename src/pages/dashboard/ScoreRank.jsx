import CustomCard from 'components/common/CustomCard'
import React from 'react'
import './ScoreRank.css'
import { useNavigate } from 'react-router-dom'

export default function ScoreRank() {
  const navigate = useNavigate();
  return (
    <div>
      <CustomCard
        height='100%'
        padding='2%'
        justifyContent='start'
      >
        <div className='div-score-rank-container'>
          <div 
            className='div-score-rank-title custom-link'
            onClick={() => navigate('/rank/score')}
          >
            CAST 평점 BEST 5&nbsp;&nbsp;&gt;
          </div>
          <ul className="ranking-list horizontal">
            {boardGameList.map((game) => (
              <li key={game.rank} className="ranking-item horizontal-item">
                <div className="rank-number">{game.rank}</div>
                <img src={game.image} alt={game.name} className="game-thumbnail" />
                <div className="game-info">
                  <div className="game-name">{game.name}</div>
                  <div className="game-score">🏆 {game.score}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CustomCard>
    </div>
  )
}

const boardGameList = [
  {
    rank: 1,
    name: '가이아 프로젝트',
    image: 'https://boardlife.co.kr/data/boardgame_strategy/2021/03/09/1615274670-490381_N_210x210_100_5_.jpg',
    score: 9.7,
  },
  {
    rank: 2,
    name: '테라포밍 마스',
    image: 'https://boardlife.co.kr/data/boardgame_strategy/2021/01/29/1611915054-873621_N_210x210_100_5_.jpg',
    score: 9.5,
  },
  {
    rank: 3,
    name: '아크 노바',
    image: 'https://boardlife.co.kr/wys2/swf_upload/2022/02/01/1643694411778845_lg_N_210x210_100_5_.jpg',
    score: 9.0,
  },
  {
    rank: 4,
    name: '브라스: 버밍엄',
    image: 'https://boardlife.co.kr/wys2/swf_upload/2023/12/06/1701864158872559_lg_N_210x210_100_5_.jpg',
    score: 8.5,
  },
  {
    rank: 5,
    name: '도미니언',
    image: 'https://boardlife.co.kr/wys2/swf_upload/2024/02/06/1707147614478933_lg_N_210x210_100_5_.jpg',
    score: 8.0,
  },
];