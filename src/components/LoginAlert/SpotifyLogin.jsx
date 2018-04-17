import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/fontawesome-free-brands/index';
import { loginToSpotifyAlpha } from '../../utils/spotify_utils';

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
    <FontAwesomeIcon icon={faSpotify} style={{ paddingTop: 5 }} />
    <span>Login to spotify</span>
  </Button>
);
SpotifyLogin.propTypes = {
  from: PropTypes.string,
};

export default SpotifyLogin;
