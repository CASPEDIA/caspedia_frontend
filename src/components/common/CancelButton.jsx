import React from 'react'
import './CancelButton.css'

export default function CancelButton({
  onClick,
  text="button"
}) {
  return (
    <div className="div-cancel-button" onClick={onClick}>
      {text}
    </div>
  )
}
