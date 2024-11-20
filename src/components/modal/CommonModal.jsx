import React from 'react'
import PropTypes from "prop-types";
import './CommonModal.css'

const CommonModal = ({
  isModalOpen,
  closeModal,
  children
}) => {
  if (!isModalOpen) return null;
  return (
    <div className='div-modal-overlay' onClick={closeModal}>
      <div className='div-modal-container' >
        <div className='div-scroll-container'>
          {children}
        </div>
      </div>
    </div>
  )
}

CommonModal.propTypes = {
  // height: PropTypes.string.isRequired, // 높이를 필수로 받음
  children: PropTypes.node, // 자식 요소를 받음
};

export default CommonModal;