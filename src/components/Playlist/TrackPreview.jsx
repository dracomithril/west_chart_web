import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

const TrackPreview = ({
  artists, preview_url, external_urls, trackName, noLink,
}) => {
  const artistsList = (artists || []).map(elem => elem.name).join(' & ');
  const audio = preview_url !== null ? (
    <audio controls preload="none">
      <source src={preview_url} type="audio/mpeg" />
        Your browser does not support the audio element.
    </audio>
  ) : (
    <span style={{ color: 'red' }}>
        No preview
      {!noLink && (
      <a href={(external_urls || {}).spotify} target="_newtab">
        {' go to '}
        <FontAwesomeIcon icon={faSpotify} aria-hidden="true" />
      </a>
      )}
    </span>
  );
  return (
    <div className="track-preview">
      <strong>
        {trackName}
      </strong>
      <br />
      {audio}
      <div>
        <span>
by:
        </span>
        <span className="track-preview__artist-name">
          {artistsList}
        </span>
      </div>
    </div>
  );
};
TrackPreview.propTypes = {
  noLink: PropTypes.bool,
  artists: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
  preview_url: PropTypes.string,
  external_urls: PropTypes.shape({
    spotify: PropTypes.string,
  }),
  trackName: PropTypes.string,
};

export default TrackPreview;
