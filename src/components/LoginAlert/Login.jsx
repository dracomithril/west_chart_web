// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Button from '@material-ui/core/Button';
import { faFacebookF, faSpotify } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loginToSpotifyAlpha } from '../../utils/spotify_utils';
import './LoginAlert.css';
import { getFbPictureUrl } from '../../utils/utils';
import { api } from '../../config';
import actionTypes from '../../reducers/actionTypes';

// todo User objects spotify and facebook
type Props = {
  facebookUser: {
    id: string
  },
  spotifyUser: {
    id: string
  },
  updateFacebookUser({}): mixed,
  location: {
    state: {
      from: string,
    },
  },
};

export const Login = ({
  location, facebookUser, spotifyUser, updateFacebookUser,
}: Props) => {
  const { from } = (location || {}).state || { from: '/' };
  if (facebookUser.id && spotifyUser.id) {
    return <Redirect to={from} />;
  }
  return (
    <div className="login-info">
      <h4>
        <span role="img" aria-label="heart">
          ❤️❤️❤️
        </span>
        ️ To start working witch us you need to login to facebook and spotify.
        <span role="img" aria-label="heart">
          ❤️❤️❤️
        </span>
        ️
      </h4>
      {facebookUser.id === undefined && (
        <FacebookLogin
          appId={api.fb.apiId}
          language="pl_PL"
          autoLoad
          fields="id,email,name,first_name,last_name"
          scope={api.fb.scope}
          render={renderProps => (
            <Button
              onClick={renderProps.onClick}
              variant="contained"
              color="primary"
              style={{ height: 48, width: '100%', color: 'white' }}
            >
              <FontAwesomeIcon icon={faFacebookF} style={{ paddingRight: 5 }} />
              Login to facebook
            </Button>
          )}
          callback={(response) => {
            if (!response.error) {
              updateFacebookUser(response);
              window.location = from;
            } else {
              console.error('login error.', response.error);
            }
          }}
        />
      )}
      {spotifyUser.id === undefined && (
        <Button
          variant="contained"
          style={{
            backgroundColor: 'green',
            height: 48,
            width: '100%',
            color: 'white',
          }}
          onClick={() => {
            loginToSpotifyAlpha(from)
              .then((url) => {
                window.location = url;
              })
              .catch((err) => {
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

const mapStateToProps = ({ facebookUser, spotifyUser }) => ({
  facebookUser,
  spotifyUser,
});

const mapDispatchToProps = dispatch => ({
  updateFacebookUser: (userData) => {
    dispatch({
      type: actionTypes.UPDATE_USER,
      value: {
        ...userData,
        picture_url: getFbPictureUrl(userData.id),
      },
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
