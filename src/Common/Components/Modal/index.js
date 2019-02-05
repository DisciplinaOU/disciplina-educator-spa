// @flow
import React from 'react';
import './styles.scss';

type ModalType = {
  content: any
}

export const Modal = (props: ModalType) => {
  const {content} = props;
  return (
    <div className="modal">
      <div className="modal__container">{content}</div>
    </div>
  )
}

export default Modal;
