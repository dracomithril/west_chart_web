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
import Checkbox from '../universal/Checkbox';

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

const ChartRow = ({ from = {}, link = {}, checked, created_time, onChange, updated_time, ...props }) => {
  const showUpdateTime = updated_time && updated_time !== created_time;
  const withMessage = {
    icon: faComment,
    size: '2x',
    color: 'green',
    style: { cursor: 'pointer' },
  };
  const noMessage = { icon: faTimesCircle, size: '2x', color: 'red', style: { cursor: 'np-drop' } };
  const messageProps = props.message ? withMessage : noMessage;
  return (
    <div className="chart-row">
      <Checkbox id={props.id} checked={checked} onChange={onChange} />
      <div className="chart-row__user-info">
        <picture>
          <img src={from.picture_url} alt="profilePic" />
        </picture>
        <div className="chart-row__user-info__name">
          <span>{from.first_name}</span>
          <span>{from.last_name}</span>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div className="chart-row__post-info">
          <div title={props.message}>
            <FontAwesomeIcon {...messageProps} />
          </div>
          <span className="fa-layers fa-fw fa-2x" title="people reactions count">
            <FontAwesomeIcon icon="thumbs-up" color="blue" />
            <span className="fa-layers-counter fa-lg">{props.reactions_num}</span>
          </span>
        </div>
        <div className="chart-row__time-info">
          <FontAwesomeIcon icon={faClock} color="black" style={{ marginBottom: 5 }} />
          {created_time ? (
            <span style={{ color: 'red' }} title={`creation time: ${fullFormatDate(created_time)}`}>
              <FontAwesomeIcon icon={faCaretRight} /> {shortFormatDate(created_time)}
            </span>
          ) : (
            <span
              style={{ minWidth: 40, display: 'block', minHeight: 10, backgroundColor: 'lightgray', marginBottom: 5 }}
            />
          )}
          {showUpdateTime && (
            <span style={{ color: 'green' }} title={`update time: ${fullFormatDate(updated_time)}`}>
              <FontAwesomeIcon icon={faCaretUp} /> {shortFormatDate(updated_time)}
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
  }).isRequired,
  checked: PropTypes.bool.isRequired,
  created_time: PropTypes.string.isRequired,
  updated_time: PropTypes.string,
  message: PropTypes.string,
  reactions_num: PropTypes.number,
  link: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func,
};

export default ChartRow;
