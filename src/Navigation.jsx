import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import Policy from './components/Policy';
import About from './components/About';
import Combiner from './components/PlaylistCombiner';
import NotFound from './components/NotFound';
import ChartPresenter from './components/Chart/ChartPresenter';
import LoginAlert from './components/LoginAlert';
import Demo from './components/Demo';
import PrivateRoute from './PrivateRoute';
import { getCredentials } from './utils/spotify_utils';
import { action_types } from './reducers/action_types';

class Navigation extends React.Component {
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
    const { store } = this.context;
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
  }
}

Navigation.contextTypes = {
  store: PropTypes.object,
};

export default Navigation;
