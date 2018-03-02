/**
 * Created by xktr67 on 6/21/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';

const PlaylistInfo = ({ info = {} }) =>
  info.url !== null ? (
    <div className="spotify_sumary">
      <span>
        {'Created '}
        <i className="fab fa-spotify" aria-hidden="true">
          Spotify
        </i>
        {' playlist! name: '}
      </span>
      <a href={info.url} target="_newtab">
        {info.pl_name}
      </a>
      <br />
      <a href={info.url} target="_newtab">
        {info.url}
      </a>
    </div>
  ) : (
    ''
  );
PlaylistInfo.propTypes = {
  info: PropTypes.object,
};

export default PlaylistInfo;
