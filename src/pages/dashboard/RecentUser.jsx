import CustomCard from 'components/common/CustomCard'
import React, { useEffect, useState } from 'react'
import { getRecentUserRatings } from 'hooks/dashboardHooks';
import { useNavigate } from 'react-router-dom';
import './RecentUser.css'

export default function RecentUser() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getRecentUserRatings()
      .then((data) => {
        const parsedData = data.map((item) => ({
          nanoid: item.nanoid,
          nickname: item.nickname,
          userImageKey: item.user_image_key,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        }));
        setItems(parsedData);
      })
      .catch((e) => {
        console.log(e);
      })
  }, []);

  return (
    <div style={{"maxWidth" : "45.5%", "margin":"0% 3% 3% 1.5%"}}>
      <CustomCard 
        height="150vw" 
        alignItems="start" 
        margin="0px"
        padding="1.5%"
      >
        <div>
          <div className='div-title-container'>
            <img 
              src="/img/F5_recent_users.png" 
              style={{"width" : "25%"}}
              alt="이미지" />
            <div
              style={{"width" : "75%"}}
            >
              <span style={{"fontWeight" : "bold", "fontSize" : "2em"}}>WHO</span> <br />
              <span style={{"fontSize" : "1em"}}>최근에 평가한 사람</span>
            </div>
          </div>
          <hr />
          {items.slice(0,10).map((item, index) => {
            return (
              <RecentUserItem
                key={index}
                nanoid={item.nanoid}
                nickname={item.nickname}
                userImageKey={item.userImageKey}
                createdAt={item.createdAt}
                updatedAt={item.updatedAt}
              />
            )
          })}
        </div>
      </CustomCard>
    </div>
  )
}

export function RecentUserItem({
  nanoid="guest",
  nickname="guest",
  userImageKey=1,
  createdAt="",
  updatedAt="",
}) {
  const navigate = useNavigate();
  return (
    <div className='div-user-item'>
      <img src={`/user_profile/profile_${userImageKey < 10 ? "0" : ""}${userImageKey}.png` || "/user_profile/profile_01.png"} width="20%" alt="이미지" onClick={() => navigate("/user/" + nanoid)}/>
      <div style={{"width": "4vw"}}></div>
      <span style={{"cursor" : "pointer"}} onClick={() => navigate("/user/" + nanoid)}>
        {nickname}
      </span>
    </div>
  )
}