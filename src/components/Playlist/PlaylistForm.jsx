// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Fab } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faSave } from '@fortawesome/free-solid-svg-icons';
import { weekInfo } from '../../utils/utils';
import './playlist.css';

type Props = {
  hasElements?: boolean,
  isUserLogged?: boolean,
  onStartClick?: ()=> mixed,
  onCreatePlaylistClick?: ({ playlistName: string, isPrivate: boolean })=> mixed,
  spotifyUserId?: string,
};

type State = {
  playlistName: string,
  isPrivate: boolean,
}
const getPlaylistName = () => {
  const { monday, friday } = weekInfo();

  const mondayStr = monday.format('MMM_D').toUpperCase();
  const fridayStr = friday.format('MMM_D').toUpperCase();

  return `Chart_${mondayStr}-${fridayStr}`;
};
export class PlaylistForm extends Component<Props, State> {
  state = {
    playlistName: '',
    isPrivate: false,
  };

  render() {
    const {
      onCreatePlaylistClick: onCreatePlaylist,
      onStartClick,
      hasElements,
      isUserLogged,
      spotifyUserId,
    } = this.props;
    const { playlistName, isPrivate } = this.state;
    const disable_create = !(playlistName.length > 5 && hasElements && isUserLogged);
    const validatePlaylistName = (str = '') => str.length > 7;
    const isNameValid = validatePlaylistName(playlistName);
    return (
      <div className="playlist-form">
        <Button variant="contained" color="primary" onClick={onStartClick} id="start_sp_button">
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
          <Fab
            color="secondary"
            onClick={() => {
              const name = getPlaylistName();
              this.setState({ playlistName: name });
            }}
            id="genName_sp_button"
          >
            <FontAwesomeIcon icon={faLightbulb} />
          </Fab>
          <Fab
            id="crt_pl_button"
            onClick={() => onCreatePlaylist && onCreatePlaylist({ playlistName, isPrivate })}
            disabled={!isNameValid && Boolean(spotifyUserId)}
            title={disable_create ? 'Sorry you need to be logged to spotify to be able to add playlist' : ''}
          >
            <FontAwesomeIcon icon={faSave} />
          </Fab>
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

const mapStateToProps = ({ spotifyUser }) => ({
  spotifyUserId: spotifyUser.id,
});

export default connect(mapStateToProps)(PlaylistForm);
