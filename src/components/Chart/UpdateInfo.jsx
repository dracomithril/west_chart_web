import PropTypes from 'prop-types';
import React from 'react';
import { getFormattedDate } from '../../utils/utils';

const UpdateInfo = ({
  since, until, lastUpdateDateString, allCount, viewedCount,
}) => (
  <div className="update-info">
    <div id="time-frame" className="update-info__time-frame">
      {'since: '}
      <span style={{ color: 'blue' }}>
        { getFormattedDate(since, 'ddd, DD/MM') || 'null'}
      </span>
      {' to '}
      <span style={{ color: 'red' }}>
        { getFormattedDate(until, 'ddd, DD/MM') || 'null'}
      </span>
    </div>
    <span id="updateDate" className="update-info__span">
      {` Last update: ${lastUpdateDateString}`}
    </span>
    <span className="update-info__span">
      We did get
      {' '}
      {allCount}
      {' '}
and filtered
      {' '}
      {viewedCount}
    </span>
  </div>
);

UpdateInfo.propTypes = {
  since: PropTypes.number,
  until: PropTypes.number,
  lastUpdateDateString: PropTypes.string,
  allCount: PropTypes.number,
  viewedCount: PropTypes.number,
};

export default UpdateInfo;
