/**
 * Created by Gryzli on 29.03.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import './chart.css';

const DayEntry = ({ org, color }) => (
  <div key={org}>
    <span style={{ color }}>{new Date(org).toDateString()}</span>
  </div>
);
DayEntry.propTypes = {
  org: PropTypes.string,
  color: PropTypes.string,
};

const ErrorDaysIndicator = ({ error_days, less }) =>
  error_days.length > 0 && (
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement="bottom"
      overlay={
        <Popover id="haveMoreOrLessDays" title={`${less ? 'less' : 'more'} then expected`}>
          {error_days}
        </Popover>
      }
    >
      <i
        className={`fa fa-arrow-circle${less ? '-down less_days' : '-up more_days'}`}
        aria-hidden="true"
      >
        {error_days.length}
      </i>
    </OverlayTrigger>
  );
ErrorDaysIndicator.propTypes = {
  error_days: PropTypes.array,
  less: PropTypes.bool,
};
const SongsPerDay = ({ error_days = null, songs_per_day, onDaysChange }) => {
  let err_days_less = [];
  let err_days_more = [];
  let style;
  if (error_days) {
    err_days_less = error_days.filter(elem => elem.color === 'blue').map(DayEntry);
    err_days_more = error_days.filter(elem => elem.color === 'red').map(DayEntry);
    style = error_days.length !== 0 ? 'songs-per-day--err' : 'songs-per-day--good';
  } else {
    style = '';
  }

  return (
    <div className={`songs-per-day ${style}`}>
      <div>
        <label htmlFor="songs_per_day" className="songs-per-day__label">
          {'songs per day'}
          <input
            type="number"
            value={songs_per_day}
            name="songs_per_day"
            id="songs_per_day"
            step={1}
            max={10}
            min={1}
            onChange={({ target }) => {
              onDaysChange(Number(target.value));
            }}
          />
        </label>
      </div>
      <div className="songs-per-day__counters">
        <ErrorDaysIndicator error_days={err_days_less} less />
        <ErrorDaysIndicator error_days={err_days_more} />
      </div>
    </div>
  );
};
SongsPerDay.propTypes = {
  error_days: PropTypes.array,
  songs_per_day: PropTypes.number,
  onDaysChange: PropTypes.func,
};

export default SongsPerDay;
