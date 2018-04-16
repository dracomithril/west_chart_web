/**
 * Created by Gryzli on 10.04.2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, FormControl, FormGroup, InputGroup } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/fontawesome-free-solid';
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
    const validatePlaylistName = strLength => {
      if (strLength > 8) {
        return 'success';
      }
      return strLength > 5 ? 'warning' : 'error';
    };
    return (
      <div className="playlist-form">
        <Button onClick={onStartClick} id="start_sp_button" bsStyle="success">
          start
        </Button>
        <FormGroup
          style={{ margin: '1px' }}
          controlId="play_list_name"
          validationState={validatePlaylistName((playlistName || {}).length)}
        >
          <InputGroup style={{ maxWidth: 250 }}>
            <FormControl
              type="text"
              placeholder="playlist name"
              value={playlistName}
              onChange={({ target }) => {
                this.setState({ playlistName: target.value });
              }}
            />
            <FormControl.Feedback />
            {/* <InputGroup.Addon><Glyphicon glyph="music"/></InputGroup.Addon> */}
          </InputGroup>
        </FormGroup>
        <ButtonGroup>
          <Button onClick={this.onGenPlaylistName} id="genName_sp_button" bsStyle="primary">
            gen. name
          </Button>
          <Button
            id="crt_pl_button"
            onClick={() => onCreatePlaylistClick && onCreatePlaylistClick({ playlistName, isPrivate })}
            disabled={disable_create}
            bsStyle={disable_create ? 'info' : 'danger'}
            title={disable_create ? 'Sorry you need to be logged to spotify to be able to add playlist' : ''}
          >
            <FontAwesomeIcon icon={faSave} /> save
          </Button>
        </ButtonGroup>
        <label htmlFor="play_list_is_private">
          <input
            type="checkbox"
            id="play_list_is_private"
            onChange={({ target }) => {
              this.setState({ isPrivate: target.checked });
            }}
            value="private"
            checked={isPrivate}
          />
          {'private'}
        </label>
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
