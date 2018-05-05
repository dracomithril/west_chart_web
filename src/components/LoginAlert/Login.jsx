/**
 * Created by Gryzli on 28.01.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import Button from 'material-ui/Button';
import { faFacebookF, faSpotify } from '@fortawesome/fontawesome-free-brands/index';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { loginToSpotifyAlpha } from '../../utils/spotify_utils';
import './LoginAlert.css';
import { getFbPictureUrl } from '../../utils/utils';
import { api } from './../../config';
import { actionTypes } from './../../reducers/actionTypes';

const Login = ({ location }, { store }) => {
  const { user, spotifyUser } = store.getState();
  const { from } = (location || {}).state || { from: '/' };
  if (user.id && spotifyUser.id) {
    return <Redirect to={from} />;
  }
  return (
    <div className="login-info">
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
          scope="public_profile,email,user_managed_groups,groups_access_member_info,publish_to_groups"
          buttonStyle={{ width: '100%', height: 48 }}
          icon={<FontAwesomeIcon icon={faFacebookF} style={{ paddingRight: 5 }} />}
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
              console.error('login error.', response.error);
            }
          }}
          fields="id,email,name,first_name,last_name"
        />
      )}
      {spotifyUser.id === undefined && (
        <Button
          variant="raised"
          style={{ backgroundColor: 'green', height: 48, width: '100%', color: 'white' }}
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
          <FontAwesomeIcon icon={faSpotify} style={{ paddingRight: 5 }} />
          Login to spotify
        </Button>
      )}
    </div>
  );
};

Login.contextTypes = {
  store: PropTypes.object,
};
Login.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      from: PropTypes.string,
    }),
  }),
};
export default Login;