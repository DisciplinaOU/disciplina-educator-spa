// @flow
import React, { PureComponent } from 'react';
import AAAService from '../../Services/aaa';
import logoIcon from '../../Common/Assets/main-logo.svg';
import './styles.scss';
import Button from '../../Common/Components/Button'
import type { IAAAService } from '../../Services/types';

export const AUTH_FORM_STATES = {
  SIGN_IN: 'signIn',
  SIGN_UP: 'signUp',
  RESET: 'reset',
  RECOVERY: 'recovery'
};

type AuthFormState = {
  currentState: $Values<typeof AUTH_FORM_STATES>,
  isLoading: boolean,
  email: string,
  password: string,
  newPassword: string,
  name: string,
  url: string,
  token: string
}

type AuthFormProps = {
  history: any,
  location: any
}

class AuthForm extends PureComponent <AuthFormProps, AuthFormState> {
  Service: IAAAService = AAAService;

  state: AuthFormState = {
    currentState: AUTH_FORM_STATES.SIGN_IN,
    isLoading: false,
    email: '',
    password: '',
    newPassword: '',
    name: '',
    url: '',
    token: ''
  };

  componentDidMount(): void {
    const { location } = this.props;
    let urlParams;
    let token;
    if (location) {
      urlParams = new URLSearchParams(location.search);
      token = urlParams.get('reset_password_token') || '';
    }
    if (token) {
      this.setState({ token });
      this.goToResetTab();
    }
  }

  login = async () => {
    const { email, password } = this.state;
    const { history } = this.props;
    this.startLoading();
    try {
      await this.Service.login(email, password);
      history.push('/faircv');
    } catch (e) {
      console.log(e)
    } finally {
      this.stopLoading();
    }
  };

  signUp = async () => {
    const { email, password, name, url } = this.state;
    this.startLoading();
    try {
      await this.Service.createUser(email, name, url, password);
    } catch (e) {
      console.log(e)
    } finally {
      this.stopLoading();
    }
  };

  setNewPassword = async () => {
    const { newPassword, token } = this.state;
    this.startLoading();
    try {
      await this.Service.createPassword(newPassword, token);
    } catch (e) {
      console.log(e)
    } finally {
      this.stopLoading();
    }
  };

  resetPassword = async () => {
    const { email } = this.state;
    this.startLoading();
    try {
      await this.Service.resetPassword(email);
    } catch (e) {
      console.log(e)
    } finally {
      this.stopLoading();
    }
  };

  handleEmailInput = (e: SyntheticEvent<HTMLInputElement>) => this.setState({ email: e.currentTarget.value });

  handlePasswordInput = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ password: e.currentTarget.value });
  };

  handleNewPasswordInput = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ newPassword: e.currentTarget.value });
  };

  handleNameInput = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ name: e.currentTarget.value });
  };

  handleUrlInput = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ url: e.currentTarget.value });
  };

  startLoading = () => this.setState({ isLoading: true });

  stopLoading = () => this.setState({ isLoading: false });

  goToRegisterTab = () => this.setState({ currentState: AUTH_FORM_STATES.SIGN_UP });

  goToSigninTab = () => this.setState({ currentState: AUTH_FORM_STATES.SIGN_IN });

  goToResetTab = () => this.setState({ currentState: AUTH_FORM_STATES.RESET });

  goToRecoveryTab = () => this.setState({ currentState: AUTH_FORM_STATES.RECOVERY });

  render() {
    const { currentState, email, password, name, newPassword, url, isLoading } = this.state;

    return (
      <div className="auth-form">
        <div className="auth-form__header">
          <img className="auth-form__logo" src={logoIcon} alt="" />
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
                  <input
                    className="login-form__input login-form__input--email"
                    placeholder="Электронная почта"
                    value={email}
                    onChange={this.handleEmailInput}
                  />
                  <span className="login-form__message">errormsg</span>
                </div>
                <div className="login-form__input-container">
                  <input
                    className="login-form__input login-form__input--password"
                    placeholder="Пароль"
                    value={password}
                    onChange={this.handlePasswordInput}
                  />
                  <span className="login-form__message">errormsg</span>
                </div>
                <Button
                  text="Войти"
                  modWidth="width-full"
                  modHeight="height-big"
                  modStyle="filled"
                  modColor="color-main"
                  callback={this.login}
                  disabled={isLoading}
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
                  <input
                    className="login-form__input login-form__input--email"
                    placeholder="Электронная почта"
                    value={email}
                    onChange={this.handleEmailInput}
                  />
                  <span className="login-form__message">errormsg</span>
                </div>
                <div className="login-form__input-container">
                  <input
                    className="login-form__input login-form__input--org-name"
                    placeholder="Название организации"
                    value={name}
                    onChange={this.handleNameInput}
                  />
                  <span className="login-form__message">errormsgsdfdsf</span>
                </div>
                <div className="login-form__input-container">
                  <input
                    className="login-form__input login-form__input--site"
                    placeholder="Сайт организации"
                    value={url}
                    onChange={this.handleUrlInput}
                  />
                  <span className="login-form__message">errormsg</span>
                </div>
                <div className="login-form__input-container">
                  <input
                    className="login-form__input login-form__input--password"
                    placeholder="Пароль"
                    value={password}
                    onChange={this.handlePasswordInput}
                  />
                  <span className="login-form__message">errormsg</span>
                </div>
                <Button
                  text="Зарегистрироваться"
                  modWidth="width-full"
                  modHeight="height-big"
                  modStyle="filled"
                  modColor="color-main"
                  callback={this.signUp}
                  disabled={isLoading}
                />
              </form>
            </>,
            [AUTH_FORM_STATES.RESET]: <>
              <p className="auth-form__title">Создание нового пароля</p>
              <form className="login-form">
                <div className="login-form__input-container">
                  <input
                    className="login-form__input login-form__input--password"
                    placeholder="Новый пароль"
                    value={newPassword}
                    onChange={this.handleNewPasswordInput}
                  />
                  <span className="login-form__message">errormsg</span>
                </div>
                <Button
                  text="Сохранить"
                  modWidth="width-full"
                  modHeight="height-big"
                  modStyle="filled"
                  modColor="color-main"
                  callback={this.setNewPassword}
                  disabled={isLoading}
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
                  <input
                    className="login-form__input login-form__input--email"
                    placeholder="Электронная почта"
                    value={email}
                    onChange={this.handleEmailInput}
                  />
                  <span className="login-form__message">errormsg</span>
                </div>
                <Button
                  text="Отправить"
                  modWidth="width-full"
                  modHeight="height-big"
                  modStyle="filled"
                  modColor="color-main"
                  callback={this.resetPassword}
                  disabled={isLoading}
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
