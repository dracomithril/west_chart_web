/* eslint-disable jsx-a11y/label-has-for */

import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { flatMap, uniq } from 'lodash';
import {
  addTrucksToPlaylistNoRepeats,
  createPlaylistAndAddTracks,
  getTracks,
  getUserAndPlaylists,
} from '../utils/spotify_utils';
import PlaylistInfo from './PlaylistInfo';
import UserPlaylist from './UserPlaylist';
import actionTypes from '../reducers/actionTypes';

// todo add modal to block usage of tool when playlist crating
const cf = {
  existing: 'existing',
  new_list: 'new_list',
};
export class PlaylistCombiner extends React.Component {
  state = {
    selected: [],
    userField: '',
    users: {},
    createFrom: cf.existing,
    newPlaylist: '',
    spotifyPlaylistInfo: {
      url: null,
    },
  };

  componentDidMount() {
    const { spotifyUser } = this.props;
    this.getUserInformation(spotifyUser.id);
  }

  updateUsers = (usersList, new_user) => {
    const newUsers = {
      [new_user.id]: Object.assign({}, usersList[new_user.id], new_user),
    };
    return { users: Object.assign({}, usersList, newUsers) };
  };

  getUserInformation = (user) => {
    if (user) {
      const { users } = this.state;
      const { spotifyUser, addError, signOutUser } = this.props;

      return getUserAndPlaylists(spotifyUser.access_token, user)
        .then((new_user) => {
          this.setState(this.updateUsers(users, new_user));
          console.info('Retrieved playlists ', new_user);
          return Promise.resolve(new_user.id);
        })
        .catch((e) => {
          addError(e);
          signOutUser();
          return Promise.resolve();
        });
    }
    return Promise.resolve();
  };

  searchForUser_click = () => {
    const { users, userField } = this.state;
    if (Object.keys(users).length < 3) {
      this.getUserInformation(userField)
        .then(() => this.setState({ userField: '' }));
    } else {
      alert('Sorry you can only combine list from 3 users. Delete one of users to add new one.');
    }
  };

  combinePlaylists = () => {
    // todo check if playlist exists
    const createFrom_selected = document.getElementById('select_user_playlist').value;
    const { selected, newPlaylist, createFrom } = this.state;
    const { addError, spotifyUser } = this.props;
    const array = flatMap(selected, n => n);
    const { id, access_token } = spotifyUser;

    const actions = array.map(el => getTracks(access_token, ...el));
    Promise.all(actions)
      .then((data) => {
        const flat_tracks = flatMap(data, n => n);
        const uniqTracks = uniq(flat_tracks);
        return createFrom === cf.existing
          ? addTrucksToPlaylistNoRepeats(id, createFrom_selected, uniqTracks, access_token)
          : createPlaylistAndAddTracks(access_token, id, newPlaylist, false, uniqTracks);
      })
      .then((playlistInfo) => {
        this.setState({ spotifyPlaylistInfo: playlistInfo });
        this.getUserInformation(spotifyUser.id);
        this.forceUpdate();
      })
      .catch(addError);
  };

  deleteUserPlaylist = (user_id) => {
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
    const {
      userField, users, spotifyPlaylistInfo, createFrom, newPlaylist,
    } = this.state;
    const { spotifyUser } = this.props;
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
    const user_playlists = ((users[spotifyUser.id] || {}).items || [])
      .map(UserPlaylist.mapUserPlaylistToOptions);
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
          Combiner
          <strong style={{ color: 'red' }}>
(BETA)
          </strong>
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
        {spotifyPlaylistInfo.url !== null && <PlaylistInfo {...spotifyPlaylistInfo} />}
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
            <div className="playlists_view_conteiner">
              {users_playlists}
            </div>
          </div>
          <div id="destination_panel">
            <h5>
To:
            </h5>
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
            <Button onClick={this.combinePlaylists} color="secondary" variant="contained">
              Combine
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

PlaylistCombiner.propTypes = {
  addError: PropTypes.func,
  signOutUser: PropTypes.func,
  spotifyUser: PropTypes.shape(),
};

const mapStateToProps = ({ spotifyUser } /* , ownProps */) => ({
  spotifyUser,
});

const mapDispatchToProps = dispatch => ({
  addError: (error) => {
    dispatch({ type: actionTypes.ADD_ERROR, value: error });
  },
  signOutUser: () => {
    dispatch({ type: actionTypes.SIGN_OUT_USER });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistCombiner);
