/**
 * Created by XKTR67 on 5/11/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faMinus, faSearch, faSync, faTimes } from '@fortawesome/fontawesome-free-solid';
import './playlist.css';
import TrackPreview from './TrackPreview';

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
      search_id,
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
    const tracks_list = (items || []).map(track => (
      <MenuItem
        key={track.id}
        id={`mi_select_track_${id}`}
        onClick={() => {
          onUpdateClick({ id: search_id, value: track, field: 'selected' });
          this.setState({ showList: false });
        }}
        style={{ backgroundColor: 'snow' }}
      >
        <TrackPreview
          artists={track.artists}
          external_urls={track.external_urls}
          preview_url={track.preview_url}
          trackName={track.name}
          noLink
        />
      </MenuItem>
    ));

    const condition = selected_track && selected_track.preview_url !== undefined;
    const haveIssue = !artist || !title;

    return (
      <div className={selected_track ? 'row-spotify-search__root--good' : 'row-spotify-search__root--error'}>
        <span>{full_title || 'No Title'}</span>
        <div>
          <div>
            <div
              className={
                haveIssue ? 'row-spotify-search__track-search--error' : 'row-spotify-search__track-search--good'
              }
            >
              <label htmlFor={`${search_id}_artist`}>
                artist:
                <input
                  type="text"
                  id={`${search_id}_artist`}
                  value={artist || ''}
                  placeholder="artist name"
                  onChange={({ target }) => {
                    onUpdateClick({ id: search_id, value: target.value, field: 'artist' });
                  }}
                />
              </label>
              <label htmlFor={`${search_id}_title`}>
                title:
                <input
                  type="text"
                  id={`${search_id}_title`}
                  value={title || ''}
                  placeholder="song title"
                  onChange={({ target }) =>
                    onUpdateClick && onUpdateClick({ id: search_id, value: target.value, field: 'title' })
                  }
                />
              </label>

              <div>
                <button onClick={() => onSwap && onSwap(search_id)} title="swap artist with title">
                  <FontAwesomeIcon icon={faSync} />
                </button>
                <button id={`button-${id}`} onClick={() => onSearchClick && onSearchClick()} title="search for tracks">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
                <button title="clear selected" onClick={() => onClearClick && onClearClick({ id: search_id })}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
                {tracks_list.length !== 0 && (
                  <button
                    onClick={() => {
                      this.setState({ showList: !this.state.showList });
                    }}
                    title="show/hide found tracks"
                  >
                    {tracks_list.length === 0 ? (
                      <FontAwesomeIcon icon={faMinus} />
                    ) : (
                      <FontAwesomeIcon icon={this.state.showList ? faCaretUp : faCaretDown} />
                    )}
                  </button>
                )}
              </div>
            </div>
            {this.state.showList && <ol>{tracks_list}</ol>}
          </div>
          {condition && (
            <div className="row-spotify-search__track_view">
              <TrackPreview
                artists={selected_track.artists}
                external_urls={selected_track.external_urls}
                preview_url={selected_track.preview_url}
                trackName={selected_track.name}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

RowSpotifySearch.contextTypes = {
  store: PropTypes.object,
};
RowSpotifySearch.propTypes = {
  onSwap: PropTypes.func,
  id: PropTypes.string,
  items: PropTypes.array,
  search_id: PropTypes.number,
  artist: PropTypes.string,
  title: PropTypes.string,
  full_title: PropTypes.string,
  selected: PropTypes.object,
  onUpdateClick: PropTypes.func,
  onSearchClick: PropTypes.func,
  onClearClick: PropTypes.func,
};
export default RowSpotifySearch;
