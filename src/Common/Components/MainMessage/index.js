// @flow
import React from 'react';
import emailImg from '../../../Common/Assets/email.svg';
import studentImg from '../../../Common/Assets/student.svg';
import personImg from '../../../Common/Assets/person.svg';
import Button from '../Button';
import './styles.scss';

type MainMessageProps = {
  type: string
}
export const MainMessage = (props: MainMessageProps) => {
  const { type } = props;

  return (
    <div className="main-message">
      {(type === 'mail_confirmed')
        ? <div className="mail_confirmed">
            <img className="mail_confirmed__img" src={ emailImg } alt=""/>
            <h3 className="mail_confirmed__title">Ваш адрес электронной почты подтвержден</h3>
            <p className="mail_confirmed__text">Чтобы продолжить, войдите в систему:</p>
            <Button
              text="Вход с паролем"
              modWidth="width-auto"
              modHeight="height-big"
              modStyle="filled"
              modColor="color-main"
            />
          </div>
        : null
      }
      {(type === 'not_yet')
        ? <div className="mail_confirmed">
            <img className="mail_confirmed__img" src={ studentImg } alt=""/>
            <h3 className="mail_confirmed__title">Ваша учетная запись еще не&nbsp;подтверждена как учебное заведение.</h3>
            <p className="mail_confirmed__text">Мы&nbsp;сообщим о&nbsp;подтверждении письмом на&nbsp;указанную электронную почту.</p>
          </div>
        : null
      }
      {(type === 'list_empty')
        ? <div className="mail_confirmed">
            <img className="mail_confirmed__img" src={ personImg } alt=""/>
            <h3 className="mail_confirmed__title">Вы&nbsp;еще не&nbsp;создали ни&nbsp;одного FairCV</h3>
          </div>
        : null
      }
    </div>
  );
};
export default MainMessage;
