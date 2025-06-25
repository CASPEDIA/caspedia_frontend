import React, { useEffect, useState } from 'react'
import './TaggedGames.css'
import TaggedGameItem from 'components/tagged/TaggedGameItem';
import LoadingProvider from 'components/common/LoadingProvider';
import { getTaggedGames } from 'hooks/ratingHooks';
import { useParams } from 'react-router-dom';

export default function TaggedGames() {
  const {tagid} = useParams();
  const [taggedGameItems, setTaggedGameItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getTaggedGames(tagid)
      .then((data) => {
        var tmpList = [];
        data.forEach((item) => {
          tmpList.push({
            boardgameKey: item.boardgame_key,
            imageUrl: item.image_url,
            nameKor: item.name_kor,
            nameEng: item.name_eng,
            likes: item.likes,
            castScore: item.cast_score,
            tagCount: item.tag_count
          })
        })
        setTaggedGameItems(tmpList);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });

  }, [])

  return (
    <div className='custom-tagged-games'>
      <table className='table-tagged-games'>
        <thead>
          <tr>
            <th>태그된 게임들</th>
            <th className='wide-column'>게임명</th>
            <th>좋아요</th>
            <th>CAST 평점</th>
            <th>태그 수</th>
          </tr>
        </thead>
        <tbody>
          {taggedGameItems.map((item,index) => {
            return (
              <TaggedGameItem
                key={index}
                boardgameKey={item.boardgameKey}
                imageUrl={item.imageUrl}
                nameKor ={item.nameKor}
                nameEng ={item.nameEng}
                likes = {item.likes}
                castScore = {item.castScore}
                tagCount= {item.tagCount}
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
