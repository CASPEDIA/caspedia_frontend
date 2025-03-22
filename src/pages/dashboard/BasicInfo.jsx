import React from 'react'
import './BasicInfo.css'
import RecentBoardgame from './RecentBoardgame'
import RecentUser from './RecentUser'

export default function BasicInfo() {
  return (
    <div>
      <div className='m-3'>
        <img src="/img/F5_event_01.png" alt="caspedia" style={{ height: "auto","width": "100%" }}/>
        {/* <img src="/img/F5_main_logo.png" alt="caspedia" style={{ height: "30vh","width": 'auto' }}/> */}
      </div>
      <div className='div-index_introduction'>
        <br />
        이용 중 불편하신 점이 있다면 관리자에게 문의 바랍니다. <br />
        <br />
        관리자: 박성완, 박하민, 윤병민, 김고은, 석명진 <br />
        버그 리포트 :&nbsp;
        <a href="https://forms.gle/LrPrHjuNeZy6bphc6" target="_blank" style={{color:"#00BFFF"}} rel="noopener noreferrer">
        구글폼 링크
        </a>
      </div>
      <div className='div-recent-info'>
        <RecentBoardgame />
        <RecentUser />
      </div>
    </div>
  )
}
