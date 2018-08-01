/**
 * Created by Gryzli on 05.06.2017.
 */
import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {
  addTrucksToPlaylistNoRepeats,
  createPlaylistAndAddTracks,
  getTracks,
  getUserAndPlaylists,
} from '../utils/spotify_utils';
import PlaylistInfo from './PlaylistInfo';
import UserPlaylist from './UserPlaylist';

import { actionTypes } from '../reducers/actionTypes';

const _ = require('lodash');
// todo add modal to block usage of tool when playlist crating
const cf = {
  existing: 'existing',
  new_list: 'new_list',
};
export default class PlaylistCombiner extends React.Component {
  state = {
    selected: [],
    userField: '',
    users: {},
    createFrom: cf.existing,
    newPlaylist: '',
    sp_playlist_info: {
      url: null,
    },
  };

  componentDidMount() {
    const { store } = this.context;
    const { spotifyUser } = store.getState();
    this.getUserInformation(spotifyUser.id);
  }

  getUserInformation = user => {
    if (user) {
      const {
        state,
        context: { store },
      } = this;
      const { spotifyUser } = store.getState();
      const updateUsers = (users, new_user) => {
        const newUsers = {
          [new_user.id]: Object.assign({}, users[new_user.id], new_user),
        };
        return { users: Object.assign({}, users, newUsers) };
      };
      return getUserAndPlaylists(spotifyUser.access_token, user)
        .then(new_user => {
          this.setState(updateUsers(state.users, new_user));
          console.info('Retrieved playlists ', new_user);
          return Promise.resolve(new_user.id);
        })
        .catch(e => {
          store.dispatch({ type: actionTypes.ADD_ERROR, value: e });
          store.dispatch({ type: actionTypes.SIGN_OUT_USER });
          return Promise.resolve();
        });
    }
    return Promise.resolve();
  };

  searchForUser_click = () => {
    const { users, userField } = this.state;
    if (Object.keys(users).length < 3) {
      this.getUserInformation(userField).then(() => this.setState({ userField: '' }));
    } else {
      alert('Sorry you can only combine list from 3 users. Delete one of users to add new one.');
    }
  };

  combinePlaylists = () => {
    // todo check if playlist exists
    const { store } = this.context;
    const createFrom_selected = document.getElementById('select_user_playlist').value;
    const { spotifyUser } = store.getState();
    const { selected, newPlaylist, createFrom } = this.state;
    const array = _.flatMap(selected, n => n);

    const actions = array.map(el => getTracks(spotifyUser.access_token, ...el));
    Promise.all(actions)
      .then(data => {
        const flat_tracks = _.flatMap(data, n => n);
        const uniq = _.uniq(flat_tracks);
        const { id, access_token } = spotifyUser;
        return createFrom === cf.existing
          ? addTrucksToPlaylistNoRepeats(id, createFrom_selected, uniq, access_token)
          : createPlaylistAndAddTracks(access_token, id, newPlaylist, false, uniq);
      })
      .then(d => {
        this.setState({ sp_playlist_info: d });
        this.getUserInformation(spotifyUser.id);
        this.forceUpdate();
      })
      .catch(e => {
        store.dispatch({ type: actionTypes.ADD_ERROR, value: e });
      });
  };

  deleteUserPlaylist = user_id => {
    console.info(`delete ${user_id}`);
    const { users } = this.state;
    const users_new = Object.assign({}, users);
    delete users_new[user_id];
    this.setState({ users: users_new });
  };

  updateSelectedPlaylist = (user, selectedPlaylist) => {
    const that = this;
    const updateSelected = (id, arr) => {
      const newSelected = {};
      newSelected[id] = arr;
      return { selected: Object.assign({}, that.state.selected, newSelected) };
    };
    this.setState(updateSelected(user, selectedPlaylist));
  };

  render() {
    const { store } = this.context;
    const { userField, users, sp_playlist_info, createFrom, newPlaylist } = this.state;
    const { spotifyUser } = store.getState();
    const users_playlists = Object.keys(users).map(user => (
      <UserPlaylist
        user={users[user]}
        key={`${user}_playlists`}
        onUpdate={this.getUserInformation}
        onDelete={this.deleteUserPlaylist}
        onSelect={this.updateSelectedPlaylist}
        erasable={(users[user] || {}).id !== spotifyUser.id}
      />
    ));
    const user_playlists = ((users[spotifyUser.id] || {}).items || []).map(UserPlaylist.mapUserPlaylistToOptions);
    const newList_checked = cf.new_list === createFrom;
    const existing_checked = cf.existing === createFrom;
    const updateSelected = ({ target }) => {
      this.setState({
        createFrom: target.id,
      });
    };
    return (
      <div className="App">
        <h3>
          Combiner<strong style={{ color: 'red' }}>(BETA)</strong>
        </h3>
        <div>
          <span>
            {`Combiner gets only 50 last active playlists from your spotify account and from that list
            selects only playlists that belongs to the user that you are looking for. Right now
            there is no simple way to look for users using their Name or Surname. Only valid
            'spotify id' is valid. If account is created using Facebook creation 'spotify id' is
            number that is hard to obtain. Sorry we will work on it.`}
          </span>
        </div>
        {sp_playlist_info.url !== null && <PlaylistInfo {...sp_playlist_info} />}
        <div style={{ display: 'inline-block' }}>
          <div id="from_playlist">
            <label htmlFor="user_id_input">
              {'From: '}
              <input
                type="text"
                id="user_id_input"
                value={userField}
                placeholder="spotify user name"
                autoComplete="on"
                onChange={e => this.setState({ userField: e.target.value })}
                onKeyPress={({ which }) => {
                  if (which === 13) {
                    this.searchForUser_click();
                  }
                }}
              />
            </label>
            <Button type="submit" onClick={this.searchForUser_click} className="btn2">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
            <div className="playlists_view_conteiner">{users_playlists}</div>
          </div>
          <div id="destination_panel">
            <h5>To:</h5>
            <div>
              <input type="radio" id={cf.existing} checked={existing_checked} onChange={updateSelected} />
              <label htmlFor="select_user_playlist">
                Existing List
                <br />
                <select id="select_user_playlist" disabled={!existing_checked}>
                  {user_playlists}
                </select>
              </label>
              <br />
              <input type="radio" id={cf.new_list} checked={newList_checked} onChange={updateSelected} />
              <label htmlFor={`${cf.new_list}_txt`}>
                New playlist
                <br />
                <input
                  type="text"
                  id={`${cf.new_list}_txt`}
                  disabled={!newList_checked}
                  placeholder="new playlist"
                  value={newPlaylist}
                  onChange={event => this.setState({ newPlaylist: event.target.value })}
                />
              </label>
            </div>
            <Button onClick={this.combinePlaylists} color="secondary" variant="raised">
              Combine
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
PlaylistCombiner.contextTypes = {
  store: PropTypes.shape(),
};
PlaylistCombiner.propTypes = {};
