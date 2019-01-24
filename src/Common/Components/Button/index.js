// @flow
import React, { Component } from 'react';
import './styles.scss';

export const ButtonStyleStates = {
  filled: 'filled',
  empty: 'empty',
  simple: 'simple',
  arrowForward: 'arrow-forward',
  arrowBack: 'arrow-back'
}

export const AuthFormStates = {
  signIn: 'signIn',
  signUp: 'signUp',
  reset: 'reset',
  recovery: 'recovery'
}

type ButtonProps = {
  text: string,
  modWidth?: 'width-auto' | 'width-full',
  modHeight?: 'height-small' | 'height-big',
  modStyle?:
    ButtonStyleStates.filled |
    ButtonStyleStates.empty |
    ButtonStyleStates.simple |
    ButtonStyleStates.arrowForward |
    ButtonStyleStates.arrowBack,
  modColor?: 'color-main' | 'color-red',
  callback: () => void
};

export default class Button extends Component<ButtonProps> {
  static defaultProps = {
    modWidth: 'width-auto',
    modHeight: 'height-big',
    modStyle: 'filled',
    modColor: 'color-main'
  };

  render() {
    const { text, modStyle, modHeight, modWidth, modColor, callback } = this.props;
    return (
      <button
        className={`btn btn--${modWidth} btn--${modHeight} btn--${modStyle} btn--${modColor}`}
        type="button"
        onClick={callback}
      >
        {text}
      </button>
    );
  }
}
