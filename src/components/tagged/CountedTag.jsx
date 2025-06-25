import React from 'react'
import './CountedTag.css'
import { useNavigate } from 'react-router-dom'

export default function CountedTag({
  text="text",
  idx=1,
  count=1,
}) {
  const navigate = useNavigate();
  return (
    <div className='custom-link div-selected-tag' onClick={() => navigate(`/tagged/${idx}`)}>
      <div>
        {text}
      </div>
      <div>
        {count}
      </div>
    </div>
  )
}
