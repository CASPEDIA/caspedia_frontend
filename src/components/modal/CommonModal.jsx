import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import PropTypes from "prop-types";
import './CommonModal.css';

const CommonModal = forwardRef(({
  isModalOpen,
  closeModal,
  children
}, ref) => {
  const overlayRef = useRef(null);

  const handleResize = () => {
    const width = window.innerWidth;

    if (overlayRef.current) {
      if (width < 800) {
        overlayRef.current.style.width = "100%";
      } else {
        overlayRef.current.style.width = "800px";
      }
    }
  };

  useImperativeHandle(ref, () => ({
    handleResize, // 외부에서 호출 가능
  }));

  useEffect(() => {
    if (isModalOpen) {
      handleResize();
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div
      ref={overlayRef}
      className='div-modal-overlay'
      onClick={closeModal}
    >
      <div className='div-modal-container' onClick={(e) => e.stopPropagation()}>
        <div className='div-scroll-container'>
          {children}
        </div>
      </div>
    </div>
  );
});

CommonModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default CommonModal;
