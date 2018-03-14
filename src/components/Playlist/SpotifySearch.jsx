/**
 * Created by Gryzli on 09.04.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import PlaylistForm from './PlaylistForm';
import RowSpotifySearch from './RowSpotifySearch';
import PlaylistInfo from './../PlaylistInfo';
import { action_types } from '../../reducers/action_types';
import { createPlaylistAndAddTracks, searchForMusic } from '../../utils/spotify_utils';
import { getArtist_Title } from '../../utils/utils';

class SpotifySearch extends React.Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { store } = this.context;
    const { search_list, sp_playlist_info, sp_user } = store.getState();
    const { selected = [], onStartClick } = this.props;
    const onSwap = search_id => {
      store.dispatch({
        type: action_types.SWAP_FIELDS,
        id: search_id,
      });
    };

    const updateSingleSearch = target => {
      store.dispatch({
        type: action_types.UPDATE_SINGLE_SEARCH,
        field: target.field,
        value: target.value,
        id: target.id,
      });
    };

    const search_list_view = search_list.map((search_elem, index, array) => (
      <RowSpotifySearch
        items={search_elem.items}
        selected={search_elem.selected}
        id={search_elem.id}
        artist={search_elem.artist}
        full_title={search_elem.full_title}
        search_id={search_elem.search_id}
        title={search_elem.title}
        key={search_elem.id}
        onSwap={onSwap}
        onUpdateClick={updateSingleSearch}
        onSearchClick={() => {
          searchForMusic(search_elem, sp_user.access_token).then(({ id, value }) => {
            updateSingleSearch({ id, value, field: 'items' });
          });
        }}
      />
    ));
    const onStartClickHandler = () => {
      const search = selected.map((elem, search_id) => {
        const entry = getArtist_Title(elem.link.title);
        const search_track = {
          artist: entry.artist,
          title: entry.title,
          full_title: elem.link.title,
          id: elem.id,
          search_id,
          items: [],
          selected: {},
        };
        searchForMusic(search_track, sp_user.access_token).then(
          res =>
            res &&
            store.dispatch({
              type: action_types.UPDATE_SINGLE_SEARCH,
              field: 'items',
              value: res.value,
              id: res.id,
            }),
        );
        return search_track;
      });
      store.dispatch({ type: action_types.UPDATE_SEARCH, search });
      onStartClick && onStartClick();
    };
    const onCratePlaylistClick = ({ playlistName, isPrivate }) => {
      const selectedElements = search_list
        .map(elem => (elem.selected !== undefined ? elem.selected.uri : undefined))
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
          <i className="fab fa-spotify" aria-hidden="true" />
          spotify playlist:
        </div>
        <PlaylistInfo info={sp_playlist_info} />
        <PlaylistForm
          onCreatePlaylistClick={onCratePlaylistClick}
          onStartClick={onStartClickHandler}
          hasElements={(selected || []).length > 0}
        />
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
