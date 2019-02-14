import React, { Component, PureComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./Containers/Header";
import "./App.scss";
import AuthContainer from "./Containers/Auth";
import FaircvList from "./Containers/FaircvList";
import AAAService from "./Services/aaa";
import AddFairCV from "./Containers/AddFairCV";

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
        const userResponse = await AAAService.getCurrentUser();
        this.setState({
          isLoading: false,
          isAuthenticated: true,
          user: userResponse.data
        });
      } catch (e) {
        this.setState({ isLoading: false, isAuthenticated: false });
      }
    }

    render() {
      const { isAuthenticated, isLoading, user } = this.state;
      if (isLoading) return <h5>Loading...</h5>;
      if ((!isAuthenticated || !user.confirmedAt) && isGuardEnabled) {
        return <Redirect to="/auth" />;
      }
      return (
        <>
          {/* TODO while no redux accept header inside HoC */}
          <Header user={user} />
          <WrappedComponent {...this.props} user={user} />
        </>
      );
    }
  };
};

const Faircv = () => (
  <Switch>
    <Route exact path="/faircv" render={() => <h2>Welcome fair list...</h2>} />
    <Route exact path="/faircv/create" component={AddFairCV} />
    <Route exact path="/faircv/list" component={FaircvList} />
  </Switch>
);

const App = () => {
  return (
    <div className="App">
      <main className="main">
        <Switch>
          <Route path="/auth" component={withUserContext(AuthContainer, false)} />
          <Route path="/faircv" component={withUserContext(Faircv, true)} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
