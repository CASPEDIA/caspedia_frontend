import React, { useEffect, useRef, useState } from 'react'
import CommonModal from 'components/modal/CommonModal'
import BoardgameLikedUser from 'components/boardgame/BoardgameLikedUser';
import './BoardgameBasicInfo.css'
import { useParams } from 'react-router-dom';
import { addBoardgameLike, checkBoardgameLike, getBoardgameBasicInfo, getBoardgameLikedUsers, removeBoardgameLike } from 'hooks/boardgameHooks';
import { useRecoilState } from 'recoil';
import { BoardGame, boardgameState } from 'recoil/boardgame/atom';

export default function BoardgameBasicInfo() {
  const {boardid} = useParams();
  const [boardgame, setBoardgame] = useRecoilState(boardgameState);
  const [isLikePressed, setIsLikePressed] = useState(false);
  const [isLikedModalOpen, setIsLikedModalOpen] = useState(false);
  const [likedCount, setLikedCount] = useState(0);
  const [likedUsers, setLikedUsers] = useState([]);
  const modalRef = useRef(null);
  // const [imageUrl, setImageUrl] = useState("");
  // const [nameKor, setNameKor] = useState("");
  // const [nameEng, setNameEng] = useState("");
  // const [yearPublished, setYearPublished] = useState(0);
  // const [description, setDescription] = useState("");
  // const [minPlayers, setMinPlayers] = useState(0);
  // const [maxPlayers, setMaxPlayers] = useState(0);
  // const [minPlaytime, setMinPlaytime] = useState(0);
  // const [maxPlaytime, setMaxPlaytime] = useState(0);
  // const [geekWeight, setGeekWeight] = useState(0);
  // const [geekScore, setGeekScore] = useState(0);
  // const [castScore, setCastScore] = useState(0);
  // const [age, setAge] = useState(0);

  const openLikedModal = () => {
    if (likedCount === 0) return null;
    setIsLikedModalOpen(true);
    if (modalRef.current) {
      modalRef.current.handleResize();
    }
  }
  const closeLikedModal = () => setIsLikedModalOpen(false);
  const pressLike = () => {
    if (isLikePressed) {
      removeBoardgameLike(boardid)
        .then((data) => {
          setIsLikePressed(false);
          setLikedCount((prev) => (prev-1));
        })
        .catch((e) => {
          console.log(e);
        });
      } else {
        addBoardgameLike(boardid)
        .then((data) => {
          setIsLikePressed(true);
          setLikedCount((prev) => (prev+1));
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  useEffect(() => {
    getBoardgameBasicInfo(boardid)
      .then((data) => {
        const newBoardGame = new BoardGame({
          boardgameKey: boardid,
          imageUrl: data.image_url,
          nameKor: data.name_kor,
          nameEng: data.name_eng,
          yearPublished: data.year_published,
          description: data.description,
          minPlayers: data.min_players,
          maxPlayers: data.max_players,
          minPlaytime: data.min_playtime,
          maxPlaytime: data.max_playtime,
          geekWeight: data.geek_weight,
          geekScore: data.geek_score,
          castScore: data.cast_score,
          age: data.age,
          designer: data.designer,
          category: [...data.category],
          mechanic: [...data.mechanic],
        });
  
        setBoardgame(newBoardGame);
        // console.log(data);
        // setImageUrl(data.image_url);
        // setNameKor(data.name_kor);
        // setNameEng(data.name_eng);
        // setYearPublished(data.year_published);
        // setDescription(data.description);
        // setMinPlayers(data.min_players);
        // setMaxPlayers(data.max_players);
        // setMinPlaytime(data.min_playtime);
        // setMaxPlaytime(data.max_playtime);
        // setGeekWeight(data.geek_weight);
        // setGeekScore(data.geek_score);
        // setCastScore(data.cast_score);
        // setAge(data.age);
      })
      .catch((e) => {
        console.log(e);
      });
    checkBoardgameLike(boardid)
      .then((data) => {
        setIsLikePressed(data);
      })
      .catch((e) => {
        console.log(e);
      })
  }, [boardid, setBoardgame]);

  useEffect(() => {
    getBoardgameLikedUsers(boardid)
      .then((data) => {
        const parsedData = data.map((item) => ({
          nanoid: item.nanoid,
          nickname: item.nickname,
          userImageKey: item.user_image_key,
        }));
        setLikedCount(parsedData.length);
        setLikedUsers(parsedData);
      })
      .catch((e) => {
        console.log(e);
      })
  }, [boardid, likedCount]);
  return (
    <div>
      <div className='div-boardgame-image pt-4 pb-3'>
        <img src={boardgame.imageUrl === "" ? "/img/F2_no_image.png" : boardgame.imageUrl} width="70%" alt={boardgame.nameKor} />
      </div>
      <div className='div-boardgame-title-info px-4'>
        <div>
          <span>{boardgame.nameKor === "" ? boardgame.nameEng : boardgame.nameKor} </span>
          ({boardgame.yearPublished})
        </div>
        <div className='basic-boardgame-comment'>
          {boardgame.description === "" ? "no description" : boardgame.description}
        </div>
        <div className='div-cast-info'>
          <div>
            <img src="/img/F3_cast_logo.png" width="35%" alt="캐스트 점수" />
            <div>
              <span>{boardgame.castScore}</span>
            </div>
          </div>
          <div>
            <img 
              src={isLikePressed ? "/img/F3_heart_fill.png" : "/img/F3_heart_empty.png"} 
              width="45%" 
              alt="하트" 
              onClick={pressLike}
            />
            <div>
              <span onClick={openLikedModal}>
                {likedCount}
              </span>
            </div>
          </div>
        </div>
      </div>
      <table className='div-boardgame-more-info'>
        <tbody>
          <tr>
            <td>
              {boardgame.getPlayerRange()}
            </td>
            <td>
              {boardgame.getPlaytimeRange()}
            </td>
          </tr>
          <tr>
            <td>{boardgame.age}세 이상</td>
            <td>
              <div>
                <table>
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td><img src="/img/F3_geek_logo.png" alt="logo" width="25%" /></td>
                      <td style={{textAlign: 'left'}} className='td-weight-info'>평점&nbsp;&nbsp;&nbsp;&nbsp;  {boardgame.geekScore}</td>
                    </tr>
                    <tr>
                      <td><img src="/img/F3_geek_logo.png" alt="logo" width="25%" /></td>
                      <td style={{textAlign: 'left'}} className='td-weight-info'>웨이트&nbsp;  {boardgame.geekWeight}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className='div-additional-info'>
        작가 : {boardgame.designer}<br />
        Category<br />
        <ul style={{marginBottom:0}}>
          {boardgame.category.map((item,index) => {
            return (
              <li key={index}>
                {item}
              </li>
            )
          })}
        </ul>
        Mechanism<br />
        <ul style={{marginBottom:0}}>
          {boardgame.mechanic.map((item,index) => {
            return (
              <li key={index}>
                {item}
              </li>
            )
          })}
        </ul>
      </div>
      <CommonModal 
        isModalOpen={isLikedModalOpen}
        closeModal={closeLikedModal}
        ref={modalRef}
      >
        {likedUsers.map((item,index) => {
          return (
            <BoardgameLikedUser 
              key={index}
              nanoid={item.nanoid}
              nickname={item.nickname}
              userImageKey={item.userImageKey}
            />
          )
        })}
      </CommonModal>
    </div>
  )
}
