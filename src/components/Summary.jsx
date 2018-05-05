/**
 * Created by Gryzli on 09.04.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/fontawesome-free-solid';
import './components.css';
import { chartObjectProps } from './typeDefinitions';

const copy = require('clipboard-copy');
// let {sorting} = require('./../utils');
const create_print_list = (elem, index) => (
  <div key={elem.id}>{`${index + 1}. ${elem.link.title} ${elem.reactionsNum} likes`}</div>
);
export default class Summary extends React.Component {
  state = {
    introText: '',
    riddleText: '',
    riddleUrl: '',
  };

  /* istanbul ignore next */
  componentDidMount() {
    console.info('component Summary did mount');
  }

  /* istanbul ignore next */
  componentWillUnmount() {
    console.info('component Summary unmounted');
  }

  onCopyToClipboard = () => {
    const { store } = this.context;
    const { sp_playlist_info } = store.getState();
    const { selected } = this.props;
    const playList = selected
      .map((elem, ind) => `${ind + 1}. ${elem.link.title} ${elem.reactionsNum} likes`)
      .join('\n');
    const text = [
      '[WCS Weekly Westletter]',
      this.state.introText,
      playList,
      sp_playlist_info.url ? `Link to spotify playlist:${sp_playlist_info.url}` : 'No link',
      'Riddle:',
      this.state.riddleText,
      this.state.riddleUrl,
    ];
    copy(text.join('\n'));
    console.info('Summary was copied to clipboard');
  };

  render() {
    const { store } = this.context;
    const { selected } = this.props;
    const { sp_playlist_info } = store.getState();
    const print_list = (selected || []).map(create_print_list);
    return (
      <div className="summary">
        <div className="summary__header">
          <h3 id="summary">Summary</h3>
          <Button onClick={this.onCopyToClipboard} title="copy to clipboard" style={{ padding: 'unset', minWidth: 44 }}>
            <FontAwesomeIcon icon={faClipboard} />
          </Button>
        </div>
        <h6>[WCS Weekly Westletter]</h6>
        <textarea
          id="textarea_add"
          className="summary__textarea"
          placeholder="Here write what you want"
          defaultValue={this.state.introText}
          onChange={e => {
            this.setState({ introText: e.target.value });
          }}
        />
        {print_list.length === 0 && (
          <div>
            <span style={{ color: 'red' }}>Here will be list of tracks your choosing</span>
          </div>
        )}
        <div id="popover-contained" title="Print list">
          {print_list}
        </div>
        <h6>
          {'Link to spotify playlist: '}
          {sp_playlist_info.url && (
            <a href={sp_playlist_info.url} target="_newtab">
              {sp_playlist_info.url}
            </a>
          )}
          {!sp_playlist_info.url && <span style={{ color: 'red' }}>No link</span>}
        </h6>
        <textarea
          id="riddler"
          className="summary__textarea"
          placeholder="riddle that you have in mind"
          defaultValue={this.state.riddleText}
          onChange={({ target }) => {
            this.setState({ riddleText: target.value });
          }}
        />
        <br />
        <label htmlFor="link2riddle">
          Link for Riddle
          <input
            type="text"
            id="link2riddle"
            style={{ paddingLeft: 5, marginLeft: 5 }}
            placeholder="link to riddle"
            value={this.state.riddleUrl}
            onChange={e => {
              this.setState({ riddleUrl: e.target.value });
            }}
          />
        </label>
      </div>
    );
  }
}
Summary.contextTypes = {
  store: PropTypes.object,
};
Summary.propTypes = {
  selected: PropTypes.arrayOf(chartObjectProps),
};
