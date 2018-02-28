/**
 * Created by XKTR67 on 5/11/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { searchForMusic } from '../utils/spotify_utils';
import './components.css';

import action_types from './../reducers/action_types';

const TrackPreview = props => {
  const { track, nolink } = props;
  const artists = track.artists.map(elem => elem.name).join(' & ');
  const audio =
    track.preview_url !== null ? (
      <audio controls>
        <source src={track.preview_url} type="audio/mpeg" />
      </audio>
    ) : (
      <span style={{ color: 'red' }}>
        No preview
        {!nolink && (
          <a href={(track.external_urls || {}).spotify} target="_newtab">
            {' go to '}
            <i className="fab fa-spotify" aria-hidden="true" />
          </a>
        )}
      </span>
    );
  return (
    <div className="track_view">
      <strong>{track.name}</strong>
      <br />
      {audio}
      <div>
        <span>by:</span>
        <span className="artist_name">{artists}</span>
      </div>
    </div>
  );
};
TrackPreview.propTypes = {
  track: PropTypes.object,
  nolink: PropTypes.bool,
};

const RowSpotifySearch = ({ search_elem }, { store }) => {
  const create_menuItems = track => {
    const selectTrack = () => {
      console.info('track was selected %j', track);
      store.dispatch({
        type: action_types.UPDATE_SINGLE_SEARCH,
        field: 'selected',
        value: track,
        id: search_elem.search_id,
      });
    };
    return (
      <MenuItem key={track.id} id={`mi_select_track_${search_elem.id}`} onClick={selectTrack}>
        <TrackPreview track={track} nolink />
      </MenuItem>
    );
  };
  const items = (search_elem.items || []).map(create_menuItems);

  const update_artist = ({ target }) => {
    store.dispatch({
      type: action_types.UPDATE_SINGLE_SEARCH,
      field: 'artist',
      value: target.value,
      id: target.id,
    });
  };
  const update_title = ({ target }) => {
    store.dispatch({
      type: action_types.UPDATE_SINGLE_SEARCH,
      field: 'title',
      value: target.value,
      id: target.id,
    });
  };
  const selected_track = search_elem.selected;
  const condition = selected_track !== undefined && selected_track.preview_url !== undefined;
  const haveIssue = !search_elem.artist || !search_elem.title;
  return (
    <tr style={condition ? undefined : { background: 'red' }}>
      <td>
        <div className={`track_view ${haveIssue ? 'error_bg' : ''}`}>
          <span>{search_elem.full_title}</span>
          <br />
          <input
            type="text"
            id={search_elem.search_id}
            value={search_elem.artist || ''}
            onChange={update_artist}
          />
          <button
            onClick={() => {
              store.dispatch({
                type: action_types.SWAP_FIELDS,
                id: search_elem.search_id,
              });
            }}
          >
            <i className="fas fa-sync" aria-hidden="true" />
          </button>
          <input
            type="text"
            id={search_elem.search_id}
            value={search_elem.title || ''}
            onChange={update_title}
          />
        </div>
      </td>
      <td>
        <div>
          <ButtonGroup vertical>
            <Button
              id={`button-${search_elem.id}`}
              onClick={() => {
                searchForMusic(search_elem, store).then(res =>
                  store.dispatch({
                    type: action_types.UPDATE_SINGLE_SEARCH,
                    field: 'items',
                    value: res.value,
                    id: res.id,
                  }),
                );
              }}
              bsStyle="info"
            >
              search
            </Button>
            <DropdownButton
              disabled={items.length === 0}
              title="select"
              key={search_elem.search_id}
              id={`dropdown-basic-${search_elem.search_id}`}
              bsStyle={items.length === 0 ? 'warning' : 'success'}
            >
              {items}
            </DropdownButton>
          </ButtonGroup>
        </div>
      </td>
      <td>{condition && <TrackPreview track={selected_track} />}</td>
    </tr>
  );
};
RowSpotifySearch.contextTypes = {
  store: PropTypes.object,
};
RowSpotifySearch.propTypes = {
  search_elem: PropTypes.object,
};
export default RowSpotifySearch;
