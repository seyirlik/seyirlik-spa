import React from 'react';
import './modal.css';

function Modal({ children, isActive, closeModal }) {
  return (
    <div className={`Modal ${isActive ? 'Modal--active' : ''}`}>
      {isActive && (
        <React.Fragment>
          <div
            className="Modal__overlay"
            onClick={() => {
              closeModal();
            }}
          ></div>
          <div className="Modal__content">{children}</div>
        </React.Fragment>
      )}
    </div>
  );
}

export default Modal;
