// @flow
import React, { PureComponent } from "react";
import AAAService from "../../Services/aaa";
import logoIcon from "../../Common/Assets/main-logo.svg";
import "./styles.scss";
import Button from "../../Common/Components/Button";
import type { IAAAService } from "../../Services/types";

export const AUTH_FORM_STATES = {
  SIGN_IN: "signIn",
  SIGN_UP: "signUp",
  RESET: "reset",
  RECOVERY: "recovery"
};

const errorsMessagesCollection = {
  email: {
    "filled?": "Specify e-mail",
    "email?": "Incorrect e-mail address",
    "unique?": "A user with this e-mail address already exists",
    "notfound?": "User with this e-mail address was not found"
  },
  password: {
    "filled?": "Specify password",
    "valid?": "Email address and password do not match",
    "min_size?": "Password should be 6 or more characters"
  },
  name: {
    "filled?": "Specify organization name"
  },
  website: {
    "filled?": "Specify organization website"
  }
};

const initialEmptyMessages = {
  emailErrorMessage: "",
  passwordErrorMessage: "",
  nameErrorMessage: "",
  websiteErrorMessage: ""
};

type AuthFormState = {
  currentState: $Values<typeof AUTH_FORM_STATES>,
  isLoading: boolean,
  email: string,
  password: string,
  newPassword: string,
  name: string,
  url: string,
  token: string,
  isError: boolean,
  emailErrorMessage: string,
  passwordErrorMessage: string,
  nameErrorMessage: string,
  websiteErrorMessage: string
};

type AuthFormProps = {
  history: any,
  location: any
};

class AuthForm extends PureComponent<AuthFormProps, AuthFormState> {
  Service: IAAAService = AAAService;

  state: AuthFormState = {
    currentState: AUTH_FORM_STATES.SIGN_IN,
    isError: false,
    isLoading: false,
    email: "",
    password: "",
    newPassword: "",
    name: "",
    url: "",
    token: "",
    ...initialEmptyMessages
  };

  componentDidMount(): void {
    const { location } = this.props;
    let urlParams;
    let token;
    if (location) {
      urlParams = new URLSearchParams(location.search);
      token = urlParams.get("reset_password_token") || "";
    }
    if (token) {
      this.setState({ token });
      this.goToResetTab();
    }
  }

  setError = (errorBody: {}) => this.setState({ isError: true, ...errorBody });

  clearCurrentErrorsMessage = () => {
    this.setState({
      ...initialEmptyMessages
    });
  };

  errorsParser = (loginError: any) => {
    this.clearCurrentErrorsMessage();
    const messagesForState = {};
    const loginErrorKeys = Object.keys(loginError);
    for (let i = 0; i < loginErrorKeys.length; i++) {
      const key = loginErrorKeys[i];
      const errorStatus = loginError[key][0].predicate;
      messagesForState[`${key}ErrorMessage`] = errorsMessagesCollection[key][errorStatus] || "Неизвестная ошибка";
    }

    if (!loginError) {
      messagesForState.emailErrorMessage = errorsMessagesCollection.email["notfound?"];
    }

    return messagesForState;
  };

  clearError = () => this.setState({ isError: false });

  login = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { history } = this.props;
    this.clearError();
    this.startLoading();
    try {
      await this.Service.login(email, password);
      history.push("/faircv");
    } catch (loginError) {
      const errorBody = this.errorsParser(loginError);
      this.setError(errorBody);
      this.stopLoading();
    }
  };

  signUp = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { history } = this.props;
    const { email, password, name, url } = this.state;
    this.clearError();
    this.startLoading();
    try {
      await this.Service.createUser(email, name, url, password);
      history.push("/auth/check_email");
    } catch (signupError) {
      const errorBody = this.errorsParser(signupError);
      this.setError(errorBody);
      this.stopLoading();
    }
  };

  setNewPassword = async () => {
    const { newPassword, token } = this.state;
    this.clearError();
    this.startLoading();
    try {
      await this.Service.createPassword(newPassword, token);
    } catch (setNewPasswordError) {
      console.log(setNewPasswordError);
      const errorBody = this.errorsParser(setNewPasswordError);
      this.setError(errorBody);
    } finally {
      this.stopLoading();
    }
  };

  resetPassword = async () => {
    const { email } = this.state;
    this.clearError();
    this.startLoading();
    try {
      await this.Service.resetPassword(email);
    } catch (resetError) {
      const errorBody = this.errorsParser(resetError);
      this.setError(errorBody);
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

  goToRegisterTab = () =>
    this.setState({
      currentState: AUTH_FORM_STATES.SIGN_UP,
      isError: false
    });

  goToSigninTab = () =>
    this.setState({
      currentState: AUTH_FORM_STATES.SIGN_IN,
      isError: false
    });

  goToResetTab = () =>
    this.setState({
      currentState: AUTH_FORM_STATES.RESET,
      isError: false
    });

  goToRecoveryTab = () =>
    this.setState({
      currentState: AUTH_FORM_STATES.RECOVERY,
      isError: false
    });

  render() {
    const {
      currentState,
      email,
      password,
      name,
      newPassword,
      url,
      isLoading,
      isError,
      emailErrorMessage,
      passwordErrorMessage,
      nameErrorMessage,
      websiteErrorMessage
    } = this.state;

    return (
      <div className="container">
        <div className="auth-form">
          <div className="auth-form__header">
            <img className="auth-form__logo" src={logoIcon} alt="" />
          </div>
          <div className="auth-form__main">
            {
              {
                [AUTH_FORM_STATES.SIGN_IN]: (
                  <>
                    <div className="auth-form__tabs">
                      <button className="tab active" href="1" type="button">
                        Вход с паролем
                      </button>
                      <button className="tab" href="1" onClick={this.goToRegisterTab} type="button">
                        Регистрация
                      </button>
                    </div>
                    <form className="secret__key-auth login-form" onSubmit={this.login}>
                      <div className="login-form__input-container">
                        <input
                          className={`
                            login-form__input
                            login-form__input--email
                            ${email ? "login-form__input--filled" : ""}
                          `}
                          placeholder="E-mail"
                          value={email}
                          onChange={this.handleEmailInput}
                        />
                        {isError ? (
                          <span className="login-form__message valid-message">{emailErrorMessage}</span>
                        ) : null}
                      </div>
                      <div className="login-form__input-container">
                        <input
                          className={`
                            login-form__input
                            login-form__input--password
                            ${password ? "login-form__input--filled" : ""}
                          `}
                          placeholder="Password"
                          value={password}
                          onChange={this.handlePasswordInput}
                          type="password"
                        />
                        {isError ? (
                          <span className="login-form__message valid-message">{passwordErrorMessage}</span>
                        ) : null}
                      </div>
                      <Button
                        type="submit"
                        text="Sign in"
                        modWidth="width-full"
                        modHeight="height-big"
                        modStyle="filled"
                        modColor="color-main"
                        callback={this.login}
                        disabled={isLoading}
                      />
                      <Button
                        text="I forgot"
                        modStyle="simple"
                        modColor="color-main"
                        callback={this.goToRecoveryTab}
                      />
                    </form>
                  </>
                ),
                [AUTH_FORM_STATES.SIGN_UP]: (
                  <>
                    <div className="auth-form__tabs">
                      <button className="tab" href="1" onClick={this.goToSigninTab} type="button">
                        Sign in with password
                      </button>
                      <button className="tab active" href="1" type="button">
                        Sign up
                      </button>
                    </div>
                    <form className="secret__key-auth login-form" onSubmit={this.signUp}>
                      <div className="login-form__input-container">
                        <input
                          className={`
                            login-form__input
                            login-form__input--email
                            ${email ? "login-form__input--filled" : ""}
                          `}
                          placeholder="E-mail"
                          value={email}
                          onChange={this.handleEmailInput}
                        />
                        {isError ? (
                          <span className="login-form__message valid-message">{emailErrorMessage}</span>
                        ) : null}
                      </div>
                      <div className="login-form__input-container">
                        <input
                          className={`
                            login-form__input
                            login-form__input--org-name
                            ${name ? "login-form__input--filled" : ""}
                          `}
                          placeholder="Organization name"
                          value={name}
                          onChange={this.handleNameInput}
                        />
                        {isError ? (
                          <span className="login-form__message valid-message">{nameErrorMessage}</span>
                        ) : null}
                      </div>
                      <div className="login-form__input-container">
                        <input
                          className={`
                            login-form__input
                            login-form__input--site
                            ${url ? "login-form__input--filled" : ""}
                          `}
                          placeholder="Organization website"
                          value={url}
                          onChange={this.handleUrlInput}
                        />
                        {isError ? (
                          <span className="login-form__message valid-message">{websiteErrorMessage}</span>
                        ) : null}
                      </div>
                      <div className="login-form__input-container">
                        <input
                          className={`
                            login-form__input
                            login-form__input--password
                            ${password ? "login-form__input--filled" : ""}
                          `}
                          placeholder="Password"
                          value={password}
                          onChange={this.handlePasswordInput}
                          type="password"
                        />
                        {isError ? (
                          <span className="login-form__message valid-message">{passwordErrorMessage}</span>
                        ) : null}
                      </div>
                      <Button
                        type="submit"
                        text="Sign up"
                        modWidth="width-full"
                        modHeight="height-big"
                        modStyle="filled"
                        modColor="color-main"
                        callback={this.signUp}
                        disabled={isLoading}
                      />
                    </form>
                  </>
                ),
                [AUTH_FORM_STATES.RESET]: (
                  <>
                    <p className="auth-form__title">Create a new password</p>
                    <form className="login-form">
                      <div className="login-form__input-container">
                        <input
                          className={`
                            login-form__input
                            login-form__input--password
                            ${newPassword ? "login-form__input--filled" : ""}
                          `}
                          placeholder="New password"
                          value={newPassword}
                          onChange={this.handleNewPasswordInput}
                        />
                        {isError ? (
                          <span className="login-form__message valid-message">{passwordErrorMessage}</span>
                        ) : null}
                      </div>
                      <Button
                        text="Save"
                        modWidth="width-full"
                        modHeight="height-big"
                        modStyle="filled"
                        modColor="color-main"
                        callback={this.setNewPassword}
                        disabled={isLoading}
                      />
                    </form>
                  </>
                ),
                [AUTH_FORM_STATES.RECOVERY]: (
                  <>
                    <Button
                      callback={this.goToSigninTab}
                      text="Return"
                      modStyle="arrow-back"
                      modColor="color-main"
                    />
                    <p className="auth-form__title">Remember password</p>
                    <form className="login-form">
                      <div className="login-form__input-container">
                        <input
                          className={`
                            login-form__input
                            login-form__input--email
                            ${email ? "login-form__input--filled" : ""}
                          `}
                          placeholder="E-mail"
                          value={email}
                          onChange={this.handleEmailInput}
                        />
                        {isError ? (
                          <span className="login-form__message valid-message">{emailErrorMessage}</span>
                        ) : null}
                      </div>
                      <Button
                        text="Send"
                        modWidth="width-full"
                        modHeight="height-big"
                        modStyle="filled"
                        modColor="color-main"
                        callback={this.resetPassword}
                        disabled={isLoading}
                      />
                    </form>
                  </>
                )
              }[currentState]
            }
          </div>
        </div>
      </div>
    );
  }
}

export default AuthForm;
