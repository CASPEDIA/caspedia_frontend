import React, { useState } from 'react'
import './RatingRankDetail.css'
import RatingRankItem from 'components/rank/RatingRankItem';
import LoadingProvider from 'components/common/LoadingProvider';
import { getRCountRanks } from 'hooks/ratingHooks';

export default function RatingRankDetail() {
  const [rCountRankItems, setRCountRankItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(30); // 기본값: 한달

  const texts = ['한달', '세달', '전체']
  const options = [ 30, 90, 0];

  const changeRankingOption = (period) => {
    setIsLoading(true);
    getRCountRanks(period)
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
            geekScore: item.geek_score.toFixed(2),
            castScore: item.cast_score,
            reviewCount: item.review_count
          })
        })
        setRCountRankItems(tmpList);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false); // 로딩 종료
        }, 500); // 1초 딜레이
      });
  }

  const handleOptionChanged = (newOption) => {
    setSelected(newOption);
    changeRankingOption(newOption);
  }

  useState(() => {
    changeRankingOption(30);
  }, [selected])

  return (
    <div className='custom-rating-rank'>
      <div className='div-month-tab'>
        {texts.map((text, index) => (
          <span
            key={index}
            className={`span-month-item ${selected === options[index] ? 'active' : ''}`}
            onClick={() => handleOptionChanged(options[index])}
          >
            {text}
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
          {rCountRankItems.map((item,index) => {
            return (
              <RatingRankItem
                key={index}
                ranking={item.ranking}
                boardgameKey={item.boardgameKey}
                imageUrl={item.imageUrl}
                nameKor ={item.nameKor}
                nameEng ={item.nameEng}
                likes = {item.likes}
                geekScore = {item.geekScore}
                castScore = {item.castScore}
                reviewCount = {item.reviewCount}
              />
            )
          })}
        </tbody>
      </table>
      { isLoading && (
        <LoadingProvider />
      )}
    </div>
  )
}
