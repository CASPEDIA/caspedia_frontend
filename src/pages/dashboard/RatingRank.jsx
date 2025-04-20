import CustomCard from 'components/common/CustomCard'
import React from 'react'
import './RatingRank.css'
import { useNavigate } from 'react-router-dom'

export default function RatingRank() {
  const navigate = useNavigate();
  return (
    <div>
      <CustomCard
        height='100%'
        padding='2%'
        justifyContent='start'
      >
        <div className='div-rating-rank-container'>
          <div 
            className='div-rating-rank-title custom-link'
            onClick={() => navigate('/rank/rating')}
          >
            리뷰 수 BEST 5&nbsp;&nbsp;&gt;
          </div>
          <ul className="ranking-list horizontal">
            {boardGameList.map((game) => (
              <li key={game.rank} className="ranking-item horizontal-item">
                <div className="rank-number">{game.rank}</div>
                <img src={game.image} alt={game.name} className="game-thumbnail" />
                <div className="game-info">
                  <div className="game-name">{game.name}</div>
                  <div className="game-ratings">📝 {game.ratings}</div>
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
    name: '세티: 외계의 지성체를 찾아서',
    image: 'https://boardlife.co.kr/data/photo/2024/03/30/1711797063-938652_N_210x210_100_5_.jpg',
    ratings: 142,
  },
  {
    rank: 2,
    name: '브라스: 버밍엄',
    image: 'https://boardlife.co.kr/wys2/swf_upload/2023/12/06/1701864158872559_lg_N_210x210_100_5_.jpg',
    ratings: 128,
  },
  {
    rank: 3,
    name: '아크 노바',
    image: 'https://boardlife.co.kr/wys2/swf_upload/2022/02/01/1643694411778845_lg_N_210x210_100_5_.jpg',
    ratings: 110,
  },
  {
    rank: 4,
    name: '원더랜드 워',
    image: 'https://boardlife.co.kr/wys2/swf_upload/2022/10/17/1666011987326602_lg_N_210x210_100_5_.jpg',
    ratings: 102,
  },
  {
    rank: 5,
    name: '테라포밍 마스',
    image: 'https://boardlife.co.kr/data/boardgame_strategy/2021/01/29/1611915054-873621_N_210x210_100_5_.jpg',
    ratings: 95,
  },
];