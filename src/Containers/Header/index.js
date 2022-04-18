// @flow
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logoIcon from "../../Common/Assets/main-logo.svg";
import { AuthContext } from "../../Contexts/Auth";

import "./styles.scss";

export const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <Link className="header__logo" to="/faircv">
        <img src={logoIcon} alt="disciplina.io" />
      </Link>
      {user && user.confirmedAt ? (
        <div className="header__title">{user.username ? user.username : user.publicAddress}</div>
      ) : null}
      {user ? (
        <button className="header__log-off" onClick={logout} type="button">
          Logout
        </button>
      ) : null}
    </header>
  );
};

export default Header;
