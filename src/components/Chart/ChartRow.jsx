import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faCaretRight,
  faCaretUp,
  faClock,
  faComment,
  faExternalLinkSquareAlt,
  faTimesCircle,
} from '@fortawesome/fontawesome-free-solid';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';

const dateToLocaleString = (date, options) => date.toLocaleString(navigator.language || 'pl-PL', options);

function shortFormatDate(date) {
  if (date) {
    const date2 = new Date(date);
    const yearNow = new Date().getFullYear();
    const options = {
      day: 'numeric',
      month: 'numeric',
    };
    if (yearNow === date2.getFullYear()) {
      return dateToLocaleString(date2, options);
    }
    return dateToLocaleString(date2, { year: '2-digit', ...options });
  }
  return '';
}

const fullFormatDate = date => {
  if (date) {
    return dateToLocaleString(new Date(date), {
      day: 'numeric',
      month: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      year: 'numeric',
    });
  }
  return '';
};

const ChartRow = ({ from, link = {}, checked, createdTime, onChange, updatedTime, story, ...props }) => {
  const showUpdateTime = updatedTime && updatedTime !== createdTime;
  const withMessage = {
    icon: faComment,
    color: 'green',
    style: { cursor: 'pointer' },
  };
  const noMessage = { icon: faTimesCircle, color: 'red', style: { cursor: 'np-drop' } };
  const messageProps = props.message ? withMessage : noMessage;
  return (
    <div className="chart-row">
      <Checkbox
        id={props.id}
        checked={checked}
        onChange={({ target }) => {
          onChange && onChange(target);
        }}
        value={props.id}
        color="primary"
      />
      {typeof from === 'object' ? (
        <div className="chart-row__user-info">
          <Avatar src={from.picture_url} />
          <div className="chart-row__user-info__name">
            <span>{from.first_name}</span>
            <span>{from.last_name}</span>
          </div>
        </div>
      ) : (
        <div>{story}</div>
      )}
      <div style={{ display: 'flex' }}>
        <div className="chart-row__post-info">
          <FontAwesomeIcon icon="thumbs-up" color="blue" />
          {props.reactionsNum}
          <div title={props.message}>
            <FontAwesomeIcon {...messageProps} />
          </div>
        </div>
        <div className="chart-row__time-info">
          <FontAwesomeIcon icon={faClock} color="black" style={{ marginBottom: 5 }} />
          <span style={{ color: 'red' }} title={`creation time: ${fullFormatDate(createdTime)}`}>
            <FontAwesomeIcon icon={faCaretRight} /> {shortFormatDate(createdTime)}
          </span>
          {showUpdateTime && (
            <span style={{ color: 'green' }} title={`update time: ${fullFormatDate(updatedTime)}`}>
              <FontAwesomeIcon icon={faCaretUp} /> {shortFormatDate(updatedTime)}
            </span>
          )}
        </div>
      </div>
      <div className="chart-row__link">
        <FontAwesomeIcon icon={faExternalLinkSquareAlt} style={{ color: 'red' }} />
        {link.url === undefined ? (
          <span>{link.title}</span>
        ) : (
          <a href={link.url} target="_newtab">
            {link.title}
          </a>
        )}
      </div>
    </div>
  );
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
  createdTime: PropTypes.string.isRequired,
  updatedTime: PropTypes.string,
  message: PropTypes.string,
  reactionsNum: PropTypes.number,
  link: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func,
};

export default ChartRow;
