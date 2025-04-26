import CustomCard from 'components/common/CustomCard'
import React, { useEffect, useState } from 'react'
import './RatingRequests.css'
import { useNavigate } from 'react-router-dom';
import { getRatingRequest } from 'hooks/ratingHooks';

export default function RatingRequests() {
  const [ratingRequestItems, setRatingRequestItems] = useState([]);

  useEffect(() => {
    getRatingRequest()
      .then((data) => {
        console.log(data);
        var tmpList = [];

        data.forEach((item) => {
          console.log(item);
          tmpList.push({
            reqKey: item.req_key,
            boardgameKey: item.boardgame_key,
            nameKor: item.name_kor,
            nameEng: item.name_eng,
            imageUrl: item.image_url,
            nanoid: item.nanoid,
            nickname: item.nickname,
            userImageKey: item.user_image_key,
            createdAt: item.created_at
          })
        })

        console.log("tmplist")
        console.log(tmpList)

        setRatingRequestItems(tmpList);
      })
      .catch((e) => {
        console.log(e);
      });
  },[])

  return (
    <div>
      <CustomCard
        height='100%'
        padding='3%'
      >
        <div>
          <div className='div-rr-title'>
            같이 리뷰해요
          </div>
          {
            ratingRequestItems.map((item,index) => {
              return(
                <RecentRequestItem 
                key={index}
                reqKey={item.reqKey}
                boardgameKey={item.boardgameKey}
                nameKor={item.nameKor}
                nameEng={item.nameEng}
                imageUrl={item.imageUrl}
                nanoid={item.nanoid}
                nickname={item.nickname}
                userImageKey={item.userImageKey}
                createdAt={item.createdAt}
                />
              )
            })
          }
        </div>
      </CustomCard>

    </div>
  )
}

export function RecentRequestItem({
  reqKey=1,
  boardgameKey=66690,
  nameEng="noName",
  nameKor="이름없음",
  imageUrl="/img/F2_no_image.png",
  nanoid="guest",
  nickname="guest",
  userImageKey=1,
  createdAt="",
}) {
  const navigate = useNavigate();
  return (
    <div className='div-recent-request-item'>
      <div className='div-recent-request-inner-boardgame'>
        <img className='custom-link' src={imageUrl || "/img/F2_no_image.png"} alt={nameKor} onClick={() => navigate("/boardgame/" + boardgameKey)}/>
        <span className='custom-link' style={{"marginLeft" : "10px"}} onClick={() => navigate("/boardgame/" + boardgameKey)}>
          { nameKor || nameEng }
        </span>
      </div>
      <div className='div-recent-request-inner-user'>
        <img className='custom-link' src={`/user_profile/profile_${userImageKey < 10 ? "0" : ""}${userImageKey}.png` || "/user_profile/profile_01.png"} alt="이미지" onClick={() => navigate("/user/" + nanoid)}/>
        <span className='custom-link' style={{"marginLeft" : "10px"}} onClick={() => navigate("/user/" + nanoid)}>
          {nickname}
        </span>
      </div>
    </div>
  )
}