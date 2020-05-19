import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from '../../store/reducers/modal';
import Modal from '../../hoc/Modal';
import Sign from '../Sign';

function SignModal() {
  const isActive = useSelector((state) => state.modal.isActive);
  const dispatch = useDispatch();
  return (
    <Modal isActive={isActive} closeModal={() => dispatch(toggleModal())}>
      <Sign class="Sign--full" />
    </Modal>
  );
}

export default SignModal;
