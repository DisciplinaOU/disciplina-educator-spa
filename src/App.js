import React, { Component } from 'react';
import AuthForm from './Containers/AuthForm';
import Header from './Containers/Header';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import MainMessage from './Common/Components/MainMessage'
import Button from './Common/Components/Button';
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

const user = {
  isConfirmed: true
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header user={ user } />
        <main className="App-main">
          <MainMessage type="list_empty"/>
          <div className="container">
            <Switch>
              <Route path="/auth" component={Auth} />
              <Route path="/faircv" component={withAuth(Faircv)} />
            </Switch>
            <Link to="/auth">auth</Link>
            <Link to="/faircv">faircv list</Link>
            <Link to="/faircv/create">create faircv</Link>
          </div>
          <div className="container">
            <div className="main__title">
              <h2 className="main__title-text">Созданные FairCV</h2>
              <Button
                text="Добавить FairCV"
                modWidth="width-auto"
                modHeight="height-big"
                modStyle="filled"
                modColor="color-main"
              />
            </div>
          </div>
          <div className="container">
            <AuthForm />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
