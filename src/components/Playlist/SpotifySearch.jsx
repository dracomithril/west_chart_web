// @flow
import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import PlaylistFormContainer from './PlaylistForm';
import RowSpotifySearch from './RowSpotifySearch';
import PlaylistInfo from './PlaylistInfo';
import actionTypes from '../../reducers/actionTypes';
import { createPlaylistAndAddTracks, searchForMusic } from '../../utils/spotify_utils';
import type { ChartEntry, PlaylistInfoType, Search } from '../../types';
import type { SpotifyTrack, SpotifyUser } from '../../types/spotify';

type Props = {
  selected?: ChartEntry[],
  spotifyUser: $Exact<SpotifyUser>,
  spotifyPlaylistInfo: $Exact<PlaylistInfoType>,
  onStartClick: ()=>mixed,
  updateSingleSearch: ({
    field: string,
    value: SpotifyTrack,
    id: string,
  })=>mixed,
  updatePlaylistInfo: ()=>mixed,
  onSwap: ()=>mixed,
  onClearHandler: ()=>mixed,
};

export class SpotifySearch extends React.Component<Props> {
  static defaultProps = {
    selected: [],
  };

  onStartClickHandler = () => {
    const {
      selected, onStartClick, updateSingleSearch,
    } = this.props;
    // todo change it to map and promise all?
    selected && selected.forEach((elem) => {
      searchForMusic({ ...elem.search, id: elem.id })
        .then(res => res
          && updateSingleSearch
          && updateSingleSearch({
            field: 'items',
            value: res.value,
            id: res.id,
          }));
    });
    // todo can I move it upper
    onStartClick && onStartClick();
  };

  handleCratePlaylistClick = ({ playlistName, isPrivate }: {
    playlistName: string, isPrivate: boolean
  }) => {
    const { selected, spotifyUser, updatePlaylistInfo } = this.props;
    if (selected && selected.length > 0) {
      const selectedElements = selected
        .filter(elem => elem.selected !== undefined)
        .map(({ search }) => search.selected.uri);
      createPlaylistAndAddTracks(
        spotifyUser.access_token,
        spotifyUser.id,
        playlistName,
        isPrivate,
        selectedElements,
      ).catch((err) => {
        console.error(err);
      })
        .then(updatePlaylistInfo);
    } else {
      console.info('no trucks to add');
    }
  };

  handleSearchClick = (search: Search, id: string) => () => {
    const { updateSingleSearch } = this.props;
    searchForMusic({ ...search, id })
      .then(({ id: searchId, value }) => {
        updateSingleSearch({ id: searchId, value, field: 'items' });
      });
  };

  render() {
    const {
      selected, spotifyPlaylistInfo, spotifyUser, updateSingleSearch, onSwap, onClearHandler,
    } = this.props;

    const searchListView = selected ? selected.map(({ search = {}, id }) => (
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
    )) : null;

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
          hasElements={selected ? selected.length > 0 : false}
          isUserLogged={Boolean(spotifyUser.id)}
        />
        {searchListView && searchListView.length > 0
       && (
       <div className="spotify-search_list">
         {searchListView}
       </div>
       )}
      </div>
    );
  }
}

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
