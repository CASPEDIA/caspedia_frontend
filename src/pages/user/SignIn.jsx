import React from 'react'
import './Signin.css'
import CustomButton from '../../components/common/CustomButton'

export default function SignIn() {
  return (
    <div className='div-signin'>
      <img src="/img/F5_main_logo.png" width="80%" alt="메인 로고" />
      <div className='div-signin-form'>
        <h2>
          아이디
        </h2>
        <input 
          className='custom-input'
          type="text"
          placeholder='아이디 입력...'
        />
        <h2>
          비밀번호
        </h2>
        <input 
          className='custom-input'
          type="password"
          placeholder='비밀번호 입력...'
        />
        <CustomButton
          text="로그인"
        />
      </div>
      <h2 className='mt-3 mx-3'>
        비밀번호 분실 및 기타 문의사항은<br /> 관리자에게 연락 바랍니다.
      </h2>
    </div>
  )
}
