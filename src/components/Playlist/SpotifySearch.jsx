import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import PlaylistFormContainer from './PlaylistForm';
import RowSpotifySearch from './RowSpotifySearch';
import PlaylistInfo from './PlaylistInfo';
import actionTypes from '../../reducers/actionTypes';
import { createPlaylistAndAddTracks, searchForMusic } from '../../utils/spotify_utils';
import { chartObjectProps } from '../typeDefinitions';

export class SpotifySearch extends React.Component {
  onStartClickHandler = () => {
    const {
      selected, onStartClick, updateSingleSearch, spotifyUser,
    } = this.props;
    selected.forEach((elem) => {
      searchForMusic({ ...elem.search, id: elem.id }, spotifyUser.access_token).then(res => res
          && updateSingleSearch({
            field: 'items',
            value: res.value,
            id: res.id,
          }));
    });
    onStartClick && onStartClick();
  };

  handleCratePlaylistClick = ({ playlistName, isPrivate }) => {
    const { selected, spotifyUser, updatePlaylistInfo } = this.props;
    const selectedElements = selected
      .map(({ search }) => (search.selected !== undefined ? search.selected.uri : undefined))
      .filter(elem => elem !== undefined);
    createPlaylistAndAddTracks(
      spotifyUser.access_token,
      spotifyUser.id,
      playlistName,
      isPrivate,
      selectedElements,
    ).then(updatePlaylistInfo);
  };

  handleSearchClick = (search, id) => () => {
    const { spotifyUser, updateSingleSearch } = this.props;
    searchForMusic({ ...search, id }, spotifyUser.access_token).then(({ id: searchId, value }) => {
      updateSingleSearch({ id: searchId, value, field: 'items' });
    });
  };

  render() {
    const {
      selected, spotifyPlaylistInfo, spotifyUser, updateSingleSearch, onSwap, onClearHandler,
    } = this.props;

    const searchListView = selected.map(({ search = {}, id }) => (
      <RowSpotifySearch
        items={search.items}
        selected={search.selected}
        id={id}
        artist={search.artist}
        full_title={search.full_title}
        title={search.title}
        key={id}
        onSwap={onSwap}
        onUpdateClick={updateSingleSearch}
        onSearchClick={this.handleSearchClick(search, id)}
        onClearClick={onClearHandler}
      />
    ));

    return (
      <div className="spotify-search">
        <div className="spotify-search__header">
          create
          <FontAwesomeIcon icon={faSpotify} />
          spotify playlist:
        </div>
        {spotifyPlaylistInfo.url !== null && <PlaylistInfo {...spotifyPlaylistInfo} />}

        <PlaylistFormContainer
          onCreatePlaylistClick={this.handleCratePlaylistClick}
          onStartClick={this.onStartClickHandler}
          hasElements={selected.length > 0}
          isUserLogged={Boolean(spotifyUser.id)}
        />
        <div className="spotify-search_list">
          {searchListView.length > 0 && searchListView}
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
  spotifyUser: PropTypes.shape(),
  spotifyPlaylistInfo: PropTypes.shape(),
  onStartClick: PropTypes.func,
  updateSingleSearch: PropTypes.func,
  updatePlaylistInfo: PropTypes.func,
  onSwap: PropTypes.func,
  onClearHandler: PropTypes.func,
};
SpotifySearch.defaultProps = {
  selected: [],
};

const mapStateToProps = ({ spotifyPlaylistInfo, spotifyUser } /* , ownProps */) => ({
  spotifyPlaylistInfo,
  spotifyUser,
});

const mapDispatchToProps = dispatch => ({
  updateSingleSearch: (target) => {
    dispatch({
      type: actionTypes.UPDATE_SINGLE_SEARCH,
      field: target.field,
      value: target.value,
      id: target.id,
    });
  },
  updatePlaylistInfo: (info) => {
    dispatch({
      type: actionTypes.UPDATE_PLAYLIST_INFO,
      value: info,
    });
  },
  onSwap: (search_id) => {
    dispatch({
      type: actionTypes.SWAP_FIELDS,
      id: search_id,
    });
  },
  onClearHandler: (target) => {
    dispatch({
      type: actionTypes.CLEAR_SELECTED,
      id: target.id,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotifySearch);
