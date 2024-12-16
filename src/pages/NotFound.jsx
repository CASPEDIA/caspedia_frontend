import React, { useEffect } from 'react'
import './NotFound.css'
import { useLocation, useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className='div-notfound-background'>
      <br />
      <p style={{"fontSize" : "2em", "fontWeight": "bold"}}>
        N o t&nbsp;&nbsp;F o u n d
      </p>
      <br />
      <p>
        올바르지 않은 경로로 접근하였거나<br />
        페이지를 찾을 수 없습니다.
      </p>
      <img src="/img/F6_not_found.png" width="70%" alt="NOTFOUND" />
      <p>
        우주는 광활합니다....<br />
        길을 잃지 않도록 조심하세요.
      </p>
    </div>
  )
}
