import React, { useState } from 'react'
import './ScoreRankDetail.css'
import ScoreRankItem from 'components/rank/ScoreRankItem';
import { getScoreRanks } from 'hooks/ratingHooks';
import LoadingProvider from 'components/common/LoadingProvider';

export default function ScoreRankDetail() {
  const [scoreRankItems, setScoreRankItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useState(() => {
    setIsLoading(true);
    getScoreRanks()
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
            castScore: item.cast_score
          })
        })
        setScoreRankItems(tmpList);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false); // 로딩 종료
        }, 500); // 1초 딜레이
      });
  }, [])

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
          {scoreRankItems.map((item,index) => {
            return (
              <ScoreRankItem
                key={index}
                ranking={item.ranking}
                boardgameKey={item.boardgameKey}
                imageUrl={item.imageUrl}
                nameKor ={item.nameKor}
                nameEng ={item.nameEng}
                likes = {item.likes}
                geekScore = {item.geekScore}
                castScore = {item.castScore}
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
