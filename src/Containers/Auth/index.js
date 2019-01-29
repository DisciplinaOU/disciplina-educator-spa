// @flow
import React, { PureComponent } from 'react';
import AuthForm from '../AuthForm';
import MainMessage from '../../Common/Components/MainMessage';
import type { Educator } from '../../Services/types';
import { Redirect } from 'react-router-dom';

type AuthContainerProps = {
  user: Educator
}

export default class AuthContainer extends PureComponent<AuthContainerProps,{}> {
  componentDidMount(): void {
  
  }
  
  render() {
    const { user } = this.props;
    return (
      <>
        <MainMessage type="NOT_CONFIRMED" />
        <AuthForm />
      </>
    )
  }
}
