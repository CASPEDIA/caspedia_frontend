import React from 'react'
import './UserItem.css'
import { useNavigate } from 'react-router-dom'

export default function UserItem({
  clickEvent,
  nanoid='',
  id='',
  nickname="guest",
  name="guest",
  introduction="",
  studentId=1234,
  userImageKey=1,
  enabled=false,
  authorityKey=2,
}) {
  const navigate = useNavigate();
  return (
    <tr onClick={clickEvent}>
      <td width="15%">
        <img className='custom-link' src={`/user_profile/profile_${userImageKey < 10 ? "0" : ""}${userImageKey}.png` || "/user_profile/profile_01.png"} style={{"borderRadius": "8vw", "width" : "10vw", "height" : "10vw"}} alt="이미지"/>
      </td>
      <td width="15%" style={{textAlign:"left", color: "blue", textDecoration: "underline"}}>
        <div onClick={() => navigate("/user/" + nanoid)}>{name}</div>
      </td>
      <td width="15%">
        <div>{studentId}</div>
      </td>
      <td width="20%">
        <div>{nickname}</div>
      </td>
      <td width="15%">
        {authorityKey === 2 ? "사용자" :
          authorityKey === 1 ? "관리자" :
          "기타"}
      </td>
      <td width="10%">
        {enabled ? "V" : "X"}
      </td>
    </tr>
  )
}
