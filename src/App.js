import React, { Component } from 'react';
import AuthForm from './Containers/AuthForm';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.scss';

const AuthGuard = {
  checkAuth: async () => Promise.resolve(() => true)
};

const withAuth = (WrappedComponent: Component) => {
  return class PrivateContainer extends Component {
    state = {
      isLoading: true,
      isAuthenticated: false
    };

    async componentDidMount() {
      try {
        await AuthGuard.checkAuth();
        this.setState({ isLoading: false, isAuthenticated: true });
      } catch (e) {
        this.setState({ isLoading: false, isAuthenticated: false });
      }
    }

    render() {
      const { isAuthenticated, isLoading } = this.state;
      if (isLoading) return <h5>Loading...</h5>;
      if (!isAuthenticated) return <Redirect to="/auth" />;
      return <WrappedComponent {...this.props} />;
    }
  }
};

const Auth = () => <h2>Welcome Auth...</h2>;
const Faircv = () => (
  <Switch>
    <Route exact path="/faircv" render={() => <h2>Welcome fair list...</h2>} />
    <Route exact path="/faircv/create" render={() => <h2>Welcome fair create...</h2>} />
  </Switch>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/faircv" component={withAuth(Faircv)} />
        </Switch>
        <Link to="/auth">auth</Link>
        <Link to="/faircv">faircv list</Link>
        <Link to="/faircv/create">create faircv</Link>
        <main className="App-main">
          <AuthForm currentState="recovery"/>
        </main>
      </div>
    );
  }
}

export default App;
