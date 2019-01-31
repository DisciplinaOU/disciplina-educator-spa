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
  
    if (!user.confirmedAt) {
      return <MainMessage type="CHECK_EMAIL" />;
    } else if (!user.confirmedByOrganization) {
      return <MainMessage type="NOT_CONFIRMED"/>;
    } else {
      return <AuthForm history={history} location={location} />;
    }
  }
}
