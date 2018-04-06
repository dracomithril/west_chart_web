/**
 * Created by Gryzli on 09.04.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/fontawesome-free-brands';
import PlaylistForm from './PlaylistForm';
import RowSpotifySearch from './RowSpotifySearch';
import PlaylistInfo from './../PlaylistInfo';
import { action_types } from '../../reducers/action_types';
import { createPlaylistAndAddTracks, searchForMusic } from '../../utils/spotify_utils';

class SpotifySearch extends React.Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  updateSingleSearch = target => {
    const { store } = this.context;
    store.dispatch({
      type: action_types.UPDATE_SINGLE_SEARCH,
      field: target.field,
      value: target.value,
      id: target.id,
    });
  };

  render() {
    const { store } = this.context;
    const { sp_playlist_info, sp_user } = store.getState();
    const { selected = [], onStartClick } = this.props;
    const onSwap = search_id => {
      store.dispatch({
        type: action_types.SWAP_FIELDS,
        id: search_id,
      });
    };

    const onClearHandler = target => {
      store.dispatch({
        type: action_types.CLEAR_SELECTED,
        id: target.id,
      });
    };

    const search_list_view = selected.map(({ search = {}, id }) => (
      <RowSpotifySearch
        items={search.items}
        selected={search.selected}
        id={id}
        artist={search.artist}
        full_title={search.full_title}
        title={search.title}
        key={id}
        onSwap={onSwap}
        onUpdateClick={this.updateSingleSearch}
        onSearchClick={() => {
          searchForMusic({ ...search, id }, sp_user.access_token).then(({ id: searchId, value }) => {
            this.updateSingleSearch({ id: searchId, value, field: 'items' });
          });
        }}
        onClearClick={onClearHandler}
      />
    ));
    const onStartClickHandler = () => {
      selected.forEach(elem => {
        searchForMusic({ ...elem.search, id: elem.id }, sp_user.access_token).then(
          res =>
            res &&
            store.dispatch({
              type: action_types.UPDATE_SINGLE_SEARCH,
              field: 'items',
              value: res.value,
              id: res.id,
            }),
        );
      });
      onStartClick && onStartClick();
    };
    const onCratePlaylistClick = ({ playlistName, isPrivate }) => {
      const selectedElements = selected
        .map(({ search }) => (search.selected !== undefined ? search.selected.uri : undefined))
        .filter(elem => elem !== undefined);
      createPlaylistAndAddTracks(sp_user.access_token, sp_user.id, playlistName, isPrivate, selectedElements).then(
        info =>
          store.dispatch({
            type: action_types.UPDATE_PLAYLIST_INFO,
            value: info,
          }),
      );
    };
    return (
      <div className="spotify-search">
        <div className="spotify-search__header">
          create
          <FontAwesomeIcon icon={faSpotify} />
          spotify playlist:
        </div>
        {sp_user.id && <PlaylistInfo info={sp_playlist_info} />}
        {sp_user.id && (
          <PlaylistForm
            onCreatePlaylistClick={onCratePlaylistClick}
            onStartClick={onStartClickHandler}
            hasElements={(selected || []).length > 0}
          />
        )}
        {!sp_user.id && (
          <div>
            <span>Sorry you need to be logged to spotify to be able to add playlist</span>
          </div>
        )}
        <div className="spotify-search_list">{search_list_view.length > 0 && search_list_view}</div>
      </div>
    );
  }
}

SpotifySearch.contextTypes = {
  store: PropTypes.object,
};
SpotifySearch.propTypes = {
  selected: PropTypes.array,
  onStartClick: PropTypes.func,
};

export default SpotifySearch;
