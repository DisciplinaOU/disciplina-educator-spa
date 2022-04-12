import React, { Component, PureComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { DAppProvider } from "@usedapp/core";

import Header from "./Containers/Header";
import "./App.scss";
// import AuthContainer from "./Containers/Auth";
import FaircvList from "./Containers/FaircvList";
import AAAService from "./Services/aaa";
import AddFairCV from "./Containers/AddFairCV";
import { ConnectMetamask } from "./Containers/ConnectMetamask";

const withUserContext = (WrappedComponent: Component, isGuardEnabled: boolean) => {
  type PrivateContainerProps = {
    history: { push: (url: string) => void },
    location: { pathname: string }
  };

  return class PrivateContainer extends PureComponent<PrivateContainerProps> {
    state = {
      isLoading: true,
      isAuthenticated: false,
      user: {}
    };

    async componentDidMount() {
      try {
        const user = await AAAService.getCurrentUser();
        this.setState({
          isLoading: false,
          isAuthenticated: true,
          user
        });
      } catch (e) {
        this.setState({ isLoading: false, isAuthenticated: false });
      }
    }

    handleLogin(user: Educator, accessToken: string) {
      localStorage.setItem("accessToken", accessToken);
      this.setState({
        isLoading: false,
        isAuthenticated: true,
        user
      });
      const { history } = this.props;
      history.push("/faircv");
    }

    render() {
      // TODO while no redux accept header inside HoC
      const { isAuthenticated, isLoading, user } = this.state;
      if (isLoading) {
        return <h5>Loading...</h5>;
      }
      if (!isAuthenticated && isGuardEnabled) {
        return <Redirect to="/auth" />;
      }
      return (
        <>
          <Header user={user} />
          {/* {metamaskConnected ? ( */}
          <WrappedComponent {...this.props} onLogin={(newUser, token) => this.handleLogin(newUser, token)} />
          {/* ) : ( */}
          {/* <ConnectMetamask onChange={connected => this.setState({ metamaskConnected: connected })} /> */}
          {/* )} */}
        </>
      );
    }
  };
};

const Faircv = () => (
  <Switch>
    <Redirect exact from="/faircv" to="/faircv/list" />
    <Route exact path="/faircv/create" component={AddFairCV} />
    <Route exact path="/faircv/list" component={FaircvList} />
  </Switch>
);

const App = () => {
  return (
    <div className="App">
      <main className="main">
        <DAppProvider>
          <Switch>
            <Redirect exact from="/" to="/faircv" />
            <Route path="/auth" component={withUserContext(ConnectMetamask, false)} />
            <Route path="/faircv" component={withUserContext(Faircv, true)} />
          </Switch>
        </DAppProvider>
      </main>
    </div>
  );
};

export default App;
