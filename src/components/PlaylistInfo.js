/**
 * Created by xktr67 on 6/21/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/fontawesome-free-brands';

const PlaylistInfo = ({ url, playlistName }) =>
  url !== null ? (
    <div className="spotify_sumary">
      <span>
        {'Created '}
        <FontAwesomeIcon icon={faSpotify}>Spotify</FontAwesomeIcon>
        {' playlist! name: '}
      </span>
      <a href={url} target="_newtab">
        {playlistName}
      </a>
      <br />
      <a href={url} target="_newtab">
        {url}
      </a>
    </div>
  ) : (
    ''
  );
PlaylistInfo.propTypes = {
  url: PropTypes.string,
  playlistName: PropTypes.string,
};

export default PlaylistInfo;
