// @flow
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import './playlist.css';
import TrackPreview from './TrackPreview';
import { RowSearchButtonGroup } from './RowSearchButtonGroup';
import type { SpotifyTrack } from '../../types/spotify';

type Props = {
  artist: string,
  id: string,
  items?: SpotifyTrack[],
  full_title: string,
  selected: SpotifyTrack,
  title: string,
  onClearClick: () => mixed,
  onSearchClick: () => mixed,
  onSwap: () => mixed,
  onUpdateClick: ({ id: string, value: SpotifyTrack, field: string }) => mixed,
};

type State = {
  showList: boolean,
}


class RowSpotifySearch extends React.Component<Props, State> {
  state ={
    showList: false,
  };

  static defaultProps = {
    items: [],
  };

  render() {
    const {
      id,
      artist,
      title,
      full_title,
      selected: selected_track,
      items,
      onSwap,
      onUpdateClick,
      onSearchClick,
      onClearClick,
    } = this.props;
    const { showList } = this.state;
    const tracks_list = items && items.map(track => (
      <MenuItem
        key={track.id}
        id={`mi_select_track_${id}`}
        onClick={() => {
          onUpdateClick({ id, value: track, field: 'selected' });
          this.setState({ showList: false });
        }}
        style={{ backgroundColor: 'snow', height: 'unset' }}
      >
        <TrackPreview {...track} noLink />
      </MenuItem>
    ));

    const condition = selected_track && selected_track.preview_url !== undefined;
    const haveIssue = !artist || !title;

    const selectTrackClass = selected_track ? 'row-spotify-search__root--good' : 'row-spotify-search__root--error';
    const trackSearchClass = haveIssue
      ? 'row-spotify-search__track-search--error'
      : 'row-spotify-search__track-search--good';
    return (
      <div className={selectTrackClass}>
        <span>
          {full_title || 'No Title'}
        </span>
        <div>
          <div>
            <div className={trackSearchClass}>
              <label htmlFor={`${id}_artist`}>
                artist:
                <input
                  type="text"
                  id={`${id}_artist`}
                  value={artist || ''}
                  placeholder="artist name"
                  onChange={({ target }) => {
                    onUpdateClick({ id, value: target.value, field: 'artist' });
                  }}
                />
              </label>
              <label htmlFor={`${id}_title`}>
                title:
                <input
                  type="text"
                  id={`${id}_title`}
                  value={title || ''}
                  placeholder="song title"
                  onChange={({ currentTarget }) => onUpdateClick
                    && onUpdateClick({
                      id,
                      value: currentTarget.value,
                      field: 'title',
                    })}
                />
              </label>
              <RowSearchButtonGroup
                onSwap={onSwap}
                id={id}
                onSearchClick={onSearchClick}
                onClearClick={onClearClick}
                onShowList={() => {
                  this.setState({ showList: !showList });
                }}
                dropDown={tracks_list && tracks_list.length !== 0}
                showList={showList}
              />
            </div>
            {showList && (
            <ol>
              {tracks_list}
            </ol>
            )}
          </div>
          {condition && (
            <div className="row-spotify-search__track_view">
              <TrackPreview {...selected_track} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default RowSpotifySearch;
