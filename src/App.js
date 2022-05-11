import React, { Component, PureComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Header from "./Containers/Header";
import "./App.scss";
import FaircvList from "./Containers/FaircvList";
import AAAService from "./Services/aaa";
import AddFairCV from "./Containers/AddFairCV";
import { useConnect } from "./libs/web3/hooks";
import { ConnectMetamask } from "./Containers/ConnectMetamask";
import { PageLoader } from "./Common/Components/PageLoader";
import { AuthContext } from "./Contexts/Auth";
import { Web3 } from "./libs/web3";
import { ComingSoon } from "./Containers/ComingSoon";

const withUserContext = (WrappedComponent: Component, isGuardEnabled: boolean) => {
  type PrivateContainerProps = {
    history: { push: (url: string) => void },
    location: { pathname: string },
    metaMask: {
      connected: Boolean,
      connect: () => void
    }
  };

  return class PrivateContainer extends PureComponent<PrivateContainerProps> {
    state = {
      isLoading: true,
      isAuthenticated: false,
      user: null
    };

    unsubscribeWeb3ConnectionChange = Web3.onConnectionChange(status => {
      if (status === false) this.handleLogout();
    });

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

    componentWillUnmount() {
      this.unsubscribeWeb3ConnectionChange();
    }

    handleLogin = (user: Educator, accessToken: string) => {
      localStorage.setItem("accessToken", accessToken);
      this.setState({
        isLoading: false,
        isAuthenticated: true,
        user
      });
      const { history } = this.props;

      history.push("/faircv");
    };

    handleLogout = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("metamask-connected");

      this.setState({
        isLoading: false,
        isAuthenticated: false,
        user: null
      });
      const { history } = this.props;

      Web3.disconnect();

      history.push("/auth");
    };

    render() {
      // TODO while no redux accept header inside HoC
      const { isAuthenticated, isLoading, user } = this.state;
      if (isLoading) {
        return <PageLoader loading />;
      }
      if (!isAuthenticated && isGuardEnabled) {
        return <Redirect to="/auth" />;
      }
      return (
        <AuthContext.Provider
          value={{
            user,
            login: this.handleLogin,
            logout: this.handleLogout
          }}
        >
          <Header />
          <WrappedComponent {...this.props} onLogin={(newUser, token) => this.handleLogin(newUser, token)} />
        </AuthContext.Provider>
      );
    }
  };
};

const Faircv = () => {
  const { connected } = useConnect();

  return (
    <>
      {connected ? (
        <Switch>
          <Redirect exact from="/faircv" to="/faircv/list" />
          <Route exact path="/faircv/create" component={AddFairCV} />
          <Route exact path="/faircv/list" component={FaircvList} />
        </Switch>
      ) : (
        <ConnectMetamask />
      )}
    </>
  );
};

const App = () => {
  return (
    <div className="App">
      <main className="main">
        <Switch>
          {process.env.REACT_APP_STATUS === "COMING_SOON" ? (
            <Route path="*" component={withUserContext(ComingSoon)} />
          ) : (
            <>
              <Redirect exact from="/" to="/faircv" />
              <Route path="/auth" component={withUserContext(ConnectMetamask, false)} />
              <Route path="/faircv" component={withUserContext(Faircv, true)} />
            </>
          )}
        </Switch>
      </main>
    </div>
  );
};

export default App;
