import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'react-bootstrap';

const UpdateInfo = ({ last_update, since, until, filtered, total }) => {
  const options = { weekday: 'short', month: '2-digit', day: 'numeric' };
  const last_update_date = last_update ? new Date(last_update).toLocaleString('pl-PL') : 'No data';
  return (
    <div className="update-info">
      <div id="time-frame" className="update-info__time-frame">
        <span>since: </span>
        <Label bsStyle="success">{since !== '' ? new Date(since).toLocaleDateString('pl-PL', options) : 'null'}</Label>
        <span> to </span>
        <Label bsStyle="danger">{until !== '' ? new Date(until).toLocaleDateString('pl-PL', options) : 'null'}</Label>
      </div>
      <span id="updateDate" className="update-info__span">{` Last update: ${last_update_date}`}</span>
      <span className="update-info__span">
        We did get {total} and filtered {filtered}
      </span>
    </div>
  );
};

UpdateInfo.propTypes = {
  last_update: PropTypes.string,
  since: PropTypes.number,
  until: PropTypes.number,
  total: PropTypes.number,
  filtered: PropTypes.number,
};

export default UpdateInfo;
