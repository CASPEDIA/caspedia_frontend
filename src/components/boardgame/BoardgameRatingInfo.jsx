import React, { useEffect, useState } from 'react'
import './BoardgameRatingInfo.css'
import { useNavigate, useParams } from 'react-router-dom';
import BoardgameRating from './BoardgameRating';
import { getBoardgameRatings } from 'hooks/boardgameHooks';
import { useCookies } from 'react-cookie';
import { REVIEW_TAGLIST } from 'recoil/tag/atom';
import { useIsMyInfo } from 'hooks/userHooks';

export default function BoardgameReviewInfo() {
  const navigate = useNavigate();
  const {boardid} = useParams();
  const isMyInfo = useIsMyInfo();
  const [ratingCount, setRatingCount] = useState(0);
  const [ratedUsers, setRatedUsers] = useState([]);
  const [myRateInfo, setMyRateInfo] = useState({});
  const [tagKeys, setTagKeys] = useState([]);
  const [topTags, setTopTags] = useState([]);
  const [alreadyRated, setAlreadyRated] = useState(false);

  useEffect(() => {
    getBoardgameRatings(boardid)
      .then((data) => {
        var tmpCount = 0;
        var tmpList = [];
        var parsedData = [];
        var myRate = {};
        

        data.forEach((item) => {
          tmpCount++;
          tmpList.push(item.tag_keys);
          
          if(isMyInfo(item.nanoid)) {
            setAlreadyRated(true);
            myRate = {
              nanoid: item.nanoid,
              nickname: item.nickname,
              userImageKey: item.user_image_key,
              comment: item.comment,
              score: item.score,
              createdAt: item.created_at,
              updatedAt: item.updated_at,
              tagKeys: item.tag_keys,
            }
          } else {
            parsedData.push({
              nanoid: item.nanoid,
              nickname: item.nickname,
              userImageKey: item.user_image_key,
              comment: item.comment,
              score: item.score,
              createdAt: item.created_at,
              updatedAt: item.updated_at,
              tagKeys: item.tag_keys,
            });
          }
        });
        setMyRateInfo(myRate);
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
      
      const indexedCount = count
      .map((value, index) => ({ index, value }))
      .filter((item) => item.value > 0) // value가 0인 항목 제거
      .sort((a, b) => b.value - a.value);

      setTopTags(indexedCount.slice(0,5));
    }
  }, [tagKeys])
  
  return (
    <div className='div-rating-info-container'>
      <div className='div-boardgame-best-tags'>
        <div className='div-title-tag'>
          CAST가 고른 태그
        </div>
        {topTags && topTags.length > 0 ? 
          topTags.map((item, index) => {
          return (
            <BestTag
              key={index} 
              text={REVIEW_TAGLIST[item.index]}
              count={item.value}
            />
          )})
          :
          <BestTag
            text="정보 없음"
            count=""
          />
        }
      </div>
      <div className='div-boardgame-ratings'>
        { alreadyRated ? 
          <BoardgameRating 
            boardgameKey={boardid}
            nanoid={myRateInfo.nanoid}
            nickname={myRateInfo.nickname}
            userImageKey={myRateInfo.userImageKey}
            comment={myRateInfo.comment}
            score={myRateInfo.score}
            createdAt={myRateInfo.createdAt}
            updatedAt={myRateInfo.updatedAt}
            tagKeys={myRateInfo.tagKeys}
          />
        :
          <div className='div-to-create-rating-container' style={{"cursor" : "pointer"}} onClick={() => navigate(`/rating/${boardid}`)}>
            <div className='div-to-create-rating-inner'>
              <img src="/img/F1_edit_pencil.png" width="10%" alt="수정하기" />
              <span className='span-to-create-rating' >
                내 한줄평이 없습니다.<br />리뷰를 작성해주세요.</span>
            </div>
          </div>
        // <div 
        //   className='div-to-create-rating'
        //   style={{"cursor" : "pointer"}}
        //   onClick={() => navigate(`/rating/${boardid}`)}
        // >
        //   리뷰 작성하기
        // </div>
        }
        { ratedUsers.map((item,index) => {
          return (
            <BoardgameRating 
              key={index}
              boardgameKey={boardid}
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
      {/* { alreadyRated ? 
        <></>
      :
        <ToRatingEditBtn 
          src="/img/F3_create_review.png" 
          style={{"cursor" : "pointer"}}
          onClick={() => navigate(`/rating/${boardid}`)}
        />  
      } */}
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