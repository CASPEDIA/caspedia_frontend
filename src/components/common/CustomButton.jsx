import React from 'react'
import './CustomButton.css'

export default function CustomButton({
  onClick,
  text="button"
}) {
  return (
    <div className="div-custom-button" onClick={onClick}>
      {text}
    </div>
  )
}
