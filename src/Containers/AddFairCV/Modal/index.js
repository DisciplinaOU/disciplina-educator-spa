// @flow
import React from 'react';
import Button from '../../../Common/Components/Button';
import './styles.scss';

export const MODAL_CONTENT_STATE = {
  SUCCESS: 'SUCCESS',
  DELETE: 'DELETE',
  CLOSE: 'CLOSE'
}

type ModalType = {
  modalContent: string
}

export const Modal = (props: ModalType) => {
  const {madalContent} = props;
  return (
    <div className="modal">
      <div className="modal__container">
        {{
          [MODAL_CONTENT_STATE.SUCCESS]:
          <>
            <div className="modal__title">FairCV создано</div>
            <div className="modal__reminder reminder">
              <div className="reminder__text">
                <span></span>
                <p>Первые несколько минут после создания новое FairCV может не проходить валидацию. Это связано с задержкой появления информации в блокчейне.</p>
              </div>
              <Button
                text="Скачать PDF"
                modWidth="width-auto"
                modHeight="height-big"
                modStyle="filled"
                modColor="color-main"
                callback={()=>{}}
              />
              <Button
                text="Закрыть и вернуться к списку"
                modWidth="width-auto"
                modHeight="height-big"
                modStyle="empty"
                modColor="color-main"
                callback={()=>{}}
              />
            </div>
          </>,
          [MODAL_CONTENT_STATE.DELETE]:<>
            <div className="modal__title">Вы уверены что хотите выйти?</div>
            <p className="modal__text">Все введенные данные будут утеряны</p>
            <Button
              text="Выйти"
              modWidth="width-auto"
              modHeight="height-big"
              modStyle="filled"
              modColor="color-red"
              callback={()=>{}}
            />
            <Button
              text="Отмена"
              modWidth="width-auto"
              modHeight="height-big"
              modStyle="empty"
              modColor="color-main"
              callback={()=>{}}
            />
          </>,
          [MODAL_CONTENT_STATE.CLOSE]:<>
            <div className="modal__title">Вы уверены что хотите удалить эту оценку?</div>
            <Button
              text="Удалить"
              modWidth="width-auto"
              modHeight="height-big"
              modStyle="filled"
              modColor="color-red"
              callback={()=>{}}
            />
            <Button
              text="Отмена"
              modWidth="width-auto"
              modHeight="height-big"
              modStyle="empty"
              modColor="color-main"
              callback={()=>{}}
            />
          </>,
          }[madalContent]}
      </div>
    </div>
  )
}

export default Modal;
