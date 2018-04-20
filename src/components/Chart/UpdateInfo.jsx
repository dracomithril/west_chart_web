import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'react-bootstrap';

const UpdateInfo = ({ lastUpdateDate, since, until, filtered, total }) => {
  const options = { weekday: 'short', month: '2-digit', day: 'numeric' };
  const lastUpdateDateString = lastUpdateDate ? new Date(lastUpdateDate).toLocaleString('pl-PL') : 'No data';
  return (
    <div className="update-info">
      <div id="time-frame" className="update-info__time-frame">
        <span>since: </span>
        <Label bsStyle="success">{since !== '' ? new Date(since).toLocaleDateString('pl-PL', options) : 'null'}</Label>
        <span> to </span>
        <Label bsStyle="danger">{until !== '' ? new Date(until).toLocaleDateString('pl-PL', options) : 'null'}</Label>
      </div>
      <span id="updateDate" className="update-info__span">{` Last update: ${lastUpdateDateString}`}</span>
      <span className="update-info__span">
        We did get {total} and filtered {filtered}
      </span>
    </div>
  );
};

UpdateInfo.propTypes = {
  lastUpdateDate: PropTypes.string,
  since: PropTypes.number,
  until: PropTypes.number,
  total: PropTypes.number,
  filtered: PropTypes.number,
};

export default UpdateInfo;
