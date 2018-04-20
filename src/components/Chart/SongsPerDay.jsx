/**
 * Created by Gryzli on 29.03.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowCircleDown, faArrowCircleUp } from '@fortawesome/fontawesome-free-solid';
import './chart.css';
import { errorDaysObjectProps } from './../typeDefinitions';

const DayEntry = ({ org, color }) => (
  <div key={org}>
    <span style={{ color }}>{new Date(org).toDateString()}</span>
  </div>
);
DayEntry.propTypes = {
  org: PropTypes.string,
  color: PropTypes.string,
};

const ErrorDaysIndicator = ({ errorDays, less }) =>
  errorDays.length > 0 && (
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement="bottom"
      overlay={
        <Popover id="haveMoreOrLessDays" title={`${less ? 'less' : 'more'} then expected`}>
          {errorDays}
        </Popover>
      }
    >
      <FontAwesomeIcon icon={less ? faArrowCircleDown : faArrowCircleUp} className={less ? 'less_days' : 'more_days'}>
        {errorDays.length}
      </FontAwesomeIcon>
    </OverlayTrigger>
  );
ErrorDaysIndicator.propTypes = {
  errorDays: PropTypes.arrayOf(errorDaysObjectProps),
  less: PropTypes.bool,
};
const SongsPerDay = ({ errorDays = null, songsPerDay, onDaysChange }) => {
  let errorDaysLess = [];
  let errorDaysMore = [];
  let style;
  if (errorDays) {
    errorDaysLess = errorDays.filter(elem => elem.color === 'blue').map(DayEntry);
    errorDaysMore = errorDays.filter(elem => elem.color === 'red').map(DayEntry);
    style = errorDays.length !== 0 ? 'songs-per-day--err' : 'songs-per-day--good';
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
            value={songsPerDay}
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
        <ErrorDaysIndicator errorDays={errorDaysLess} less />
        <ErrorDaysIndicator errorDays={errorDaysMore} />
      </div>
    </div>
  );
};
SongsPerDay.propTypes = {
  errorDays: PropTypes.arrayOf(errorDaysObjectProps),
  songsPerDay: PropTypes.number,
  onDaysChange: PropTypes.func,
};

export default SongsPerDay;
