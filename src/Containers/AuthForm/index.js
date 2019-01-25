// @flow
import React, { PureComponent } from 'react';
import logoIcon from '../../Common/Assets/main-logo.svg';
import './styles.scss';
import Button from '../../Common/Components/Button'

export const AUTH_FORM_STATES = {
  SIGN_IN: 'signIn',
  SIGN_UP: 'signUp',
  RESET: 'reset',
  RECOVERY: 'recovery'
};

type AuthFormState = {
  currentState: $Values<typeof AUTH_FORM_STATES>
}

class AuthForm extends PureComponent <{}, AuthFormState> {
  state: AuthFormState = {
    currentState: AUTH_FORM_STATES.SIGN_IN
  };

  goToRegisterTab = () => this.setState({ currentState: AUTH_FORM_STATES.SIGN_UP });

  goToSigninTab = () => this.setState({ currentState: AUTH_FORM_STATES.SIGN_IN });

  goToResetTab = () => this.setState({ currentState: AUTH_FORM_STATES.RESET });

  goToRecoveryTab = () => this.setState({ currentState: AUTH_FORM_STATES.RECOVERY });

  render() {
    const { currentState } = this.state;

    return (
      <div className="auth-form">
        <div className="auth-form__header">
          <img className="auth-form__logo" src={ logoIcon } alt="" />
        </div>
        <div className="auth-form__main">
          {{
            [AUTH_FORM_STATES.SIGN_IN]: <>
              <div className="auth-form__tabs">
                <button className="tab active" href="1">Вход с паролем</button>
                <button className="tab" href="1" onClick={this.goToRegisterTab}>Регистрация</button>
              </div>
              <form className="secret__key-auth login-form">
                <div className="login-form__input-container">
                  <input className="login-form__input login-form__input--email" placeholder="Электронная почта" />
                  <span className="login-form__message">errormsg</span>
                </div>
                <div className="login-form__input-container">
                  <input className="login-form__input login-form__input--password" placeholder="Пароль" />
                  <span className="login-form__message">errormsg</span>
                </div>
                <Button
                  text="Войти"
                  modWidth="width-full"
                  modHeight="height-big"
                  modStyle="filled"
                  modColor="color-main"
                  callback={()=>{}}
                />
                <Button
                  text="Я забыл пароль"
                  modStyle="simple"
                  modColor="color-main"
                  callback={this.goToRecoveryTab}
                />
              </form>
            </>,
            [AUTH_FORM_STATES.SIGN_UP]: <>
              <div className="auth-form__tabs">
                <button className="tab" href="1" onClick={this.goToSigninTab}>Вход с паролем</button>
                <button className="tab active" href="1">Регистрация</button>
              </div>
              <form className="secret__key-auth login-form">
                <div className="login-form__input-container">
                  <input className="login-form__input login-form__input--email" placeholder="Электронная почта" />
                  <span className="login-form__message">errormsg</span>
                </div>
                <div className="login-form__input-container">
                  <input className="login-form__input login-form__input--org-name" placeholder="Название организации" />
                  <span className="login-form__message">errormsgsdfdsf</span>
                </div>
                <div className="login-form__input-container">
                  <input className="login-form__input login-form__input--site" placeholder="Сайт организации" />
                  <span className="login-form__message">errormsg</span>
                </div>
                <div className="login-form__input-container">
                  <input className="login-form__input login-form__input--password" placeholder="Пароль" />
                  <span className="login-form__message">errormsg</span>
                </div>
                <Button
                  text="Зарегистрироваться"
                  modWidth="width-full"
                  modHeight="height-big"
                  modStyle="filled"
                  modColor="color-main"
                  callback={()=>{}}
                />
              </form>
            </>,
            [AUTH_FORM_STATES.RESET]: <>
              <p className="auth-form__title">Создание нового пароля</p>
              <form className="login-form">
                <div className="login-form__input-container">
                  <input className="login-form__input login-form__input--password" placeholder="Новый пароль" />
                  <span className="login-form__message">errormsg</span>
                </div>
                <Button
                  text="Сохранить"
                  modWidth="width-full"
                  modHeight="height-big"
                  modStyle="filled"
                  modColor="color-main"
                  callback={()=>{}}
                />
              </form>
            </>,
            [AUTH_FORM_STATES.RECOVERY]: <>
              <Button
                callback={this.goToSigninTab}
                text="Вернуться назад"
                modStyle="arrow-back"
                modColor="color-main"
              />
              <p className="auth-form__title">Восстановление пароля</p>
              <form className="login-form">
                <div className="login-form__input-container">
                  <input className="login-form__input login-form__input--password" placeholder="Новый пароль" />
                  <span className="login-form__message">errormsg</span>
                </div>
                <Button
                  text="Отправить"
                  modWidth="width-full"
                  modHeight="height-big"
                  modStyle="filled"
                  modColor="color-main"
                  callback={()=>{}}
                />
              </form>
            </>
          }[currentState]}
        </div>
      </div>
    )
  }
};

export default AuthForm;
