// @flow
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import type { SpotifyTrack } from '../../types/spotify';


type Props = {
  noLink?: boolean,
  ...SpotifyTrack,
  preview_url: string,
};

const TrackPreview = ({
  artists, preview_url, external_urls, name, noLink,
}: Props) => {
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
        {name}
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

export default TrackPreview;
