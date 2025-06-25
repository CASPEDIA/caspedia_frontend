import React from 'react'
import './CustomTag.css'
import { useNavigate } from 'react-router-dom'
export default function CustomTag({
  text = "Selected",
  idx = 1
}) {
  const navigate = useNavigate();
  return (
    <div className='custom-link div-tag-item' onClick={() => navigate(`/tagged/${idx}`)}>
      {text}
    </div>
  )
}
