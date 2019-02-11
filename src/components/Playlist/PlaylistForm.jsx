/**
 * Created by michal.grezel on 10.04.2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { weekInfo } from '../../utils/utils';
import './playlist.css';

export default class PlaylistForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: '',
      isPrivate: false,
    };
  }

  onGenPlaylistName = () => {
    const { monday, friday } = weekInfo();

    const mondayStr = monday.format('MMM_D').toUpperCase();
    const fridayStr = friday.format('MMM_D').toUpperCase();

    const playlistName = `Chart_${mondayStr}-${fridayStr}`;
    this.setState({ playlistName });
  };

  render() {
    const { store } = this.context;
    const { spotifyUser } = store.getState();
    const {
      onCreatePlaylistClick: onCreatePlaylist, onStartClick, hasElements, isUserLogged,
    } = this.props;
    const { playlistName, isPrivate } = this.state;
    const disable_create = !(playlistName.length > 5 && hasElements && isUserLogged);
    const validatePlaylistName = (str = '') => str.length > 7;
    const isNameValid = validatePlaylistName(playlistName);
    return (
      <div className="playlist-form">
        <Button variant="raised" color="primary" onClick={onStartClick} id="start_sp_button">
          start
        </Button>
        <TextField
          error={!isNameValid}
          value={playlistName}
          style={{ padding: '5px' }}
          placeholder="playlist name"
          onChange={({ target }) => {
            this.setState({ playlistName: target.value });
          }}
        />
        <div style={{ alignSelf: 'center' }}>
          <Button variant="fab" color="secondary" onClick={this.onGenPlaylistName} id="genName_sp_button">
            <FontAwesomeIcon icon={faLightbulb} />
          </Button>
          <Button
            variant="fab"
            id="crt_pl_button"
            onClick={() => onCreatePlaylist && onCreatePlaylist({ playlistName, isPrivate })}
            disabled={!isNameValid && Boolean(spotifyUser.id)}
            title={disable_create ? 'Sorry you need to be logged to spotify to be able to add playlist' : ''}
          >
            <FontAwesomeIcon icon={faSave} />
          </Button>
          <FormControlLabel
            control={(
              <Checkbox
                id="play_list_is_private"
                value="private"
                color="primary"
                checked={isPrivate}
                onChange={({ target }) => {
                  this.setState({ isPrivate: target.checked });
                }}
              />
)}
            label="private"
          />
        </div>
      </div>
    );
  }
}
PlaylistForm.contextTypes = {
  store: PropTypes.shape(),
};
PlaylistForm.propTypes = {
  hasElements: PropTypes.bool,
  isUserLogged: PropTypes.bool,
  onStartClick: PropTypes.func,
  onCreatePlaylistClick: PropTypes.func,
};
