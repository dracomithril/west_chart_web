import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faMinus } from '@fortawesome/free-solid-svg-icons';

// todo add modal to block usage of tool when playlist crating
class UserPlaylist extends React.Component {
  static mapUserPlaylistToOptions({ id, name, tracks }) {
    const description = `${name} - {${(tracks || {}).total || 0}}`;
    return (
      <option key={id} value={id}>
        {description}
      </option>
    );
  }

  updateSelectList = ({ target }) => {
    const { name, selectedOptions } = target;
    const { onSelect } = this.props;
    const sel = Array.from(selectedOptions).map(({ value }) => [name, value]);
    onSelect(name, sel);
  };

  render() {
    const {
      user, onDelete, erasable, onUpdate,
    } = this.props;
    const {
      items, id = '', total, pic,
    } = user || {};
    const userPlaylist = (items || []).map(UserPlaylist.mapUserPlaylistToOptions);

    return (
      <div id={`${id}_playlist`} className="playlists_view form-group">
        <div>
          <div>
            <Avatar src={pic} />
            <span>
              {id.length > 12 ? `${id.substr(0, 9)}...` : id}
            </span>
          </div>
          <span>
            {total}
          </span>
          <div>
            <Button onClick={() => onUpdate(id)}>
              <FontAwesomeIcon icon={faSyncAlt} />
            </Button>
            <Button onClick={() => onDelete(id)} disabled={!erasable}>
              <FontAwesomeIcon icon={faMinus} />
            </Button>
          </div>
        </div>
        <select name={id} multiple onChange={this.updateSelectList}>
          {userPlaylist}
        </select>
      </div>
    );
  }
}

UserPlaylist.propTypes = {
  user: PropTypes.shape({
    items: PropTypes.array,
    id: PropTypes.string,
    total: PropTypes.number,
    pic: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  erasable: PropTypes.bool,
};
export default UserPlaylist;
