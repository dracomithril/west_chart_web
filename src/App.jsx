import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import ChartPresenter from './components/Chart/ChartPresenter';
import Header from './components/Header';

import Footer from './components/Footer';
import Combiner from './components/PlaylistCombiner';
import LoginAlert from './components/LoginAlert';
import About from './components/About';
import Policy from './components/Policy';
import Demo from './components/Demo';
import NotFound from './components/NotFound';
import { getCredentials } from './utils/spotify_utils';
import { action_types } from './reducers';

const pathways = ['/', '/chart', '/combiner', '/demo'];

const PrivateRoute = ({ component: Component, ...rest }, { store }) => {
  const { user } = store.getState();
  const isAuthenticated = !!user.id;
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

const Navigation = (props, { store }) => {
  const { sp_user } = store.getState();
  return (
    <div>
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Music Helper</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={0} href="/">
              Info
            </NavItem>
            <NavItem eventKey={1} href="/chart">
              Chart
            </NavItem>
            {sp_user.id && (
              <NavItem eventKey={2} href="/combiner">
                Combiner(BETA)
              </NavItem>
            )}
            {window.location.pathname === '/demo' && (
              <NavItem eventKey={2} href="/demo">
                Demo
              </NavItem>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path="/" component={About} />
        <Route path="/policy" exact component={Policy} />
        <Route path="/login" component={LoginAlert} />
        <PrivateRoute path="/chart" exact component={ChartPresenter} />
        {sp_user.id && <PrivateRoute path="/combiner" exact component={Combiner} />}
        <Route path="/demo" component={Demo} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};
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
