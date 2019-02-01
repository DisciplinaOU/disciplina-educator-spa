// @flow
import React from 'react';
import AAAService from '../../Services/aaa';
import logoIcon from '../../Common/Assets/main-logo.svg';
import './styles.scss';

type HeaderProps = {
  user: {
    isConfirmed: boolean
  }
}

export const Header = (props: HeaderProps) => {
  const { user } = props;
  const logout = () => AAAService.logout();
  return (
    <header className="header">
      <img className="header__logo" src={logoIcon} alt="" />
      {(user && user.isConfirmed) ?
        <div className="header__title">Ивановский государственный химико-технологический университет</div>
        : null
      }
      {(user) ?
        <button className="header__log-off" onClick={logout}>Выход</button>
        : null
      }
    </header>
  )
};

export default Header;
