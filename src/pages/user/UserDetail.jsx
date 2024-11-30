import React, { useCallback, useEffect, useRef, useState } from 'react'
import UserRating from 'components/user/UserRating'
import './UserDetail.css'
import CustomButton from 'components/common/CustomButton';
import CommonModal from 'components/modal/CommonModal';
import UserLikedBoardgame from 'components/user/UserLikedBoardgame';
import { getLikedBoardgames, getRatedBoardgames, getUserBasicInfo, isMyInfo, setUserIntroduction, userLogout } from 'hooks/userHooks';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { debounce } from 'lodash';

export default function UserDetail() {
  const [cookies,,removeCookie] = useCookies(["jwtToken", "nanoid"]);
  const [isLikedModalOpen, setIsLikedModalOpen] = useState(false);
  const {nanoid} = useParams();
  // const [id, setId] = useState('');
  const [introduction, setIntroduction] = useState("");
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [userImageKey, setUserImageKey] = useState('');
  const [isMyPage, setIsMyPage] = useState(false);
  const [likedBoardgames, setLikedBoardgames] = useState([]);
  const [ratedBoardgames, setRatedBoardgames] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [averageScore, setAverageScore] = useState(0.0);
  const modalRef = useRef(null);

  const debouncedIntroductionChange = useCallback(
    debounce((newIntroduction) => setUserIntroduction(newIntroduction), 500),
    []
  );

  const introductionChange = (e) => {
    const newIntroduction = e.target.value;
    setIntroduction(newIntroduction);
    debouncedIntroductionChange(newIntroduction);
  }


  const openLikedModal = () => {
    setIsLikedModalOpen(true);
    if (modalRef.current) {
      modalRef.current.handleResize();
    }

    getLikedBoardgames(nanoid)
      .then((data) => {
        const parsedData = data.map((item) => ({
          boardgameKey: item.boardgame_key,
          createdAt: item.created_at,
          imageUrl: item.image_url,
          nameEng: item.name_eng,
          nameKor: item.name_kor
        }));
        setLikedBoardgames(parsedData);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  const closeLikedModal = () => setIsLikedModalOpen(false);


  useEffect(() => {
    getUserBasicInfo(nanoid)
      .then((data) => {
        // setId(data.id);
        setIntroduction(data.introduction);
        setName(data.name);
        setNickname(data.nickname);
        setUserImageKey(data.user_image_key);
      })
      .catch((err) => {
        console.log(err);
      });
      
    getRatedBoardgames(nanoid)
    .then((data) => {
      var tmpCount = 0;
      var tmpSum = 0.0;
      const parsedData = data.map((item) => {
        tmpCount++;
        tmpSum+= item.score;
        return {
          ratingKey: item.rating_key,
          score: item.score,
          comment: item.comment,
          boardgameKey: item.boardgame_key,
          nameEng: item.name_eng,
          nameKor: item.name_kor,
          tagKey: item.tag_key,
          imageUrl: item.image_url,
          createdAt: item.created_at,
          updatedAt: item.updated_at
        }
      });
      setReviewCount(tmpCount);
      setAverageScore(tmpSum/tmpCount);
      setRatedBoardgames(parsedData);
    })
    .catch((err) => {
      console.log(err);
    })
    }, [nanoid]);

  useEffect(() => {
    setIsMyPage(isMyInfo(cookies, nanoid));
  }, [cookies, nanoid, isMyPage]);
  return (
    <>
      <div className='div-user-basic-info'>
        <div className='div-user-name-info'>
          <img src="/user_profile/profile_1.png" width="23%" alt="이미지" />
          <div className='div-user-inner-info'>
            <div className='div-nickname'>
              <strong>{nickname}&nbsp;</strong>
              { isMyPage 
                ? 
                <img src="/img/F1_edit_pencil.png" width="5%" alt="" />
                : 
                <></> 
              }
            </div>
            <div className='div-name-info'>
              {name}
              <CustomButton text="로그아웃" onClick={() => userLogout(removeCookie)} />
            </div>
          </div>
        </div>
        { isMyPage 
          ?
          <>
            <textarea 
              value={introduction}
              onChange={introductionChange}
              rows="5"
              placeholder="자기소개를 입력하세요."
              className='custom-textarea'
            />
          </>
        :
          <div className='div-other-introduction'>
            {introduction}
          </div>
        }
        <div className='div-calculated-infos'>
          <div className='div-outer-card' style={{"height" : "32vw", "width" : "49%"}}>
            <div className='div-inner-card mr-2'>
              <div style={{"fontSize" : "1.5em"}}><strong>성와니 님이<br />좋아요한 게임들</strong></div>
              {/* <div style={{"height" : "1rem"}}></div> */}
              <h1 style={{"fontSize" : "4em"}} onClick={() => openLikedModal()}>
                <strong>135</strong>
              </h1>
            </div>  
          </div>
          <div style={{"width" : "49%"}}>
            <div className='div-outer-card' style={{"height" : "15vw", "marginBottom" : "2vw"}}>
              <div className='div-inner-card'>
                <div style={{"fontSize" : "1.3em"}}><strong>리뷰</strong></div>
                {/* <div style={{"height" : "1em"}}></div> */}
                <div style={{"fontSize" : "1.3em"}}><strong>{reviewCount}</strong></div>
              </div>
            </div>
            <div className='div-outer-card' style={{"height" : "15vw"}}>
              <div className='div-inner-card'>
                <h3 style={{"fontSize" : "1.3em"}}><strong>평균 평점</strong></h3>
                {/* <div style={{"height" : "1em"}}></div> */}
                <h3 style={{"fontSize" : "1.3em"}}><strong>{averageScore}</strong></h3>
              </div>
            </div>
          </div>
        </div>
        <div className='div-review-name'>성와니 님의 리뷰</div>
      </div>
      <div className='div-review-background'>
        <div className='div-sort-tabs'>
          <span>최신순</span> / <span>평점순</span>
        </div>
          {ratedBoardgames.map((item,index) => {
            return (
              <UserRating 
                key={index}
                rating_key={item.ratingKey}
                score={item.score}
                comment={item.comment}
                boardgame_key={item.boardgameKey}
                nanoid={nanoid}
                name_eng={item.nameEng}
                name_kor={item.nameKor}
                tag_key={item.tagKey}
                image_url={item.imageUrl}
                created_at={item.createdAt}
                updated_at={item.updatedAt}
              />
            )
          })}
        <div style={{"color" : "white"}}>리뷰 더보기</div>
      </div>
      <CommonModal
        isModalOpen={isLikedModalOpen}
        closeModal={closeLikedModal}
        ref={modalRef}
      >
        {likedBoardgames.map((item, index) => {
          return(
            <UserLikedBoardgame
              key={index}
              nanoid={nanoid}
              boardgame_key={item.boardgameKey}
              name_eng={item.nameEng}
              name_kor={item.nameKor}
              image_url={item.imageUrl}
              date={item.createdAt}
            />
          );
        })}
      </CommonModal>
    </>
  )
}
