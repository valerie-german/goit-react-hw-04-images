import  {  useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export function Modal ({activeObj, onClose}){
 
  useEffect(()=>{
    window.addEventListener('keydown', handleKeyDown);
    return()=>{window.removeEventListener('keydown', handleKeyDown)};
  });

 const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  
    const { largeImageURL, tags } = activeObj;

    return createPortal(
      <div className={css.Overlay} onClick={handleBackdropClick}>
        <div className={css.Modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }


Modal.propTypes = {
  onClose: PropTypes.func,
  activeObj: PropTypes.object,
};
