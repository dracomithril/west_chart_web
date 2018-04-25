/**
 * Created by Gryzli on 10.04.2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSave, faLightbulb } from '@fortawesome/fontawesome-free-solid';
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
    const { monday, friday } = weekInfo(new Date());

    const monday_str = monday.toLocaleString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
    const friday_str = friday.toLocaleString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();

    const playlist_name = `Chart_${monday_str}-${friday_str}`;
    const list = playlist_name.split(' ').join('_');
    this.setState({ playlistName: list });
  };

  render() {
    const { onCreatePlaylistClick, onStartClick, hasElements, isUserLogged } = this.props;
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
          placeholder="playlist name"
          onChange={({ target }) => {
            this.setState({ playlistName: target.value });
          }}
        />
        <Button variant="fab" color="secondary" onClick={this.onGenPlaylistName} id="genName_sp_button">
          <FontAwesomeIcon icon={faLightbulb} />
        </Button>
        <Button
          variant="fab"
          id="crt_pl_button"
          onClick={() => onCreatePlaylistClick && onCreatePlaylistClick({ playlistName, isPrivate })}
          disabled={!isNameValid}
          title={disable_create ? 'Sorry you need to be logged to spotify to be able to add playlist' : ''}
        >
          <FontAwesomeIcon icon={faSave} />
        </Button>
        <FormControlLabel
          control={
            <Checkbox
              id="play_list_is_private"
              value="private"
              color="primary"
              checked={isPrivate}
              onChange={({ target }) => {
                this.setState({ isPrivate: target.checked });
              }}
            />
          }
          label="private"
        />
      </div>
    );
  }
}
PlaylistForm.contextTypes = {
  store: PropTypes.object,
};
PlaylistForm.propTypes = {
  hasElements: PropTypes.bool,
  isUserLogged: PropTypes.bool,
  onStartClick: PropTypes.func,
  onCreatePlaylistClick: PropTypes.func,
};
