import React, { useEffect, useRef, useState } from 'react'
import './Signin.css'
import CustomButton from 'components/common/CustomButton'
import { hasAuth, userLogin } from "hooks/userHooks"
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const idInputRef = useRef(null);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const idChange = (e) => {
    setId(e.target.value);
  }

  const passwordChange = (e) => {
    setPassword(e.target.value);
  }

  const loginKeyDown = (e) => {
    if (e.key === 'Enter') {
      userLogin(id,password);
    }
  }

  useEffect(() => {
    if (hasAuth()) {
      navigate('/');
    }
    else if (idInputRef.current) {
      idInputRef.current.focus();
    }
  }, [])
  return (
    <div className='div-signin'>
      <img src="/img/F5_main_logo.png" style={{height:"30vh", width:"auto"}}  alt="메인 로고" />
      <div style={{height:"8vh"}}></div>
      <div className='div-signin-form'>
        <div>
          아이디
        </div>
        <input 
          className='custom-input'
          type="text"
          ref={idInputRef}
          onChange={idChange}
          placeholder='아이디 입력...'
        />
        <div>
          비밀번호
        </div>
        <input 
          className='custom-input'
          type="password"
          onChange={passwordChange}
          onKeyDown={loginKeyDown}
          placeholder='비밀번호 입력...'
        />
        <CustomButton
          text="로그인"
          onClick={
            () => {userLogin(id,password)}
          }
        />
      </div>
      <div className='mt-3 mx-3'>
        비밀번호 분실 및 기타 문의사항은<br /> 관리자에게 연락 바랍니다.
      </div>
    </div>
  )
}
