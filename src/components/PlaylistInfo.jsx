import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

const PlaylistInfo = ({ url, name }) => (
  <div className="spotify_sumary">
    <span>
      {'Created '}
      <FontAwesomeIcon icon={faSpotify}>
Spotify
      </FontAwesomeIcon>
      {' playlist! name: '}
    </span>
    <a href={url} target="_newtab">
      {name}
    </a>
    <br />
    <a href={url} target="_newtab">
      {url}
    </a>
  </div>
);

PlaylistInfo.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
};

export default PlaylistInfo;
