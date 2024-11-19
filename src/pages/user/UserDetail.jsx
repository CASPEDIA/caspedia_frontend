import React, { useState } from 'react'
import UserRating from '../../components/user/UserRating'
import './UserDetail.css'
import CustomButton from '../../components/common/CustomButton';

export default function UserDetail() {
  const [introduce, setIntroduce] = useState("");
  const introduceChange = (e) => {
    setIntroduce(e.target.value);
  }
  const logout = () => {
    console.log("로그아웃");
  }
  return (
    <>
      <div className='div-user-basic-info'>
        <div className='div-user-name-info'>
          <img src="/user_profile/profile_1.png" width="23%" alt="이미지" />
          <div className='div-user-inner-info'>
            <h1 className='h1-nickname'>
              성와니&nbsp;
              <img src="/img/F1_edit_pencil.png" width="5%" alt="" />
            </h1>
            <div className='div-name-info'>
              <h3>박성완</h3>
              <CustomButton text="로그아웃" onClick={logout} />
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
          <div className='div-outer-card' style={{"height" : "17rem", "width" : "49%"}}>
            <div className='div-inner-card mr-2'>
              <h1><strong>성와니 님이<br />좋아요한 게임들</strong></h1>
              <div style={{"height" : "1rem"}}></div>
              <h1 style={{"fontSize" : "5.5rem"}}><strong>135</strong></h1>
            </div>  
          </div>
          <div style={{"width" : "49%"}}>
            <div className='div-outer-card' style={{"height" : "8rem", "marginBottom" : "1rem"}}>
              <div className='div-inner-card'>
                <h3><strong>리뷰</strong></h3>
                <div style={{"height" : "1rem"}}></div>
                <h3><strong>26</strong></h3>
              </div>
            </div>
            <div className='div-outer-card' style={{"height" : "8rem"}}>
              <div className='div-inner-card'>
                <h3><strong>평균 평점</strong></h3>
                <div style={{"height" : "1rem"}}></div>
                <h3><strong>9.3</strong></h3>
              </div>
            </div>
          </div>
        </div>
        <h1 className='h1-review-name'>성와니 님의 리뷰</h1>
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
        <h3 style={{"color" : "white"}}>리뷰 더보기</h3>
      </div>
    </>
  )
}
