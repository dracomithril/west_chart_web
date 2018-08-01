import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretRight,
  faCaretUp,
  faClock,
  faComment,
  faExternalLinkSquareAlt,
  faThumbsUp,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

function shortFormatDate(date) {
  if (date) {
    const date2 = moment(date);
    const dateFormat = moment().year() === date2.year() ? 'DD.MM' : 'DD.MM.YY';
    return date2.format(dateFormat);
  }
  return '';
}

const fullFormatDate = date => (date ? moment(date).format('dddd, MMMM Do YYYY, HH:mm:ss') : '');

const ChartRow = ({
  from,
  link = {},
  checked,
  createdTime,
  onChange,
  updatedTime,
  story,
  message,
  id,
  reactionsNum,
}) => {
  const showUpdateTime = updatedTime && updatedTime !== createdTime;
  const withMessage = {
    icon: faComment,
    color: 'green',
    style: { cursor: 'pointer' },
  };
  const noMessage = { icon: faTimesCircle, color: 'red', style: { cursor: 'np-drop' } };
  const messageProps = message ? withMessage : noMessage;
  return (
    <div className="chart-row">
      <Checkbox
        id={id}
        checked={checked}
        onChange={({ target }) => {
          onChange && onChange(target);
        }}
        value={id}
        color="primary"
      />
      {from != null ? (
        <React.Fragment>
          <Avatar src={from.picture_url} style={{ marginTop: 5 }} />
          <span className="chart-row__user-info__name">
            {`${from.first_name} ${from.last_name}`}
          </span>
        </React.Fragment>
      ) : (
        <span id="chart-row__story" style={{ maxWidth: 150, paddingRight: 5 }}>
          {story}
        </span>
      )}
      <div className="chart-row__post-info">
        <FontAwesomeIcon icon={faThumbsUp} color="blue" />
        {reactionsNum}
        <div title={message}>
          <FontAwesomeIcon {...messageProps} />
        </div>
      </div>
      <div className="chart-row__time-info">
        <FontAwesomeIcon icon={faClock} color="black" style={{ marginBottom: 5 }} />
        <span style={{ color: 'red' }} title={`creation time: ${fullFormatDate(createdTime)}`}>
          <FontAwesomeIcon icon={faCaretRight} />
          {' '}
          {shortFormatDate(createdTime)}
        </span>
        {showUpdateTime && (
          <span style={{ color: 'green' }} title={`update time: ${fullFormatDate(updatedTime)}`}>
            <FontAwesomeIcon icon={faCaretUp} />
            {' '}
            {shortFormatDate(updatedTime)}
          </span>
        )}
      </div>
      <div className="chart-row__link">
        <FontAwesomeIcon icon={faExternalLinkSquareAlt} style={{ color: 'red' }} />
        {link.url === undefined ? (
          <span>
            {link.title}
          </span>
        ) : (
          <a href={link.url} target="_newtab">
            {link.title}
          </a>
        )}
      </div>
    </div>
  );
};
ChartRow.defaultProps = {
  from: {},
  story: null,
  checked: false,
  createdTime: null,
  updatedTime: null,
  message: null,
  reactionsNum: 0,
  link: {},
};
ChartRow.propTypes = {
  id: PropTypes.string.isRequired,
  from: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    picture_url: PropTypes.string,
  }),
  story: PropTypes.string,
  checked: PropTypes.bool,
  createdTime: PropTypes.string,
  updatedTime: PropTypes.string,
  message: PropTypes.string,
  reactionsNum: PropTypes.number,
  link: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
};

export default ChartRow;
