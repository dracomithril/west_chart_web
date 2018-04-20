/**
 * Created by Gryzli on 25.01.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import CookieBanner from 'react-cookie-banner';
import UserInfo from './UserInfo';
import './Header.css';
import { actionTypes } from './../../reducers/actionTypes';

export default class Header extends React.Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onLogoutClick = () => {
    const { store } = this.context;
    store.dispatch({ type: actionTypes.SIGN_OUT_USER });
    window.location = '/';
  };

  render() {
    const { store } = this.context;
    const { user, spotifyUser } = store.getState();
    return (
      <div className="wcs_header">
        <CookieBanner
          message={"Yes, we use cookies. If you don't like it change website, we won't miss you! ;)"}
          cookie="user-has-accepted-cookies"
        />
        <UserInfo fb_user={user} spotifyUser={spotifyUser} onLogoutClick={this.onLogoutClick} />
      </div>
    );
  }
}
Header.contextTypes = {
  store: PropTypes.object,
};
Header.propTypes = {};
