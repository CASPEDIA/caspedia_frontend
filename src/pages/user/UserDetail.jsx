import React, { useState } from 'react'
import UserRating from 'components/user/UserRating'
import './UserDetail.css'
import CustomButton from 'components/common/CustomButton';
import CommonModal from 'components/modal/CommonModal';
import UserLikedBoardgame from 'components/user/UserLikedBoardgame';
import { userLogout } from 'hooks/userHooks';

export default function UserDetail() {
  const [introduce, setIntroduce] = useState("");
  const [isLikedModalOpen, setIsLikedModalOpen] = useState(false);
  const introduceChange = (e) => {
    setIntroduce(e.target.value);
  }
  const openLikedModal = () => setIsLikedModalOpen(true);
  const closeLikedModal = () => setIsLikedModalOpen(false);
  return (
    <>
      <div className='div-user-basic-info'>
        <div className='div-user-name-info'>
          <img src="/user_profile/profile_1.png" width="23%" alt="이미지" />
          <div className='div-user-inner-info'>
            <div className='div-nickname'>
              <strong>성와니&nbsp;</strong>
              <img src="/img/F1_edit_pencil.png" width="5%" alt="" />
            </div>
            <div className='div-name-info'>
              박성완
              <CustomButton text="로그아웃" onClick={userLogout} />
            </div>
          </div>
        </div>
        <textarea 
          value={introduce}
          onChange={introduceChange}
          rows="5"
          placeholder="자기소개를 입력하세요."
          className='custom-textarea'
        />
        <div className='div-calculated-infos'>
          <div className='div-outer-card' style={{"height" : "32vw", "width" : "49%"}}>
            <div className='div-inner-card mr-2'>
              <div style={{"fontSize" : "1.5em"}}><strong>성와니 님이<br />좋아요한 게임들</strong></div>
              {/* <div style={{"height" : "1rem"}}></div> */}
              <h1 style={{"fontSize" : "4em"}} onClick={openLikedModal}>
                <strong>135</strong>
              </h1>
            </div>  
          </div>
          <div style={{"width" : "49%"}}>
            <div className='div-outer-card' style={{"height" : "15vw", "marginBottom" : "2vw"}}>
              <div className='div-inner-card'>
                <div style={{"fontSize" : "1.3em"}}><strong>리뷰</strong></div>
                {/* <div style={{"height" : "1em"}}></div> */}
                <div style={{"fontSize" : "1.3em"}}><strong>26</strong></div>
              </div>
            </div>
            <div className='div-outer-card' style={{"height" : "15vw"}}>
              <div className='div-inner-card'>
                <h3 style={{"fontSize" : "1.3em"}}><strong>평균 평점</strong></h3>
                {/* <div style={{"height" : "1em"}}></div> */}
                <h3 style={{"fontSize" : "1.3em"}}><strong>9.3</strong></h3>
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
        <UserRating />
        <UserRating />
        <UserRating />
        <UserRating />
        <UserRating />
        <UserRating />
        <div style={{"color" : "white"}}>리뷰 더보기</div>
      </div>
      <CommonModal
        isModalOpen={isLikedModalOpen}
        closeModal={closeLikedModal}
      >
        <UserLikedBoardgame />
        <UserLikedBoardgame />
        <UserLikedBoardgame />
        <UserLikedBoardgame />
        <UserLikedBoardgame />
        <UserLikedBoardgame />
        <UserLikedBoardgame />
      </CommonModal>
    </>
  )
}
