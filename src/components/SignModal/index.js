import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from '../../store/reducers/modal';
import './signModal.css';
import Sign from '../Sign';

function SignModal() {
  const isActive = useSelector(state => state.modal.isActive);
  const dispatch = useDispatch();
  return (
    <div className={`Modal ${isActive ? 'Modal--active' : ''}`}>
      {isActive && (
        <React.Fragment>
          <div
            className="Modal__overlay"
            onClick={() => {
              dispatch(toggleModal());
            }}
          ></div>
          <div className="Modal__content">
            <Sign class="Sign--full" />
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default SignModal;
