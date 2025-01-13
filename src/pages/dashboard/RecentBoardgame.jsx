import CustomCard from 'components/common/CustomCard'
import { getRecentBoardgameRatings } from 'hooks/dashboardHooks';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './RecentBoardgame.css'

export default function RecentBoardgame() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getRecentBoardgameRatings()
      .then((data) => {
        const parsedData = data.map((item) => ({
          boardgameKey: item.boardgame_key,
          nameEng: item.name_eng,
          nameKor: item.name_kor,
          imageUrl: item.image_url,
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
    <div style={{"maxWidth" : "45.5%", "margin":"0% 1.5% 3% 3%"}}>
      <CustomCard 
        height="100%" 
        alignItems="start" 
        margin="0px"
        padding="1.5%"
      >
        <div>
          <div className='div-title-container'>
            <img 
              src="/img/F5_recent_boardgames.png" 
              style={{"width" : "25%"}}
              alt="이미지" />
            <div
              style={{"width" : "75%"}}
            >
              <span style={{"fontWeight" : "bold", "fontSize" : "2em"}}>WHAT</span> <br />
              <span style={{"fontSize" : "1em"}}>최근에 평가된 게임</span>
            </div>
          </div>
          <hr />
          {items.slice(0,10).map((item, index) => {
            return (
              <RecentBoardgameItem
                key={index}
                boardgameKey={item.boardgameKey}
                nameEng={item.nameEng}
                nameKor={item.nameKor}
                imageUrl={item.imageUrl}
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

export function RecentBoardgameItem({
  boardgameKey=66690,
  nameEng="noName",
  nameKor="이름없음",
  imageUrl="/img/F2_no_image.png",
  createdAt="",
  updatedAt="",
}) {
  const navigate = useNavigate();
  return (
    <div className='div-boardgame-item'>
      <img src={imageUrl || "/img/F2_no_image.png"} width="20%" alt={nameKor} style={{"cursor" : "pointer"}} onClick={() => navigate("/boardgame/" + boardgameKey)}/>
      {/* <div style={{"width": "4vw"}}></div> */}
      <span style={{"cursor" : "pointer", "marginLeft" : "10px"}} onClick={() => navigate("/boardgame/" + boardgameKey)}>
        { nameKor || nameEng }
      </span>
    </div>
  )
}