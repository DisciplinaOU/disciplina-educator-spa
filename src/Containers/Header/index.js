// @flow
import React from "react";
import AAAService from "../../Services/aaa";
import logoIcon from "../../Common/Assets/main-logo.svg";
import "./styles.scss";
import type { Educator } from "../../Services/types";

type HeaderProps = {
  user: Educator
};

export const Header = (props: HeaderProps) => {
  const { user } = props;
  const logout = () => AAAService.logout();
  return (
    <header className="header">
      <a className="header__logo" href="/faircv">
        <img src={logoIcon} alt="disciplina.io" />
      </a>
      {user && user.confirmedAt ? <div className="header__title">{user.name}</div> : null}
      {user ? (
        <button className="header__log-off" onClick={logout} type="button">
          Leave
        </button>
      ) : null}
    </header>
  );
};

export default Header;
