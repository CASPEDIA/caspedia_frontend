import React, { useCallback, useEffect, useRef, useState } from 'react'
import UserRating from 'components/user/UserRating'
import './UserDetail.css'
import CustomButton from 'components/common/CustomButton';
import CommonModal from 'components/modal/CommonModal';
import UserLikedBoardgame from 'components/user/UserLikedBoardgame';
import { checkMyNewNickname, getLikedBoardgames, getRatedBoardgames, getUserBasicInfo, isMyInfo, setMyNewNickname, setMyNewPassword, setUserIntroduction, userLogout } from 'hooks/userHooks';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { debounce } from 'lodash';
import SecondModal from 'components/modal/SecondModal';
import CancelButton from 'components/common/CancelButton';

export default function UserDetail() {
  const [cookies,,removeCookie] = useCookies(["jwtToken", "nanoid"]);
  const [isLikedModalOpen, setIsLikedModalOpen] = useState(false);
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const {nanoid} = useParams();
  // const [id, setId] = useState('');
  const [introduction, setIntroduction] = useState("");
  const [name, setName] = useState('');

  const [nickname, setNickname] = useState('');

  const [newNickname, setNewNickname] = useState('');
  const [newNicknameMessage, setNewNicknameMessage] = useState('');
  const [newNicknameClassname, setNewNicknameClassname] = useState('');
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordMessage, setNewPasswordMessage] = useState('');
  const [newPasswordClassname, setNewPasswordClassname] = useState('');

  const [userImageKey, setUserImageKey] = useState('');
  const [isMyPage, setIsMyPage] = useState(false);
  const [likedCount, setLikedCount] = useState(0);
  const [likedBoardgames, setLikedBoardgames] = useState([]);
  const [ratedBoardgames, setRatedBoardgames] = useState([]);
  const [sortOrder, setSortOrder] = useState({ type: "updatedAt", direction: "desc" }); // 초기 정렬: 작성순 ▼
  const [ratingCount, setratingCount] = useState(0);
  const [averageScore, setAverageScore] = useState(0.0);

  const likedModalRef = useRef(null);
  const nicknameModalRef = useRef(null);
  const passwordModalRef = useRef(null);
  const changeNicknameRef = useRef(null);
  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const debouncedIntroductionChange = useCallback(
    debounce((newIntroduction) => 
      setUserIntroduction(newIntroduction)
        .then((data) => {
          // console.log(data);
        })
        .catch((e) => {
          console.log(e);
        }) 
        , 500),
    []
  );

  const introductionChange = (e) => {
    const newIntroduction = e.target.value;
    setIntroduction(newIntroduction);
    debouncedIntroductionChange(newIntroduction);
  }

  // 정렬 함수
  const sortRatedBoardgames = (type, direction) => {
    const sorted = [...ratedBoardgames].sort((a, b) => {
      if (type === "score") {
        if (a.score !== b.score) {
          return direction === "desc" ? b.score - a.score : a.score - b.score;
        }
        // 점수가 같을 경우 updatedAt로 정렬
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);
        return direction === "desc" ? dateB - dateA : dateA - dateB;
      } else if (type === "updatedAt") {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);
        return direction === "desc" ? dateB - dateA : dateA - dateB;
      }
      return 0;
    });
    setRatedBoardgames(sorted);
  };

  // 작성순 클릭 핸들러
  const handleSortByDate = () => {
    const newDirection = sortOrder.type === "updatedAt" && sortOrder.direction === "desc" ? "asc" : "desc";
    setSortOrder({ type: "updatedAt", direction: newDirection });
    sortRatedBoardgames("updatedAt", newDirection);
  };

  // 평점순 클릭 핸들러
  const handleSortByScore = () => {
    const newDirection = sortOrder.type === "score" && sortOrder.direction === "desc" ? "asc" : "desc";
    setSortOrder({ type: "score", direction: newDirection });
    sortRatedBoardgames("score", newDirection);
  };


  const openLikedModal = () => {
    if (likedCount === 0) return null;
    setIsLikedModalOpen(true);
    if (likedModalRef.current) {
      likedModalRef.current.handleResize();
    }

  }
  const closeLikedModal = () => setIsLikedModalOpen(false);

  const openNicknameModal = () => {
    setIsNicknameModalOpen(true);
    if (nicknameModalRef.current) {
      nicknameModalRef.current.handleResize();
    }
  }
  const closeNicknameModal = () => setIsNicknameModalOpen(false);

  const openPasswordModal = () => {
    setIsPasswordModalOpen(true);

  }

  const closePasswordModal = () => setIsPasswordModalOpen(false);
  
  const handleChangeCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  }

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  }

  const handleChangeConfirmPassword = (e) => {
    const newValue = e.target.value;
    setConfirmPassword(newValue);
    if (newValue.length !== 0 ) {
      if (newValue === newPassword) {
        setNewPasswordClassname('div-password-confirm');
        setNewPasswordMessage("사용 가능한 비밀번호입니다.");
      } else {
        setNewPasswordClassname("div-password-wrong");
        setNewPasswordMessage("새 비밀번호가 일치하지 않습니다.");
      }
    }
    
  }

  const checkValidatePassword = (newState) => {
    if (newState.length < 8 || newState.length > 64) {
      return false;
    } else return true;
  }

  const putNewPassword = (oldPassword, newPassword) => {
    setMyNewPassword(oldPassword, newPassword)
      .then((data) => {
        closePasswordModal();
      })
      .catch((e) => {
        if (e.response && e.response.status === 400) {
          setNewPasswordClassname('div-password-wrong');
          setNewPasswordMessage(e.response.data.message);
        }
      })
  }

  const handlePutNewPassword = () => {
    putNewPassword(currentPassword, newPassword);
  }

  const handleChangeNickname = () => {
    openNicknameModal();
  }

  const handleChangeNewNickname = (e) => {
    setNewNickname(e.target.value);
    handleSetMyNewNickname(e.target.value);
  }

  const checkValidateNickname = (newState) => {
    const basePattern = /^[가-힣a-zA-Z0-9_.]+$/;
  
    // 기본 패턴 확인
    if (!basePattern.test(newState)) {
      setNewNicknameClassname('div-nickname-wrong');
      setNewNicknameMessage("닉네임에 허용되지 않는 문자가 포함되어 있습니다.");
      return false;
    }
  
    // 가중치 계산: 한글은 2, 영어는 1로 설정
    let weightedLength = 0;
    for (const char of newState) {
      if (/[가-힣]/.test(char)) {
        weightedLength += 2; // 한글은 2
      } else if (/[a-zA-Z]/.test(char)) {
        weightedLength += 1; // 영어는 1
      } else {
        weightedLength += 1; // 숫자, '_', '.'는 1로 계산
      }
    }
  
    // 길이 조건 확인
    if (weightedLength > 20) {
      setNewNicknameClassname('div-nickname-wrong');
      setNewNicknameMessage("닉네임의 가중치 합이 20을 초과할 수 없습니다.");
      return false;
    }
  
    return true;
  };
  

  // 동적 스타일
  const getTabStyle = (type) => ({
    color: sortOrder.type === type ? "black" : "white",
    WebkitTextStroke: sortOrder.type === type ? "1px white" : "",
    fontWeight: sortOrder.type === type ? "bold" : "",
    padding: "5px",
    cursor: "pointer",
  });

  const putNewNickname = (newState) => {
    setMyNewNickname(newState)
      .then((data) => {
        setNickname(newNickname);
        closeNicknameModal();
      })
      .catch((e) => {
        if (e.response && e.response.status === 400) {
          setNewNicknameClassname('div-nickname-wrong');
          setNewNicknameMessage(e.response.data.message);
        }
      });
  }

  const handleSetMyNewNickname = (newState) => {
    if(checkValidateNickname(newState)){
      checkMyNewNickname(newState)
        .then((data) => {
          // setNickname(newState);
          setNewNicknameClassname('div-nickname-confirm');
          setNewNicknameMessage("사용 가능한 닉네임입니다.");
        })
        .catch((e) => {
          if (e.response && e.response.status === 400) {
            setNewNicknameClassname('div-nickname-wrong');
            setNewNicknameMessage(e.response.data.message);
          }
        });
    }
  }
  
  const handleNicknameChangeConfirmMessage = () => {
    putNewNickname(newNickname);
  }
  
  function keyPress(e){
    if(e.key === 'Enter') {
      putNewNickname(newNickname);
    }
  }
  
  useEffect(() => {
    getUserBasicInfo(nanoid)
    .then((data) => {
      // setId(data.id);
      setIntroduction(data.introduction);
      setName(data.name);
      setNickname(data.nickname);
      setNewNickname(data.nickname);
      setUserImageKey(data.user_image_key);
    })
    .catch((err) => {
      console.log(err);
    });
    
    getLikedBoardgames(nanoid)
      .then((data) => {
        const parsedData = data.map((item) => ({
          boardgameKey: item.boardgame_key,
          createdAt: item.created_at,
          imageUrl: item.image_url,
          nameEng: item.name_eng,
          nameKor: item.name_kor
        }));
        setLikedCount(parsedData.length);
        setLikedBoardgames(parsedData);
      })
      .catch((err) => {
        console.log(err);
      })
      
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
        setratingCount(tmpCount);
        if (tmpCount === 0){
          setAverageScore(0);
        } else {
          setAverageScore(Math.round((tmpSum/tmpCount)*100)/100);
        }
        setRatedBoardgames(parsedData.reverse());
      })
      .catch((err) => {
        console.log(err);
      })
    }, [nanoid]);

  useEffect(() => {
    setIsMyPage(isMyInfo(cookies, nanoid));
  }, [cookies, nanoid, isMyPage]);

  useEffect(() => {
    if (isNicknameModalOpen && changeNicknameRef.current) {
      changeNicknameRef.current.focus();
    }
  }, [isNicknameModalOpen]);

  return (
    <>
      <div className='div-user-basic-info'>
        <div className='div-user-name-info'>
          <img src={`/user_profile/profile_${userImageKey}.png` || "/user_profile/profile_1.png"} width="23%" alt="이미지" />
          <div className='div-user-inner-info'>
            <div className='div-nickname'>
              <strong>{nickname}&nbsp;</strong>
              { isMyPage 
                ? 
                <img src="/img/F1_edit_pencil.png" style={{"cursor":"pointer"}} width="5%" alt="" onClick={handleChangeNickname}/>
                : 
                <></> 
              }
            </div>
            <div className='div-name-info'>
              {name}
              {isMyPage ?
              <>
                <CancelButton
                  text="비밀번호 변경"
                  onClick={() => openPasswordModal()}
                  />
                <CustomButton 
                  text="로그아웃" 
                  onClick={() => userLogout(removeCookie)} 
                  />
              </>
              : ""}
            </div>
          </div>
        </div>
        <div style={{"fontSize": "0.7em","textAlign" : "left", "marginTop" : "0.7em"}}>자기소개 {isMyPage ? `(최대 300자)` : ``}</div>
        { isMyPage 
          ?
          <>
            <textarea 
              value={introduction}
              onChange={introductionChange}
              rows="5"
              placeholder="자기소개를 입력하세요."
              className='custom-textarea'
              maxLength="299"
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
              <div style={{"fontSize" : "1.5em"}}><strong>{nickname} 님이<br />좋아요한 게임들</strong></div>
              {/* <div style={{"height" : "1rem"}}></div> */}
              <h1 style={{"fontSize" : "4em"}} onClick={() => openLikedModal()}>
                <strong>{likedCount}</strong>
              </h1>
            </div>  
          </div>
          <div style={{"width" : "49%"}}>
            <div className='div-outer-card' style={{"height" : "15vw", "marginBottom" : "2vw"}}>
              <div className='div-inner-card'>
                <div style={{"fontSize" : "1.3em"}}><strong>리뷰</strong></div>
                {/* <div style={{"height" : "1em"}}></div> */}
                <div style={{"fontSize" : "1.3em"}}><strong>{ratingCount}</strong></div>
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
          <span
            onClick={handleSortByDate}
            style={getTabStyle("updatedAt")}
          >
            작성순 {sortOrder.type === "updatedAt" ? (sortOrder.direction === "desc" ? "▼" : "▲") : ""}
          </span>
            {" "}/{" "}
          <span
            onClick={handleSortByScore}
            style={getTabStyle("score")}
          >
            평점순 {sortOrder.type === "score" ? (sortOrder.direction === "desc" ? "▼" : "▲") : ""}
          </span>
        </div>
          {ratedBoardgames.map((item,index) => {
            return (
              <UserRating 
                key={index}
                ratingKey={item.ratingKey}
                score={item.score}
                comment={item.comment}
                boardgameKey={item.boardgameKey}
                nanoid={nanoid}
                nameEng={item.nameEng}
                nameKor={item.nameKor}
                tagKey={item.tagKey}
                imageUrl={item.imageUrl}
                createdAt={item.createdAt}
                updatedAt={item.updatedAt}
              />
            )
          })}
        {/* <div style={{"color" : "white"}}>리뷰 더보기</div> */}
      </div>
      <CommonModal
        isModalOpen={isLikedModalOpen}
        closeModal={closeLikedModal}
        ref={likedModalRef}
      >
        {likedBoardgames.map((item, index) => {
          return(
            <UserLikedBoardgame
              key={index}
              nanoid={nanoid}
              boardgameKey={item.boardgameKey}
              nameEng={item.nameEng}
              nameKor={item.nameKor}
              imageUrl={item.imageUrl}
              date={item.createdAt}
            />
          );
        })}
      </CommonModal>
      <SecondModal
        isModalOpen={isNicknameModalOpen}
        closeModal={closeNicknameModal}
        ref={nicknameModalRef}
      >
        <div>새로운 닉네임을 입력하세요</div>
        <input
          value={newNickname}
          onChange={handleChangeNewNickname}
          rows="5"
          placeholder="닉네임을 입력하세요"
          className='nickname-input'
          ref={changeNicknameRef}
          onKeyDown={keyPress}
        />
        <div className={`div-new-nickname-message ${newNicknameClassname}`}>{newNicknameMessage}</div>
        <div onClick={handleNicknameChangeConfirmMessage}>
          변경하기
        </div>
      </SecondModal>
      <SecondModal
        isModalOpen={isPasswordModalOpen}
        closeModal={closePasswordModal}
        ref={passwordModalRef}
      >
        <div>새 비밀번호를 설정하기 위한 정보를 입력하세요</div>
        <input
          value={currentPassword}
          onChange={handleChangeCurrentPassword}
          type="password"
          placeholder="현재 비밀번호를 입력하세요"
          className='password-input'
          ref={currentPasswordRef}
          // minLength="8"
          maxLength="64"
          />
        <input
          value={newPassword}
          onChange={handleChangeNewPassword}
          type="password"
          placeholder="새 비밀번호를 입력하세요"
          className='password-input'
          ref={newPasswordRef}
          // minLength="8"
          maxLength="64"
          />
        <input
          value={confirmPassword}
          onChange={handleChangeConfirmPassword}
          type="password"
          placeholder="새 비밀번호를 다시 입력하세요"
          className='password-input'
          ref={confirmPasswordRef}
          // minLength="8"
          maxLength="64"
        />
        <div className={`div-new-password-message ${newPasswordClassname}`}>{newPasswordMessage}</div>
        <div onClick={handlePutNewPassword}>
          변경하기
        </div>
      </SecondModal>
    </>
  )
}
