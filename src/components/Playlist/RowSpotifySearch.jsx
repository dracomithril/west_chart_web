/**
 * Created by XKTR67 on 5/11/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faSearch, faSync, faTimes } from '@fortawesome/free-solid-svg-icons';
import './playlist.css';
import TrackPreview from './TrackPreview';
import { trackObjectProps } from '../typeDefinitions';

const RowSearchButtonGroup = ({ onSwap, onSearchClick, onClearClick, onShowList, id, showList, dropDown }) => (
  <div className="row-spotify-search__button-group">
    <button type="button" onClick={() => onSwap && onSwap(id)} title="swap artist with title">
      <FontAwesomeIcon icon={faSync} />
    </button>
    <button
      type="button"
      id={`button-${id}`}
      onClick={() => onSearchClick && onSearchClick()}
      title="search for tracks"
    >
      <FontAwesomeIcon icon={faSearch} />
    </button>
    <button type="button" title="clear selected" onClick={() => onClearClick && onClearClick({ id })}>
      <FontAwesomeIcon icon={faTimes} />
    </button>
    {dropDown && (
      <button type="button" onClick={onShowList} title="show/hide found tracks">
        <FontAwesomeIcon icon={showList ? faCaretUp : faCaretDown} />
      </button>
    )}
  </div>
);

RowSearchButtonGroup.propTypes = {
  onSwap: PropTypes.func,
  id: PropTypes.string,
  onSearchClick: PropTypes.func,
  onClearClick: PropTypes.func,
  onShowList: PropTypes.func,
  dropDown: PropTypes.bool,
  showList: PropTypes.bool,
};

class RowSpotifySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
    };
  }

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
    const tracks_list = items.map(track => (
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
        <span>{full_title || 'No Title'}</span>
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
                  onChange={({ target }) => onUpdateClick && onUpdateClick({ id, value: target.value, field: 'title' })}
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
                dropDown={tracks_list.length !== 0}
                showList={showList}
              />
            </div>
            {showList && <ol>{tracks_list}</ol>}
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

RowSpotifySearch.contextTypes = {
  store: PropTypes.shape(),
};

RowSpotifySearch.propTypes = {
  artist: PropTypes.string,
  id: PropTypes.string,
  items: PropTypes.arrayOf(trackObjectProps),
  full_title: PropTypes.string,
  selected: trackObjectProps,
  title: PropTypes.string,
  onClearClick: PropTypes.func,
  onSearchClick: PropTypes.func,
  onSwap: PropTypes.func,
  onUpdateClick: PropTypes.func,
};
RowSpotifySearch.defaultProps = {
  items: [],
};
export default RowSpotifySearch;
