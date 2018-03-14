/**
 * Created by Gryzli on 28.01.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button, Jumbotron } from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';
import './../bootstrap-social.css';
import './LoginAlert.css';
import { loginToSpotifyAlpha } from '../../utils/spotify_utils';
import config from './../../config';
import { action_types } from './../../reducers/action_types';

const SpotifyLogin = ({ from }) => (
  <Button
    className="btn btn-social btn-spotify"
    onClick={() => {
      loginToSpotifyAlpha(from)
        .then(url => {
          window.location = url;
        })
        .catch(err => {
          console.error(err.message);
        });
    }}
  >
    <i className="fab fa-spotify" />Login to spotify
  </Button>
);
SpotifyLogin.propTypes = {
  from: PropTypes.string,
};

const LoginAlert = (props, { store }) => {
  const { location } = props;
  const { user, sp_user } = store.getState();
  const { from } = (location || {}).state || { from: '/' };
  if (user.id && sp_user.id) {
    return <Redirect to={from} />;
  }
  return (
    <Jumbotron bsClass="login-info">
      <h4>
        {'To start working witch us you need to login to facebook and spotify.'}
        <i className="fas fa-heart" />
      </h4>
      {user.id === undefined && (
        <FacebookLogin
          appId={config.api.fb.apiId}
          language="pl_PL"
          autoLoad
          scope="public_profile,email,user_managed_groups"
          callback={response => {
            store.dispatch({ type: action_types.UPDATE_USER, response });
          }}
          fields={'id,email,name,first_name,picture,groups{administrator}'}
          cssClass="btn btn-social btn-facebook"
          icon="fab fa-facebook"
        />
      )}
      {sp_user.id === undefined && <SpotifyLogin from={from} />}
    </Jumbotron>
  );
};

LoginAlert.contextTypes = {
  store: PropTypes.object,
};
LoginAlert.propTypes = {
  location: PropTypes.object,
};
export default LoginAlert;
