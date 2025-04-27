import CustomCard from 'components/common/CustomCard'
import React, { useEffect, useState } from 'react'
import './RatingRank.css'
import { useNavigate } from 'react-router-dom'
import { getRCountRankTop5 } from 'hooks/ratingHooks';

export default function RatingRank() {
  const [rCountRankList, setRCountRankList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getRCountRankTop5()
      .then((data) => {
        var tmpList = [];
        data.forEach((item) => {
          tmpList.push({
            ranking: item.ranking,
            boardgameKey: item.boardgame_key,
            imageUrl: item.image_url,
            nameKor: item.name_kor,
            nameEng: item.name_eng,
            likes: item.likes,
            geekScore: item.geek_score,
            castScore: item.cast_score,
            reviewCount: item.review_count
          })
        })
        setRCountRankList(tmpList);
      })
      .catch((e) => {
        console.log(e);
      })
  },[])

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
            {
              rCountRankList.map((item,index) => {
                return (
                  <RCountRankItem
                    key={index}
                    ranking={item.ranking}
                    boardgameKey={item.boardgameKey}
                    imageUrl={item.imageUrl}
                    nameKor={item.nameKor}
                    nameEng={item.nameEng}
                    likes={item.likes}
                    geekScore={item.geekScore}
                    castScore={item.castScore}
                    reviewCount={item.reviewCount}
                  />
                )
              })
            }
          </ul>
        </div>
      </CustomCard>
    </div>
  )
}

export function RCountRankItem ({
  ranking="1",
  boardgameKey="51811",
  imageUrl="/img/noImage.jpg",
  nameKor="임시",
  nameEng="noname",
  likes=777,
  geekScore=9.5,
  castScore=9,
  reviewCount=60
}) {
  const navigate = useNavigate();

  return (
    <li className="ranking-item horizontal-item custom-link"  onClick={() => navigate(`/boardgame/${boardgameKey}`)}>
      <div className="rank-number">{ranking}</div>
      <img src={imageUrl} alt={nameKor} className="game-thumbnail" />
      <div className="game-info">
        <div className="game-name">{nameKor || nameEng}</div>
        <div className="game-ratings">📝 {reviewCount}</div>
      </div>
    </li>
  )
}