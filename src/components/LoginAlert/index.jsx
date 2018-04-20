/**
 * Created by Gryzli on 28.01.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Jumbotron } from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';
import SpotifyLogin from './SpotifyLogin';
import './../bootstrap-social.css';
import './LoginAlert.css';
import { getFbPictureUrl } from '../../utils/utils';
import { api } from './../../config';
import { actionTypes } from './../../reducers/actionTypes';

const LoginAlert = ({ location }, { store }) => {
  const { user, spotifyUser } = store.getState();
  const { from } = (location || {}).state || { from: '/' };
  if (user.id && spotifyUser.id) {
    return <Redirect to={from} />;
  }
  return (
    <Jumbotron bsClass="login-info">
      <h4>
        <span role="img" aria-label="heart">
          ❤️❤️❤️
        </span>️ To start working witch us you need to login to facebook and spotify.
        <span role="img" aria-label="heart">
          ❤️❤️❤️
        </span>️
      </h4>
      {user.id === undefined && (
        <FacebookLogin
          appId={api.fb.apiId}
          language="pl_PL"
          autoLoad
          scope="public_profile,email,user_managed_groups"
          callback={response => {
            if (!response.error) {
              store.dispatch({
                type: actionTypes.UPDATE_USER,
                value: {
                  ...response,
                  picture_url: getFbPictureUrl(response.id),
                },
              });
            } else {
              console.error('login error.');
              console.error(response.error);
            }
          }}
          fields="id,email,name,first_name,last_name"
          cssClass="btn btn-social btn-facebook"
          icon="fab fa-facebook"
        />
      )}
      {spotifyUser.id === undefined && <SpotifyLogin from={from} />}
    </Jumbotron>
  );
};

LoginAlert.contextTypes = {
  store: PropTypes.object,
};
LoginAlert.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      from: PropTypes.string,
    }),
  }),
};
export default LoginAlert;
