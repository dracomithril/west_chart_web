import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import copy from 'clipboard-copy';
import './components.css';
import { chartObjectProps } from './typeDefinitions';
// let {sorting} = require('./../utils');


const createPrintList = (elem, index) => (
  <div key={elem.id}>
    {`${index + 1}. ${elem.link.title} ${elem.reactionsNum} likes`}
  </div>
);
export class Summary extends React.Component {
  state = {
    introText: '',
    riddleText: '',
    riddleUrl: '',
  };

  onCopyToClipboard = () => {
    const { introText, riddleText, riddleUrl } = this.state;
    const { selected, spotifyPlaylistInfo } = this.props;
    const playList = selected
      .map((elem, ind) => `${ind + 1}. ${elem.link.title} ${elem.reactionsNum} likes`)
      .join('\n');
    const text = [
      '[WCS Weekly Westletter]',
      introText,
      playList,
      spotifyPlaylistInfo.url ? `Link to spotify playlist:${spotifyPlaylistInfo.url}` : 'No link',
      'Riddle:',
      riddleText,
      riddleUrl,
    ];
    copy(text.join('\n'));
    console.info('Summary was copied to clipboard');
  };

  render() {
    const { introText, riddleText, riddleUrl } = this.state;
    const { selected, spotifyPlaylistInfo } = this.props;
    const print_list = (selected || []).map(createPrintList);
    return (
      <div className="summary">
        <div className="summary__header">
          <h3 id="summary">
Summary
          </h3>
          <Button onClick={this.onCopyToClipboard} title="copy to clipboard" style={{ padding: 'unset', minWidth: 44 }}>
            <FontAwesomeIcon icon={faClipboard} />
          </Button>
        </div>
        <h6>
[WCS Weekly Westletter]
        </h6>
        <textarea
          id="textarea_add"
          className="summary__textarea"
          placeholder="Here write what you want"
          defaultValue={introText}
          onChange={(e) => {
            this.setState({ introText: e.target.value });
          }}
        />
        {print_list.length === 0 && (
          <div>
            <span style={{ color: 'red' }}>
Here will be list of tracks your choosing
            </span>
          </div>
        )}
        <div id="popover-contained" title="Print list">
          {print_list}
        </div>
        <h6>
          {'Link to spotify playlist: '}
          {spotifyPlaylistInfo.url && (
            <a href={spotifyPlaylistInfo.url} target="_newtab">
              {spotifyPlaylistInfo.url}
            </a>
          )}
          {!spotifyPlaylistInfo.url && (
          <span style={{ color: 'red' }}>
No link
          </span>
          )}
        </h6>
        <textarea
          id="riddler"
          className="summary__textarea"
          placeholder="riddle that you have in mind"
          defaultValue={riddleText}
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
            value={riddleUrl}
            onChange={(e) => {
              this.setState({ riddleUrl: e.target.value });
            }}
          />
        </label>
      </div>
    );
  }
}

Summary.propTypes = {
  selected: PropTypes.arrayOf(chartObjectProps),
  spotifyPlaylistInfo: PropTypes.shape(),
};

const mapStateToProps = ({ spotifyPlaylistInfo } /* , ownProps */) => ({
  spotifyPlaylistInfo,
});

export default connect(mapStateToProps)(Summary);
