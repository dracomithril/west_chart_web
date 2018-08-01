/**
 * Created by Gryzli on 09.04.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import PlaylistForm from './PlaylistForm';
import RowSpotifySearch from './RowSpotifySearch';
import PlaylistInfo from '../PlaylistInfo';
import { actionTypes } from '../../reducers/actionTypes';
import { createPlaylistAndAddTracks, searchForMusic } from '../../utils/spotify_utils';
import { chartObjectProps } from '../typeDefinitions';

class SpotifySearch extends React.Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onClearHandler = (target) => {
    const { store } = this.context;
    store.dispatch({
      type: actionTypes.CLEAR_SELECTED,
      id: target.id,
    });
  };

  onSwap = (search_id) => {
    const { store } = this.context;
    store.dispatch({
      type: actionTypes.SWAP_FIELDS,
      id: search_id,
    });
  };

  onStartClickHandler = () => {
    const { store } = this.context;
    const { spotifyUser } = store.getState();
    const { selected, onStartClick } = this.props;
    selected.forEach((elem) => {
      searchForMusic({ ...elem.search, id: elem.id }, spotifyUser.access_token).then(res => res
          && store.dispatch({
            type: actionTypes.UPDATE_SINGLE_SEARCH,
            field: 'items',
            value: res.value,
            id: res.id,
          }));
    });
    onStartClick && onStartClick();
  };

  handleCratePlaylistClick = ({ playlistName, isPrivate }) => {
    const { store } = this.context;
    const { spotifyUser } = store.getState();
    const { selected } = this.props;
    const selectedElements = selected
      .map(({ search }) => (search.selected !== undefined ? search.selected.uri : undefined))
      .filter(elem => elem !== undefined);
    createPlaylistAndAddTracks(
      spotifyUser.access_token,
      spotifyUser.id,
      playlistName,
      isPrivate,
      selectedElements,
    ).then(info => store.dispatch({
      type: actionTypes.UPDATE_PLAYLIST_INFO,
      value: info,
    }));
  };

  updateSingleSearch = (target) => {
    const { store } = this.context;
    store.dispatch({
      type: actionTypes.UPDATE_SINGLE_SEARCH,
      field: target.field,
      value: target.value,
      id: target.id,
    });
  };

  handleSearchClick = (search, id) => () => {
    const { store } = this.context;
    const { spotifyUser } = store.getState();
    searchForMusic({ ...search, id }, spotifyUser.access_token).then(({ id: searchId, value }) => {
      this.updateSingleSearch({ id: searchId, value, field: 'items' });
    });
  };

  render() {
    const { store } = this.context;
    const { sp_playlist_info, spotifyUser } = store.getState();
    const { selected } = this.props;

    const search_list_view = selected.map(({ search = {}, id }) => (
      <RowSpotifySearch
        items={search.items}
        selected={search.selected}
        id={id}
        artist={search.artist}
        full_title={search.full_title}
        title={search.title}
        key={id}
        onSwap={this.onSwap}
        onUpdateClick={this.updateSingleSearch}
        onSearchClick={this.handleSearchClick(search, id)}
        onClearClick={this.onClearHandler}
      />
    ));

    return (
      <div className="spotify-search">
        <div className="spotify-search__header">
          create
          <FontAwesomeIcon icon={faSpotify} />
          spotify playlist:
        </div>
        {sp_playlist_info.url !== null && <PlaylistInfo {...sp_playlist_info} />}

        <PlaylistForm
          onCreatePlaylistClick={this.handleCratePlaylistClick}
          onStartClick={this.onStartClickHandler}
          hasElements={selected.length > 0}
          isUserLogged={Boolean(spotifyUser.id)}
        />
        <div className="spotify-search_list">
          {search_list_view.length > 0 && search_list_view}
        </div>
      </div>
    );
  }
}

SpotifySearch.contextTypes = {
  store: PropTypes.shape(),
};
SpotifySearch.propTypes = {
  selected: PropTypes.arrayOf(chartObjectProps),
  onStartClick: PropTypes.func,
};
SpotifySearch.defaultProps = {
  selected: [],
};

export default SpotifySearch;
