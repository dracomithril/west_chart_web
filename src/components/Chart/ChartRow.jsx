// @flow
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

function shortFormatDate(date) {
  if (date) {
    const date2 = moment(date);
    const dateFormat = moment().year() === date2.year() ? 'DD.MM' : 'DD.MM.YY';
    return date2.format(dateFormat);
  }
  return '';
}

const fullFormatDate = date => (date ? moment(date).format('dddd, MMMM Do YYYY, HH:mm:ss') : '');

type Props = {
  id: string,
  checked?: boolean,
  createdTime?: string,
  updatedTime?: string,
  message?: string,
  reactionsNum?: number,
  link?: {
    title: string,
    url: string,
  },
  onChange: PropTypes.func.isRequired,
}
const ChartRow = ({
  link = {},
  checked,
  createdTime,
  updatedTime,
  onChange,
  message,
  id,
  reactionsNum,
}: Props) => {
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
  checked: false,
  createdTime: null,
  updatedTime: null,
  message: null,
  reactionsNum: 0,
  link: {},
};

export default ChartRow;
