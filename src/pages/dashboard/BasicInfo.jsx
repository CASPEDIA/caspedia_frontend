import React from 'react'
import './BasicInfo.css'
import RecentBoardgame from './RecentBoardgame'
import RecentUser from './RecentUser'

export default function BasicInfo() {
  return (
    <div>
      <div className='m-5'>
        <img src="/img/F5_main_logo.png" alt="caspedia" style={{ height: "30vh","width": 'auto' }}/>
      </div>
      <div className='div-index_introduction'>
        CAST가 함께 만들어가는 새로운 우주<br />
        CAST OB 제작 웹사이트 CASPEDIA입니다. <br />
        우리 함께 만들어가요. <br />
        많은 평가 부탁드립니다. <br />
        <br />
        이용 중 불편하신 점이 있다면 관리자에게 문의 바랍니다. <br />
        <br />
        관리자: 박성완, 박하민, 윤병민, 김고은, 석명진 <br />
      </div>
      <div className='div-recent-info'>
        <RecentBoardgame />
        <RecentUser />
      </div>
    </div>
  )
}
