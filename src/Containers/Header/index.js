// @flow
import React, { PureComponent } from 'react';
import logoIcon from '../../Common/Assets/main-logo.svg';
import './styles.scss';

export const Header = (props: HeaderProps) => {
  const { user } = props;

  return (
    <header className="header">
      <img className="header__logo" src={ logoIcon } alt="" />

      {(user && user.isConfirmed) ?
        <div className="header__title">Ивановский государственный химико-технологический университет</div>
        : null
      }
      {(user) ?
        <button className="header__log-off">Выход</button>
        : null
      }

    </header>
  )
};
export default Header;
