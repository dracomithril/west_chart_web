// @flow
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

const PlaylistInfo = ({ url = '', name = '' }: {url?: string, name?: string}) => (
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

export default PlaylistInfo;
