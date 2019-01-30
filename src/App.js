import React, { PureComponent, Component } from 'react';
import Header from './Containers/Header';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import AuthContainer from './Containers/Auth';
import AAAService from './Services/aaa';

const UserContext = React.createContext({ id: 0, isConfirmed: false });

const withUserContext = (WrappedComponent: Component) => {
  return class UserContextContainer extends PureComponent {
    state = {
      isLoading: true,
      isAuthenticated: false,
      user: {}
    };
    
    async componentDidMount(): void {
      try {
        const user = await AAAService.getCurrentUser();
        this.setState({ isLoading: false, user });
      } catch (e) {
        this.setState({ isLoading: false });
      }
    }
    
    render() {
      const { isLoading, user } = this.state;
      if (isLoading) return <h5>Loading...</h5>;
      return <UserContext.Provider value={user}>
        <WrappedComponent {...this.props} user={user} />
      </UserContext.Provider>;
    }
  }
};

const withUserGuard = (WrappedComponent: Component) => {
  return class PrivateContainer extends PureComponent {
    state = {
      isLoading: true,
      isAuthenticated: false,
      user: {}
    };

    async componentDidMount() {
      try {
        const user = await AAAService.getCurrentUser();
        this.setState({ isLoading: false, isAuthenticated: true, user });
      } catch (e) {
        this.setState({ isLoading: false, isAuthenticated: true });
      }
    }

    render() {
      const { isAuthenticated, isLoading, user } = this.state;
      if (isLoading) return <h5>Loading...</h5>;
      if (!isAuthenticated) return <Redirect to="/auth" />;
      return <UserContext.Provider value={user}>
        <WrappedComponent {...this.props} user={user} />
      </UserContext.Provider>;
    }
  }
};

const Faircv = () => (
  <Switch>
    <Route exact path="/faircv" render={() => <h2>Welcome fair list...</h2>} />
    <Route exact path="/faircv/create" render={() => <h2>Welcome fair create...</h2>} />
  </Switch>
);

class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <UserContext.Consumer>
          {user => <Header user={ user } />}
        </UserContext.Consumer>
        <Link to="/auth">auth</Link>
        <Link to="/faircv">faircv list</Link>
        <Link to="/faircv/create">create faircv</Link>
        <main className="main">
          <div className="container">
            <Switch>
              <Route path="/auth" component={withUserContext(AuthContainer)} />
              <Route path="/faircv" component={withUserGuard(Faircv)} />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
