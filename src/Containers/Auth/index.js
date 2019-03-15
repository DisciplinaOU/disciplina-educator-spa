// @flow
import React, { memo } from "react";
import AuthForm from "../AuthForm";
import MainMessage from "../../Common/Components/MainMessage";
import type { Educator } from "../../Services/types";

type AuthContainerProps = {
  user: Educator,
  history: any,
  location: any
};

const AuthContainer = (props: AuthContainerProps) => {
  const { history, location, user } = props;

  if (user.id && !user.confirmedAt) {
    return <MainMessage type="CHECK_EMAIL" />;
  }
  if (user.id && !user.confirmedByOrganization) {
    return <MainMessage type="NOT_CONFIRMED" />;
  }
  return <AuthForm history={history} location={location} />;
};

export default memo<AuthContainerProps>(AuthContainer);
