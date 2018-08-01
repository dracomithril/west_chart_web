import PropTypes from 'prop-types';
import React from 'react';

const options = { weekday: 'short', month: '2-digit', day: 'numeric' };
const UpdateInfo = ({ since, until, lastUpdateDateString, allCount, viewedCount }) => (
  <div className="update-info">
    <div id="time-frame" className="update-info__time-frame">
      {'since: '}
      <span style={{ color: 'blue' }}>
        {since !== '' ? new Date(since).toLocaleDateString('pl-PL', options) : 'null'}
      </span>
      {' to '}
      <span style={{ color: 'red' }}>
        {until !== '' ? new Date(until).toLocaleDateString('pl-PL', options) : 'null'}
      </span>
    </div>
    <span id="updateDate" className="update-info__span">{` Last update: ${lastUpdateDateString}`}</span>
    <span className="update-info__span">
      We did get {allCount} and filtered {viewedCount}
    </span>
  </div>
);

UpdateInfo.propTypes = {
  since: PropTypes.string,
  until: PropTypes.string,
  lastUpdateDateString: PropTypes.string,
  allCount: PropTypes.number,
  viewedCount: PropTypes.number,
};

export default UpdateInfo;
