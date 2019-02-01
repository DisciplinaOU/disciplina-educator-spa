import React, { Component, PureComponent } from 'react';
import AuthForm from './Containers/AuthForm';
import AddFairCV from './Containers/AddFairCV';
import Header from './Containers/Header';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import AuthContainer from './Containers/Auth';
import FaircvList from './Containers/FaircvList';
import AAAService from './Services/aaa';

const UserContext = React.createContext({ id: 0, isConfirmed: false });

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
        this.setState({ isLoading: false, isAuthenticated: true, user: userResponse.data });
      } catch (e) {
        this.setState({ isLoading: false, isAuthenticated: false });
      }
    }

    render() {
      const { isAuthenticated, isLoading, user } = this.state;
      if (isLoading) return <h5>Loading...</h5>;
      if ((!isAuthenticated || !user.confirmedAt || !user.confirmedByOrganization) && isGuardEnabled) {
        return <Redirect to="/auth" />;
      }
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
    <Route exact path="/faircv/list" render={() => <FaircvList />} />
  </Switch>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <UserContext.Consumer>
          {user => <Header user={ user } />}
        </UserContext.Consumer>
        <main className="main">
          <Switch>
            <Route path="/auth" component={withUserContext(AuthContainer, false)} />
            <Route path="/faircv" component={withUserContext(Faircv, false)} />
          </Switch>
          <Link to="/auth">auth</Link>
          <Link to="/faircv">faircv list</Link>
          <Link to="/faircv/create">create faircv</Link>
        </main>
      </div>
    );
  }
}

export default App;
