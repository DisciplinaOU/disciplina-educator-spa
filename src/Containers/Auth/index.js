// @flow
import React, { PureComponent } from 'react';
import AuthForm from '../AuthForm';
import MainMessage from '../../Common/Components/MainMessage';
import type { Educator } from '../../Services/types';

type AuthContainerProps = {
  user: Educator,
  history: any,
  location: any
}

export default class AuthContainer extends PureComponent<AuthContainerProps, {}> {
  render() {
    const { history, location, user } = this.props;
    return (
      <>
        {!user.isConfirmed ? <MainMessage type="CHECK_EMAIL" /> : null}
        {!user.isOrganizationConfirmed ? <MainMessage type="NOT_CONFIRMED" /> : null}
        <MainMessage type="NOT_CONFIRMED" />
        <AuthForm history={history} location={location} />
      </>
    )
  }
}
