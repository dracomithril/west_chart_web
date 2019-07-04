// @flow
import React from 'react';
import { getFormattedDate } from '../../utils/utils';

type Props = {
  since?: number,
  until?: number,
  lastUpdateDateString?: string,
  allCount?: number,
  viewedCount?: number,
};

const UpdateInfo = ({
  since, until, lastUpdateDateString, allCount, viewedCount,
}: Props) => (
  <div className="update-info">
    {(since && until) && (
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
    )}
    {lastUpdateDateString && (
    <span id="updateDate" className="update-info__span">
      {` Last update: ${lastUpdateDateString}`}
    </span>
    )}
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

UpdateInfo.defaultProps = {
  since: 0,
  until: 0,
  lastUpdateDateString: '',
  allCount: 0,
  viewedCount: 0,
};

export default UpdateInfo;
