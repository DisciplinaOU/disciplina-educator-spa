// @flow
import React, { PureComponent } from 'react';
import logoIcon from '../../Common/Assets/main-logo.svg';
import './styles.scss';
import Button from '../../Common/Components/Button';

type HeaderState = {
  userAuthorized: boolean,
  userConfirmed: boolean
}

class Header extends PureComponent <HeaderProps, HeaderState> {
  state: HeaderState = {
    userAuthorized: false,
    userConfirmed: true
  }

  render() {
    const { userAuthorized, userConfirmed } = this.state;

    return (
      <header className="header">
        <img className="header__logo" src={ logoIcon } alt="" />

        {(userAuthorized && userConfirmed) ?
          <div className="header__title">Ивановский государственный химико-технологический университет</div>
          : null
        }
        {(userAuthorized) ?
          <button className="header__log-off">Выход</button>
          : null
        }

      </header>
    )
  }
}

export default Header;
