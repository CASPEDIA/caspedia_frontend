import React, { useEffect, useState } from 'react'
import './BoardgameRatingInfo.css'
import { useNavigate, useParams } from 'react-router-dom';
import BoardgameRating from './BoardgameRating';
import ToRatingEditBtn from 'components/rating/ToRatingEditBtn';
import { getBoardgameRatings } from 'hooks/boardgameHooks';
import { useCookies } from 'react-cookie';
import { isMyInfo } from 'hooks/userHooks';
import { REVIEW_TAGLIST } from 'recoil/tag/atom';

export default function BoardgameReviewInfo() {
  const navigate = useNavigate();
  const {boardid} = useParams();
  const [cookies,,] = useCookies(["nanoid"]);
  const [ratingCount, setRatingCount] = useState(0);
  const [ratedUsers, setRatedUsers] = useState([]);
  const [tagKeys, setTagKeys] = useState([]);
  const [topTags, setTopTags] = useState([]);
  const [alreadyRated, setAlreadyRated] = useState(false);

  useEffect(() => {
    getBoardgameRatings(boardid)
      .then((data) => {
        var tmpCount = 0;
        var tmpList = [];
        const parsedData = data.map((item) => {
          tmpCount++;
          tmpList.push(item.tag_keys);
          if(isMyInfo(cookies,item.nanoid)) {
            setAlreadyRated(true);
          }
          return {
            nanoid: item.nanoid,
            nickname: item.nickname,
            userImageKey: item.user_image_key,
            comment: item.comment,
            score: item.score,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
            tagKeys: item.tag_keys,
          }
        });
        setRatingCount(tmpCount);
        setTagKeys(tmpList);
        setRatedUsers(parsedData);
      })
      .catch((e) => {
        console.log(e);
      })
  
  }, [boardid])

  useEffect(() => {
    if (tagKeys.length > 0) {
      let count = Array(tagKeys[0].length).fill(0);

      tagKeys.forEach((item) => {
        item.split('').forEach((bit,index) => {
          count[index] += parseInt(bit,10);
        });
      });
      
      const indexedCount = count.map((value, index) => ({index, value}))
        .sort((a,b) => b.value - a.value);

      setTopTags(indexedCount.slice(0,5));
    }
  }, [tagKeys])
  
  return (
    <div>
      <div className='div-boardgame-best-tags'>
        <div className='div-title-tag'>
          CAST가 고른 태그
        </div>
        {topTags.map((item, index) => {
          return (
            <BestTag
              key={index} 
              text={REVIEW_TAGLIST[item.index]}
              count={item.value}
            />

          )
        })}
      </div>
      <div className='div-boardgame-ratings'>
        {ratedUsers.map((item,index) => {
          return (
            <BoardgameRating 
              key={index}
              nanoid={item.nanoid}
              nickname={item.nickname}
              userImageKey={item.userImageKey}
              comment={item.comment}
              score={item.score}
              createdAt={item.createdAt}
              updatedAt={item.updatedAt}
              tagKeys={item.tagKeys}
            />
          )
        })}
      </div>
      { alreadyRated ? 
        <></>
      :
        <ToRatingEditBtn 
          src="/img/F3_create_review.png" 
          onClick={() => navigate(`/rating/${boardid}`)}
        />  
      }
    </div>
  )
}

function BestTag({
  text="text",
  count=1,
}){
  return(
    <div className='div-selected-tag'>
      <div>
        {text}
      </div>
      <div>
        {count}
      </div>
    </div>
  )
}