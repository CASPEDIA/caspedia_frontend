import React from 'react'
import './BoardgameTagInfo.css'

export default function BoardgameTagInfo() {
  return (
    <div className='div-boardgame-best-tags'>
      <div className='div-title-tag'>
        CAST가 고른 태그
      </div>
      <Tag text='4인베스트🖖'/>
      <Tag text='3인 베스트🤟'/>
      <Tag text='숙련자들이 즐기는👨🏻‍🎓'/>
      <Tag text='또 해보고 싶은💘'/>
      <Tag text='구성물이 예쁜💎'/>
    </div>
  )
}

function Tag({
  text="text"
}){
  return(
    <div className='div-selected-tag'>
      {text}
    </div>
  )
}