import React, { useState } from 'react'
import './RatingRankDetail.css'
import { useNavigate } from 'react-router-dom'
import RatingRankItem from 'components/rank/RatingRankItem';

export default function RatingRankDetail() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState('한달'); // 기본값: 한달

  const options = ['한달', '세달', '전체'];

  return (
    <div className='custom-rating-rank'>
      <div className='div-month-tab'>
        {options.map((label) => (
          <span
            key={label}
            className={`span-month-item ${selected === label ? 'active' : ''}`}
            onClick={() => setSelected(label)}
          >
            {label}
          </span>
        ))}
      </div>
      <table className='table-rating-rank'>
        <thead>
          <tr>
            <th>리뷰 TOP 100</th>
            <th className='wide-column'>게임명</th>
            <th>좋아요</th>
            <th>BGG 평점</th>
            <th>리뷰</th>
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
          <RatingRankItem />
          <RatingRankItem />
          <RatingRankItem />
          <RatingRankItem />
          <RatingRankItem />
          <RatingRankItem />
          <RatingRankItem />
          <RatingRankItem />
          <RatingRankItem />
        </tbody>
      </table>
    </div>
  )
}
