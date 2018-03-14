import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem } from 'react-bootstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import ChartPresenter from './components/Chart/ChartPresenter';
import './App.css';
import ErrorConsole from './components/ErrorConsole';
import Header from './components/Header';
import Footer from './components/Footer';
import Combiner from './components/PlaylistCombiner';
import LoginAlert from './components/LoginAlert';
import Policy from './components/Policy';
import NotFound from './components/NotFound';
import { getCredentials } from './utils/spotify_utils';
import { action_types } from './reducers/action_types';

const pathways = ['/', '/chart', '/combiner'];

const PrivateRoute = ({ component: Component, ...rest }, { store }) => {
  const { user, sp_user } = store.getState();
  const isAuthenticated = !!user.id && !!sp_user.id;
  // if (isAuthenticated) {
  //   let result = asyncCall(store, rest.path);
  //   console.info('is autenticated', result);
  // }
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: rest.path },
            }}
          />
        )
      }
    />
  );
};
PrivateRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
};
PrivateRoute.contextTypes = {
  store: PropTypes.object,
};

const About = () => (
  <div>
    <h2>Hi That will be introduction</h2>
    <h3 style={{ color: 'red' }}>Creation in progress</h3>
    <h4 style={{ color: 'gray' }}>Nothing is true everything is permitted</h4>
  </div>
);

const Navigation = (props, { store }) => (
  <div>
    <Nav
      bsStyle="tabs"
      activeKey={(() => pathways.indexOf(window.location.pathname))()}
      onSelect={selectedKey => {
        const { user, sp_user } = store.getState();
        console.info(`selected key: ${selectedKey}`);
        if (user && user.id) {
          sessionStorage.setItem('user', JSON.stringify(user));
        }
        if (sp_user && sp_user.id) {
          sessionStorage.setItem('spotify-user', JSON.stringify(sp_user));
        }
      }}
    >
      <NavItem eventKey={0} href="/">
        Info
      </NavItem>

      <NavItem eventKey={1} href="/chart">
        Chart
      </NavItem>
      <NavItem eventKey={2} href="/combiner">
        Combiner(BETA)
      </NavItem>
    </Nav>
    <Switch>
      <Route exact path="/" component={About} />
      <Route path="/policy" ecact component={Policy} />
      <Route path="/login" component={LoginAlert} />
      {/* <Route path="/login/:cred" component={LoginAlert} /> */}
      <PrivateRoute path="/chart" exact component={ChartPresenter} />
      <PrivateRoute path="/combiner" exact component={Combiner} />
      <Route component={NotFound} />
    </Switch>
  </div>
);
Navigation.contextTypes = {
  store: PropTypes.object,
};

class App extends React.Component {
  componentWillMount() {
    const { store } = this.context;
    getCredentials()
      .then(({ userData, accessToken }) => {
        store.dispatch({
          type: action_types.UPDATE_SP_USER,
          user: userData,
          access_token: accessToken,
        });
        return Promise.resolve(true);
      })
      .catch(() => Promise.resolve(false));
  }
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <ErrorConsole />
        <Navigation />
        <Footer />
      </div>
    );
  }
}

App.contextTypes = {
  store: PropTypes.object,
};
export default App;
